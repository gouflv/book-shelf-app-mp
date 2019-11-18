import './index.scss'
import Taro, { useEffect, useState } from '@tarojs/taro'
import { Button, Image, Map, View } from '@tarojs/components'

interface LocationParam {
  latitude: number
  longitude: number
}

const SiteMap: Taro.FC = () => {
  const [userLocation, setUserLocation] = useState<LocationParam>()

  useEffect(() => {
    getUserLocation()
  }, [])

  async function getUserLocation() {
    const loc = await Taro.getLocation({ type: 'gcj02' })
    setUserLocation(loc)
  }

  function openNavigation() {
    if (userLocation) {
      Taro.openLocation(userLocation)
    }
  }

  function openSite() {
    Taro.navigateTo({ url: '/pages/index/preview-only' })
  }

  return (
    <View className='page-size-map'>
      {userLocation && (
        <Map
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
          style={{ width: '100vw', height: '100vh' }}
        />
      )}
      <View className='footer'>
        <View className='card card--shadow site-info-wrapper'>
          <View className='site-info'>
            <View className='site-info__hd'>
              <Image src={require('../../assets/navigation_icon_position@3x.png')} mode='aspectFit' />
            </View>
            <View className='site-info__bd'>
              <View className='name'>金山小金星幼儿园</View>
              <View className='more'>
                <View className='left'>距离你250m</View>
              </View>
            </View>
          </View>
          <View className='site-info-footer'>
            <Button className='btn-primary btn--round' size='mini' onClick={openNavigation}>
              <Image src={require('../../assets/navigation_icon@3x.png')} mode='aspectFit' className='icon' />
              导航
            </Button>
            <Button className='btn-primary btn--round' size='mini' onClick={openSite}>
              <Image src={require('../../assets/navigation_icon2@3x.png')} mode='aspectFit' className='icon' />
              详情
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SiteMap
