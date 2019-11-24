import './index.scss'
import { observer } from '@tarojs/mobx'
import Taro, { useEffect, useContext } from '@tarojs/taro'
import { Button, Image, Map, View } from '@tarojs/components'
import AppStore from '../../store/app'

const SiteMap: Taro.FC = () => {
  const { location, getUserLocation, setPreviewSite } = useContext(AppStore)

  useEffect(() => {
    getUserLocation()
  }, [])

  function openNavigation() {
    if (location) {
      Taro.openLocation(location)
    }
  }

  function openSite() {
    setPreviewSite({ siteId: 1 })
    Taro.navigateTo({ url: '/pages/index/preview-only' })
  }

  return (
    <View className='page-size-map'>
      {location && (
        <Map
          latitude={location.latitude}
          longitude={location.longitude}
          style={{ width: '100vw', height: '100vh' }}
        />
      )}
      <View className='footer'>
        <View className='card card--shadow site-info-wrapper'>
          <View className='site-info'>
            <View className='site-info__hd'>
              <Image src={require('../../assets/navigation_icon_position@3x.png')} mode='aspectFit' className='icon' />
            </View>
            <View className='site-info__bd'>
              <View className='name'>金山小金星幼儿园</View>
              <View className='more'>
                <View className='left'>距离你250m</View>
              </View>
            </View>
          </View>
          <View className='site-info-footer'>
            <Button className='btn btn-primary' size='mini' onClick={openNavigation}>
              <Image src={require('../../assets/navigation_icon@3x.png')} mode='aspectFit' className='icon' />
              导航
            </Button>
            <Button className='btn btn-primary' size='mini' onClick={openSite}>
              <Image src={require('../../assets/navigation_icon2@3x.png')} mode='aspectFit' className='icon' />
              详情
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

SiteMap.config = {
  navigationBarTitleText: '网点导航'
}

export default observer(SiteMap)
