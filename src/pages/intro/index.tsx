import './index.scss'
import Taro, { useContext, useEffect, useState, useRef } from '@tarojs/taro'
import { Button, Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { distanceFormat } from '../../utils'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import queryString from 'query-string'
import { Device } from '../../typing'
import ModalWithClose from '../../components/Modal/ModalWithClose'
import GiftCarDialog from '../../components/GiftCarDialog'

const Error = {
  INVALIDATE_CODE: {
    title: '该二维码信息有误',
    message: '请重新扫描二维码'
  },
  DEVICE_STOP: {
    title: '该设备暂停使用',
    message: '请扫其他设备码'
  },
}

const Intro: Taro.FC = () => {
  const { fetchSites, closestSite, setScannedDevice, checkDeviceIsRunning, setPreviewSite } = useContext(AppStore)
  const [errorVisible, setErrorVisible] = useState(false)
  const error = useRef<any>(Error.INVALIDATE_CODE)

  useEffect(() => {
    fetchSites()
  }, [])

  function openSiteMap() {
    setPreviewSite(closestSite)
    Taro.navigateTo({ url: '/pages/site-map/index' })
  }

  async function onScanClick() {
    try {
      const scan = await Taro.scanCode({ onlyFromCamera: true })
      console.debug(scan)
      const query = queryString.parse(scan.path.split('?').pop())
      console.debug(query)

      if (query && query.scene) {
        const device = { eqCode: query.scene } as Device
        if (await checkDeviceIsRunning(device)) {
          await setScannedDevice(device)
        } else {
          error.current = Error.DEVICE_STOP
          setErrorVisible(true)
        }
      } else {
        error.current = Error.INVALIDATE_CODE
        setErrorVisible(true)
      }
    } catch (e) {
      console.log(e)
      if (e.errMsg && !!~e.errMsg.indexOf('cancel')) {
        return
      }
      error.current = Error.INVALIDATE_CODE
      setErrorVisible(true)
    }
  }

  return (
    <View className='page-intro'>

      <View className='card'>
        <View className='site-info'>
          <View className='site-info__hd'>
            <Image src={require('../../assets/navigation_icon_position@2x.png')} mode='aspectFit' className='icon' />
          </View>
          <View className='site-info__bd'>
            <View className='name'>{closestSite ? closestSite.netName : '你暂未开启地理位置定位服务'}</View>
            {closestSite && (
              <View className='more'>
                <View className='left'>距离你{distanceFormat(parseFloat(closestSite.distance))}</View>
                <View className='right' onClick={() => openSiteMap()}>查看附近借书馆</View>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className='card'>
        <View className='card-body'>
          <Swiper className='swiper'>
            <SwiperItem>
              <Image src={require('../../assets/intro-g1@2x.jpg')} mode="aspectFit" className='image' />
            </SwiperItem>
          </Swiper>
        </View>
      </View>

      <View className='scan-btn'>
        <Image src={require('../../assets/home_btn_scanning@2x.png')} mode='aspectFit' className='icon' onClick={onScanClick} />
      </View>

      <ModalWithClose isOpened={errorVisible} onCancel={() => setErrorVisible(false)}>
        <View className='message-title'>
        </View>
        <View className='message-desc'>
          <View>{error.current.title}</View>
          {error.current.message}
        </View>
        <View className='message-foot'>
          <Button className='btn btn-primary' onClick={() => setErrorVisible(false)}>确认</Button>
        </View>
      </ModalWithClose>

      <GiftCarDialog />
    </View>
  )
}

Intro.options = {
  addGlobalClass: true
}

export default observer(Intro)
