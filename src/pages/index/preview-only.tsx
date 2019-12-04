import './index.scss'
import { observer } from '@tarojs/mobx'
import Taro, { useContext, useEffect } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import BookGrid from '../../components/BookGrid'
import AppStore from '../../store/app'
import { useCabinetBooks } from './store'

const Index: Taro.FC = () => {
  const { previewSite, previewCabinet } = useContext(AppStore)
  const { cabinetBookItems, fetchCabinetBook } = useCabinetBooks()

  useEffect(() => {
    fetchCabinetBook({ eqCode: previewCabinet.eqCode })
  }, [])

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
          <View className='type-filter'>
            <View className='type-filter__item type-filter__item--active'>全部</View>
            <View className='type-filter__item'>小班</View>
            <View className='type-filter__item'>中班</View>
            <View className='type-filter__item'>大班</View>
          </View>
          <BookGrid items={cabinetBookItems} onBorrowClick={() => {}} readonly />
        </View>
      </View>

      <View className='space space--text'>
        <View className='text'>你已看过的书</View>
      </View>
      <View className='page-section'>
        <BookGrid items={[]} onBorrowClick={() => {}} readonly />
      </View>

      <View className='footer'>
        <View className='site-info'>
          <View className='site-info__hd'>
            <Image src={require('../../assets/navigation_icon_position@3x.png')} mode='aspectFit' className='icon' />
          </View>
          <View className='site-info__bd'>
            <View className='name'>金山小金星幼儿园</View>
            <View className='more'>
              <View className='left'>距离你250m</View>
              <View className='right'>
                <Button className='btn btn-primary' size='mini' onClick={openNavigation}>
                  <Image src={require('../../assets/navigation_icon@3x.png')} mode='aspectFit' className='icon' />
                  导航
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '网点详情'
}

export default observer(Index)
