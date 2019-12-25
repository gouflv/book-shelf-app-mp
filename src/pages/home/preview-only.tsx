import './index.scss'
import { observer } from '@tarojs/mobx'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import BookGrid from '../../components/BookGrid'
import AppStore from '../../store/app'
import { useDeviceBooks } from './store'
import { distanceFormat } from '../../utils'
import CateTabs from './components/CateTabs'
import { BookHasBorrow, BoxOpenState, BoxState, DeviceBook } from '../../typing'

const Index: Taro.FC = () => {
  const { previewSite, previewDevice } = useContext(AppStore)

  // data
  const { deviceBookItems, deviceBookLoading, setEqCode, cateId, setCateId } = useDeviceBooks()
  useEffect(() => {
    setEqCode(previewDevice.eqCode)
  }, [previewDevice])

  // vo
  const [booksInbox, setBooksInbox] = useState<DeviceBook[]>([])
  const [booksInHistory, setBooksInHistory] = useState<DeviceBook[]>([])

  useEffect(() => {

    setBooksInbox(deviceBookItems.filter(item => {
      if (item.openStatus !== BoxOpenState.FALSE) {
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

  // events
  function openNavigation() {
    if (previewSite) {
      Taro.openLocation({
        latitude: parseFloat(previewSite.latitude),
        longitude: parseFloat(previewSite.longitude),
        name: previewSite.netName,
        address: previewSite.address,
      })
    }
  }

  return (
    <View className='page page--has-footer'>
      <View className='page-section'>
        <View className='shop-book-list'>
          <CateTabs value={cateId} onChange={val => setCateId(val)} />

          {(!deviceBookLoading && !booksInbox.length)
            ? <View className='list-empty'>暂无图书</View>
            : <BookGrid
              items={booksInbox}
              onBorrowClick={() => {}}
              onOpenClick={() => {}}
              readonly
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
              onBorrowClick={() => {}}
              onOpenClick={() => {}}
              readonly
            />
          </View>
        </View>
      )}

      {previewSite && (
        <View className='footer'>
          <View className='site-info'>
            <View className='site-info__hd'>
              <Image src={require('../../assets/navigation_icon_position@2x.png')} mode='aspectFit' className='icon' />
            </View>
            <View className='site-info__bd'>
              <View className='name'>{previewSite.netName}</View>
              <View className='more'>
                <View className='left'>距离你{distanceFormat(parseFloat(previewSite.distance))}</View>
                <View className='right'>
                  <Button className='btn btn-primary' size='mini' onClick={openNavigation}>
                    <Image src={require('../../assets/navigation_icon@2x.png')} mode='aspectFit' className='icon' />
                    导航
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '网点详情'
}

export default observer(Index)
