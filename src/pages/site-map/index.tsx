import './index.scss'
import _find from 'lodash.find'
import { observer } from '@tarojs/mobx'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, Map, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { marker } from '@tarojs/components/types/Map'
import { distanceFormat, hideLoading, POST, showLoading, showToast } from '../../utils'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { Device } from '../../typing'

const SiteMap: Taro.FC = () => {
  const { location, siteList, previewSite, setPreviewSite, setPreviewDevice } = useContext(AppStore)

  const [markers, setMarkers] = useState<marker[]>([])
  const [devices, setDevices] = useState<Device[]>([])
  const [devicesSelectVisible, setDevicesSelectVisible] = useState(false)

  useEffect(() => {
    setMarkers(siteList.map(s => {
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
          display: active ? 'ALWAYS' : 'BYCLICK',
          textAlign: 'center'
        } as marker['callout']
      }
    }))
  }, [previewSite])

  function onSiteSelect(markerId) {
    const match = _find(siteList, s => s.netCode === markerId)
    if (match) {
      setPreviewSite({ ...match })
    }
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
    const items: Device[] = await POST('book/getEquipmentListAll', {
      data: {
        networkCode: previewSite.netCode
      }
    })
    hideLoading()
    if (items.length === 1) {
      setPreviewDevice(items[0])
      Taro.navigateTo({ url: '/pages/home/preview-only' })
    } else if (items.length > 1) {
      setDevices(items)
      setDevicesSelectVisible(true)
    } else {
      showToast({ title: '暂无书柜' })
    }
  }

  function onDeviceClick(item: Device) {
    setPreviewDevice(item)
    Taro.navigateTo({ url: '/pages/home/preview-only' })
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
        />
      )}

      {(previewSite && !devicesSelectVisible) && (
        <View className='footer'>
          <View className='card card--shadow site-info-wrapper'>
            <View className='site-info'>
              <View className='site-info__hd'>
                <Image src={require('../../assets/navigation_icon_position@2x.png')} mode='aspectFit' className='icon' />
              </View>
              <View className='site-info__bd'>
                <View className='name'>{previewSite.netName}</View>
                <View className='more'>
                  <View className='left'>距离你{distanceFormat(parseFloat(previewSite.distance))}</View>
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
        isOpened={devicesSelectVisible}
        onClose={() => setDevicesSelectVisible(false)}
      >
        {devices.map(c => (
          <AtActionSheetItem key={c.eqId} onClick={() => onDeviceClick(c)}>
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
