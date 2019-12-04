import './index.scss'
import _find from 'lodash/find'
import { observer } from '@tarojs/mobx'
import Taro, { useState, useEffect, useContext } from '@tarojs/taro'
import { Button, Image, Map, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { marker } from '@tarojs/components/types/Map'

const SiteMap: Taro.FC = () => {
  const { location, siteList, previewSite, getUserLocation, fetchSites, setPreviewSite } = useContext(AppStore)

  const [markers, setMarkers] = useState<marker[]>([])

  useEffect(() => {
    getUserLocation()
  }, [getUserLocation])

  useEffect(() => {
    if (location) {
      fetchSites()
    }
  }, [fetchSites, location])

  useEffect(() => {
    setMarkers(prevState => {
      return [
        ...prevState,
        ...siteList.map(s => {
          const active = previewSite && previewSite.netCode === s.netCode
          return {
            id: s.netCode,
            longitude: s.longitude,
            latitude: s.latitude,
            iconPath: active ?
              require('../../assets/navigation_position_selected@3x.png') :
              require('../../assets/navigation_position_normal@3x.png'),
            width: 30,
            height: 30,
            callout: {
              content: s.netName,
              color: active ? '#fff' : '#333',
              fontSize: 13,
              borderRadius: 6,
              borderColor: active ? '#f1b400' : '#fff',
              bgColor: active ? '#f1b400' : '#fff',
              padding: 6,
              display: 'ALWAYS',
              textAlign: 'center'
            } as marker['callout']
          }
        })
      ]
    })
  }, [siteList, previewSite])

  function onSiteSelect(markerId) {
    setPreviewSite(_find(siteList, s => s.netCode === markerId))
  }

  function openNavigation() {
    if (location) {
      Taro.openLocation(location)
    }
  }

  function openSiteCabinetSelect() {
    // setPreviewSite({ siteId: 1 })
    // Taro.navigateTo({ url: '/pages/index/preview-only' })
  }

  return (
    <View className='page-size-map'>
      {location && (
        <Map
          latitude={location.latitude}
          longitude={location.longitude}
          showLocation
          markers={markers}
          scale={14}
          style={{ width: '100vw', height: '100vh' }}
          onMarkerTap={e => onSiteSelect((e as any).markerId)}
          onCalloutTap={e => onSiteSelect((e as any).markerId)}
        />
      )}

      {previewSite && (
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
              <Button className='btn btn-primary' size='mini' onClick={openSiteCabinetSelect}>
                <Image src={require('../../assets/navigation_icon2@3x.png')} mode='aspectFit' className='icon' />
                详情
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

SiteMap.config = {
  navigationBarTitleText: '网点导航'
}

export default observer(SiteMap)
