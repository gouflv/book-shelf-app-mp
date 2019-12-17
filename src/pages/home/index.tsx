import './index.scss'
import Taro, { useContext, useEffect } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import BorrowBookConfirm from '../../components/BorrowBookConfirm'
import BookGrid from '../../components/BookGrid'
import { useCabinetBooks } from './store'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import useBookBorrow from '../../utils/borrow-hook'
import CateTabs from './CateTabs'
import useBindPhone from '../../utils/bind-phone-hook'
import BasicPageView from '../../components/BasicPageView'

const Index: Taro.FC = () => {
  const { scanCabinet, isUserHasDeposit, isUserBoundPhone } = useContext(AppStore)
  const { onGetPhoneNumber } = useBindPhone({
    success() {
      Taro.navigateTo({ url: '/pages/buy-deposit/index' })
    }
  })

  //borrow
  const { borrowItem, borrowConfirmVisible, closeBorrowConfirm, isBorrowSend, onBorrowClick, onBorrowConfirm } = useBookBorrow()

  // list
  const { cabinetBookItems, cabinetBookLoading, setEqCode, cateId, setCateId } = useCabinetBooks()
  useEffect(() => {
    if (scanCabinet) {
      setEqCode(scanCabinet.eqCode)
    }
  }, [scanCabinet])

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

          {(!cabinetBookLoading && !cabinetBookItems.length)
            ? <View className='list-empty'>暂无图书</View>
            : <BookGrid items={cabinetBookItems} onBorrowClick={item => onBorrowClick(item)}/>
          }
        </View>
      </View>

      <View className='space space--text'>
        <View className='text'>你已看过的书</View>
      </View>
      <View className='page-section'>
        <BookGrid items={[]} onBorrowClick={() => {}} />
      </View>
      <View className='space' />

      {borrowItem && (
        <BorrowBookConfirm
          visible={borrowConfirmVisible}
          book={borrowItem}
          isBorrowSend={isBorrowSend}
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
