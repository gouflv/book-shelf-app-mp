import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, RichText, Text, View } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View>

      <View className='top-tabbar'>
        <View className='item item--active'>可使用（5）</View>
        <View className='item'>不可使用（1）</View>
      </View>

      <View className='t-card-list'>
        <View className='t-card'>
          <Image src={require('../../assets/car_bg_use@3x.png')} mode='aspectFit' className='t-card__bg' />
          <View className='t-card__wrapper'>
            <View className='t-card__bd'>
              <View className='label'>
                借书<Text>1</Text>次
              </View>
              <View className='desc gray'>长期有效</View>
            </View>
            <View className='t-card__ft'>
              <Text className='orange'>去使用</Text>
            </View>
          </View>
        </View>
        <View className='t-card'>
          <Image src={require('../../assets/car_bg_use@3x.png')} mode='aspectFit' className='t-card__bg' />
          <View className='t-card__wrapper'>
            <View className='t-card__bd'>
              <View className='label'>
                借书<Text>1</Text>次
              </View>
              <View className='desc red'>可用日期: 2019/9/1 至 2019/10/1</View>
            </View>
          </View>
        </View>
      </View>

      <View className='page-section rules'>
        <View className='section-header'>
          购卡须知
        </View>
        <View className='rules-content'>
          <RichText nodes='买借阅卡时优先使用用户余额抵扣' />
        </View>
      </View>

      <View className='footer'>
        <Button className='btn-primary btn--round'>购买阅读卡</Button>
      </View>

    </View>
  )
}

Page.config = {
  navigationBarTitleText: '次卡'
}

export default Page
