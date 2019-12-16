import './index.scss'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { distanceFormat } from '../../utils'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import queryString from 'query-string'
import { Cabinet } from '../../typing'
import ModalWithClose from '../../components/Modal/ModalWithClose'

const Intro: Taro.FC = () => {
  const { fetchSites, closestSite, setScanCabinet, setPreviewSite } = useContext(AppStore)
  const [errorVisible, setErrorVisible] = useState(false)

  useEffect(() => {
    fetchSites()
  }, [])

  function openSiteMap() {
    setPreviewSite(null)
    Taro.navigateTo({ url: '/pages/site-map/index' })
  }

  async function onScanClick() {
    try {
      const scan = await Taro.scanCode({ onlyFromCamera: true })
      console.debug(scan)
      const query = queryString.parse(scan.path.split('?').pop())
      console.debug(query)

      if (query && query.scene) {
        setScanCabinet({ eqCode: query.scene } as Cabinet)
      } else {
        setErrorVisible(true)
        return
      }
    } catch (e) {
      if (e.errMsg && !!~e.errMsg.indexOf('cancel')) {
        return
      }
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
                <View className='right' onClick={openSiteMap}>查看附近借书馆</View>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className='card'>
        <View className='card-body'>
          <Swiper className='swiper'>
            <SwiperItem>
              <Image src='//placehold.it/660x580' mode='aspectFit' className='image' />
            </SwiperItem>
            <SwiperItem>
              <Image src='//placehold.it/460x580' mode='aspectFit' className='image' />
            </SwiperItem>
          </Swiper>
        </View>
      </View>

      <View className='scan-btn'>
        <Image src={require('../../assets/home_btn_scanning@2x.png')} mode='aspectFit' className='icon' onClick={onScanClick} />
      </View>

      <ModalWithClose isOpened={errorVisible} onCancel={() => setErrorVisible(false)}>
        <View className='message-title'>
          该二维码信息有误
        </View>
        <View className='message-desc'>
          <View>该二维码信息有误</View>
          请重新扫描二维码
        </View>
        <View className='message-foot'>
          <Button className='btn btn-primary' onClick={() => setErrorVisible(false)}>确认</Button>
        </View>
      </ModalWithClose>
    </View>
  )
}

Intro.options = {
  addGlobalClass: true
}

export default observer(Intro)
