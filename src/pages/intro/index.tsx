import './index.scss'
import Taro, { useEffect } from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'

const Intro: Taro.FC = () => {

  useEffect(() => {
    fetchClosestSite()
  }, [])

  async function fetchClosestSite() {
    const res = await Taro.getLocation({ type: 'gcj02' })
    console.log(res)
    //TODO
  }

  function openSiteMap() {
    Taro.navigateTo({ url: '/pages/site-map/index' })
  }

  return (
    <View className='page-intro'>
      <View className='card site-info'>
        <View className='site-info__main'>
          <View className='icon'>
            <Image src={require('../../assets/navigation_icon_position@3x.png')} mode='aspectFit' />
          </View>
          <View className='content'>
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
              <Image src='//placehold.it/660x580' mode='aspectFit' />
            </SwiperItem>
            <SwiperItem>
              <Image src='//placehold.it/660x580' mode='aspectFit' />
            </SwiperItem>
          </Swiper>
        </View>
      </View>

      <View className='scan-btn'>
        <Image src={require('../../assets/home_btn_scanning@3x.png')} mode='aspectFit' />
      </View>
    </View>
  )
}

export default Intro
