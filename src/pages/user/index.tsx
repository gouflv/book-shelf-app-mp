import Taro from '@tarojs/taro'
import { Image, View, Text } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View className='page--gray'>

      <View className='banner'>
        <View className='bg'>
          <Image src={require('../../assets/wallet_bg_car@3x.png')} mode='scaleToFill' />
        </View>
        <View className='content'>
          <View className='thumb'>
            <Image src='//placehold.it/200' mode='aspectFill' />
          </View>
          <View className='name'>用户A</View>
          <View className='desc'>宝宝已经开了21本书</View>
        </View>
      </View>

      <View className='card card--shadow menu'>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index?tag=2` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_borrowing@3x.png')} mode='aspectFit' />
            <View className='badge'>1</View>
          </View>
          <View className='name'>借阅中</View>
        </View>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index?tag=3` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_overdue@3x.png')} mode='aspectFit' />
            <View className='badge'>2</View>
          </View>
          <View className='name'>已逾期</View>
        </View>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index?tag=4` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_completed@3x.png')} mode='aspectFit' />
          </View>
          <View className='name'>已完成</View>
        </View>
      </View>

      <View className='page-section'>
        <View className='card card--shadow'>
          <View className='cell-group'>
            <View className='cell'>
              <View className='cell__hd'>
                <Image src={require('../../assets/me_icon_wallet@3x.png')} mode='aspectFit' />
              </View>
              <View className='cell__bd'>我的钱包</View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
              </View>
            </View>
            <View className='cell'>
              <View className='cell__hd'>
                <Image src={require('../../assets/me_icon_invite@3x.png')} mode='aspectFit' />
              </View>
              <View className='cell__bd'>邀请好友</View>
              <View className='cell__ft'>
                <Text className='orange'>得5次免费借阅</Text>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
              </View>
            </View>
            <View className='cell'>
              <View className='cell__hd'>
                <Image src={require('../../assets/me_icon_customerservice@3x.png')} mode='aspectFit' />
              </View>
              <View className='cell__bd'>客服帮助</View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
              </View>
            </View>
          </View>
        </View>
      </View>

    </View>
  )
}

Page.config = {
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#f6b810'
}

export default Page
