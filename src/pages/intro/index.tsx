import './style.scss'
import Taro from '@tarojs/taro'
import { Image, Swiper, SwiperItem, View } from '@tarojs/components'

const Intro: Taro.FC = () => {
  return (
    <View className='page-intro'>
      <View className='card site-info'>
        <View className='card-body'>
          <View className='icon'>
            <Image src={require('../../assets/navigation_icon_position@3x.png')} mode='aspectFit' />
          </View>
          <View className='content'>
            <View className='name'>金山小金星幼儿园</View>
            <View className='more'>
              <View className='left'>距离你250m</View>
              <View className='right'>查看附近借书馆</View>
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
