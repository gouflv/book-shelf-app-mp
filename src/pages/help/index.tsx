import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'

const Page: Taro.FC = () => {

  function phoneCall() {
    Taro.makePhoneCall({ phoneNumber: '114' })
  }

  return (
    <View className='page page--gray'>
      <View className='card-group-title'>选择问题类型</View>
      <View className='card card--shadow menu'>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index?tag=2` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_borrowing@3x.png')} mode='aspectFit' />
          </View>
          <View className='name'>借阅中</View>
        </View>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index?tag=3` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_overdue@3x.png')} mode='aspectFit' />
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

      <View className='card-group-title'>常见问题</View>
      <View className='card'>
        <View className='cell-group'>
          <View className='cell'>
            <View className='cell__bd'>如何借书</View>
            <View className='cell__link'>
              <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
            </View>
          </View>
          <View className='cell'>
            <View className='cell__bd'>如何还书</View>
            <View className='cell__link'>
              <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
            </View>
          </View>
          <View className='cell'>
            <View className='cell__bd'>押金退还</View>
            <View className='cell__link'>
              <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
            </View>
          </View>
        </View>
      </View>

      <View className='footer'>
        <Button className='btn btn--round btn-primary btn-primary--plain' onClick={phoneCall}>客服电话</Button>
        <Button className='btn btn--round btn-primary btn-primary--plain' openType='contact'>在线客服</Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: ''
}

export default Page
