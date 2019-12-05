import './index.scss'
import _find from 'lodash/find'
import { observer } from '@tarojs/mobx'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, Map, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { marker } from '@tarojs/components/types/Map'
import { hideLoading, POST, showLoading, showToast } from '../../utils'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { Cabinet } from '../../typing'

const SiteMap: Taro.FC = () => {
  const { location, siteList, previewSite, getUserLocation, fetchSites, setPreviewSite, setPreviewCabinet } = useContext(AppStore)

  const [markers, setMarkers] = useState<marker[]>([])
  const [cabinets, setCabinets] = useState<Cabinet[]>([])
  const [cabinetsSelectVisible, setCabinetsSelectVisible] = useState(false)

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
            id: (s.netCode as any) as number,
            longitude: parseFloat(s.longitude),
            latitude: parseFloat(s.latitude),
            iconPath: active ?
              require('../../assets/navigation_position_selected@2x.png') :
              require('../../assets/navigation_position_normal@2x.png'),
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
    if (previewSite) {
      Taro.openLocation({
        latitude: parseFloat(previewSite.latitude),
        longitude: parseFloat(previewSite.longitude),
        name: previewSite.netName,
        address: previewSite.address,
      })
    }
  }

  async function openSiteDetail() {
    showLoading()
    const items: Cabinet[] = await POST('book/getEquipmentListAll', {
      data: {
        networkCode: previewSite.netCode
      }
    })
    hideLoading()
    if (items.length === 1) {
      setPreviewCabinet(items[0])
      Taro.navigateTo({ url: '/pages/index/preview-only' })
    } else if (items.length > 1) {
      setCabinets(items)
      setCabinetsSelectVisible(true)
    } else {
      showToast({ title: '暂无书柜' })
    }
  }

  function onCabinetClick(item: Cabinet) {
    setPreviewCabinet(item)
    setCabinetsSelectVisible(false)
    Taro.navigateTo({ url: '/pages/index/preview-only' })
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

      {(previewSite && !cabinetsSelectVisible) && (
        <View className='footer'>
          <View className='card card--shadow site-info-wrapper'>
            <View className='site-info'>
              <View className='site-info__hd'>
                <Image src={require('../../assets/navigation_icon_position@2x.png')} mode='aspectFit' className='icon' />
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
                <Image src={require('../../assets/navigation_icon@2x.png')} mode='aspectFit' className='icon' />
                导航
              </Button>
              <Button className='btn btn-primary' size='mini' onClick={openSiteDetail}>
                <Image src={require('../../assets/navigation_icon2@3x.png')} mode='aspectFit' className='icon' />
                详情
              </Button>
            </View>
          </View>
        </View>
      )}

      <AtActionSheet
        title='请选择书柜'
        isOpened={cabinetsSelectVisible}
        onClose={() => setCabinetsSelectVisible(false)}
      >
        {cabinets.map(c => (
          <AtActionSheetItem key={c.eqId} onClick={() => onCabinetClick(c)}>
            {c.eqName}
          </AtActionSheetItem>
        ))}
      </AtActionSheet>
    </View>
  )
}

SiteMap.config = {
  navigationBarTitleText: '网点导航'
}

export default observer(SiteMap)
