import './index.scss'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import BorrowBookConfirm from '../../components/BorrowBookConfirm'
import BookGrid from '../../components/BookGrid'
import { useDeviceBooks } from './store'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import useBookBorrow from '../../utils/borrow-hook'
import CateTabs from './CateTabs'
import useBindPhone from '../../utils/bind-phone-hook'
import BasicPageView from '../../components/BasicPageView'
import { BookHasBorrow, BoxAllowOpen, BoxState, DeviceBook } from '../../typing'

const Index: Taro.FC = () => {
  const { scannedDevice, isUserHasDeposit, isUserBoundPhone } = useContext(AppStore)
  const { onGetPhoneNumber } = useBindPhone({
    success() {
      Taro.navigateTo({ url: '/pages/buy-deposit/index' })
    }
  })

  //borrow
  const {
    borrowItem, borrowConfirmVisible,
    onBorrowClick, onBorrowConfirm, closeBorrowConfirm,
    onBorrowOpenAgain
  } = useBookBorrow({
    onBorrowSuccess: (item) => {
      updateDeviceState(item)
    }
  })

  // list
  const { deviceBookItems, deviceBookLoading, setEqCode, cateId, setCateId, updateDeviceState } = useDeviceBooks()
  const [booksInbox, setBooksInbox] = useState<DeviceBook[]>([])
  const [booksInHistory, setBooksInHistory] = useState<DeviceBook[]>([])

  useEffect(() => {

    setBooksInbox(deviceBookItems.filter(item => {
      if (item.openStatus !== BoxAllowOpen.FALSE) {
        return true
      }
      if (item.status === BoxState.EMPTY) {
        return false
      }
      return item.borrowing === BookHasBorrow.FALSE
    }))

    setBooksInHistory(deviceBookItems.filter(item => {
      if (item.status === BoxState.EMPTY) {
        return false
      }
      return item.borrowing !== BookHasBorrow.FALSE
    }))

  }, [deviceBookItems])

  useEffect(() => {
    if (scannedDevice) {
      setEqCode(scannedDevice.eqCode)
    }
  }, [scannedDevice])

  return (
    <BasicPageView className='page-index'>

      {!isUserHasDeposit && (
        <View>
          <View className='deposit-tip'>
            <View className='content'>
              <Image src={require('../../assets/home_icon_prompt@2x.png')} mode='aspectFit' className='icon' />
              借书请先缴纳押金
            </View>

            {isUserBoundPhone
              ? (
                <Button
                  size='mini'
                  className='btn-primary'
                  onClick={() => Taro.navigateTo({ url: '/pages/buy-deposit/index' })}
                >缴纳押金</Button>
              )
              : (
                <Button
                  openType='getPhoneNumber'
                  size='mini'
                  className='btn-primary'
                  onGetPhoneNumber={e => onGetPhoneNumber(e.detail)}
                >缴纳押金</Button>
              )
            }

          </View>
          <View className='space' />
        </View>
      )}

      <View className='page-section'>
        <View className='shop-book-list'>
          <CateTabs value={cateId} onChange={val => setCateId(val)} />

          {(!deviceBookLoading && !booksInbox.length)
            ? <View className='list-empty'>暂无图书</View>
            : <BookGrid
              items={booksInbox}
              onBorrowClick={item => onBorrowClick(item)}
              onOpenClick={item => onBorrowOpenAgain(item)}
            />
          }
        </View>
      </View>

      {booksInHistory.length && (
        <View>
          <View className='space space--text'>
            <View className='text'>你已看过的书</View>
          </View>
          <View className='page-section'>
            <BookGrid
              items={booksInHistory}
              onBorrowClick={item => onBorrowClick(item)}
              onOpenClick={item => onBorrowOpenAgain(item)}
            />
          </View>
          <View className='space' />
        </View>
      )}

      {borrowItem && (
        <BorrowBookConfirm
          visible={borrowConfirmVisible}
          book={borrowItem}
          onConfirm={() => onBorrowConfirm()}
          onCancel={() => closeBorrowConfirm()}
        />
      )}
    </BasicPageView>
  )
}

Index.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}
Index.options = {
  addGlobalClass: true
}

export default observer(Index)
