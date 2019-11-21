import './index.scss'
import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View className='page page--gray'>
      <View className='page-banner'>
        <Image src={require('../../assets/balance_bg@3x.png')} mode='aspectFill' className='bg' />
        <View className='content'>
          <View className='top'>余额</View>
          <View className='money red'>
            <Text className='money-unit'>¥</Text>
            199
          </View>
        </View>
      </View>

      <View className='page-section'>
        <View className='section-header'>
          余额记录
        </View>
        <View className='card'>
          <View className='cell-group'>
            <View className='cell'>
              <View className='cell__bd'>
                <View className='label'>[缴纳]缴纳押金</View>
                <Text className='desc gray'>2019/11/12 18:00</Text>
              </View>
              <View className='cell__ft'>
                <View className='money red'>
                  +<Text className='money-unit money-unit--large'>¥</Text>
                  99
                </View>
              </View>
            </View>
            <View className='cell'>
              <View className='cell__bd'>
                <View className='label'>[缴纳]缴纳押金</View>
                <Text className='desc gray'>2019/11/12 18:00</Text>
              </View>
              <View className='cell__ft'>
                <View className='money green'>
                  -<Text className='money-unit money-unit--large'>¥</Text>
                  99
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的押金'
}

export default Page
