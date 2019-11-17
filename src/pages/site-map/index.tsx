import './style.scss'
import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Map, Button } from '@tarojs/components'

interface LocationParam {
  latitude: number
  longitude: number
}

const SiteMap: Taro.FC = () => {
  const [userLocation, setUserLocation] = useState<LocationParam>()

  useEffect(() => {
    Taro.getLocation({
      type: 'gcj02',
      success(res) {
        setUserLocation(res)
      }
    })
  }, [])

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
        <Button className='btn-primary' onClick={openNavigation}>导航</Button>
        <Button className='btn-primary' onClick={openSite}>详情</Button>
      </View>
    </View>
  )
}

export default SiteMap
