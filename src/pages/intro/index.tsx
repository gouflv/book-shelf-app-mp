import './index.scss'
import Taro, { useContext, useEffect } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { showToast } from '../../utils'
import AppStore from '../../store/app'

const Intro: Taro.FC = () => {
  const { fetchSites } = useContext(AppStore)

  useEffect(() => {
    fetchSites()
  }, [])

  function openSiteMap() {
    Taro.navigateTo({ url: '/pages/site-map/index' })
  }

  async function onScanClick() {
    try {
      const scan = await Taro.scanCode({ onlyFromCamera: true })
      console.log(scan)
      // TODO bind site
      Taro.redirectTo({ url: '/pages/index/index' })
    } catch (e) {
      showToast({ title: '可能是无效的二维码' })
    }
  }

  return (
    <View className='page-intro'>
      <View className='card'>
        <View className='site-info'>
          <View className='site-info__hd'>
            <Image src={require('../../assets/navigation_icon_position@3x.png')} mode='aspectFit' className='icon' />
          </View>
          <View className='site-info__bd'>
            <View className='name'>金山小金星幼儿园</View>
            <View className='more'>
              <View className='left'>距离你250m</View>
              <View className='right' onClick={openSiteMap}>查看附近借书馆</View>
            </View>
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
              <Image src='//placehold.it/660x580' mode='aspectFit' className='image' />
            </SwiperItem>
          </Swiper>
        </View>
      </View>

      <View className='scan-btn'>
        <Image src={require('../../assets/home_btn_scanning@3x.png')} mode='aspectFit' className='icon' onClick={onScanClick} />
      </View>
    </View>
  )
}

Intro.options = {
  addGlobalClass: true
}

export default Intro
