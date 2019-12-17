import './index.scss'
import Taro, { useEffect, useShareAppMessage, ShareAppMessageReturn } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { app } from '../../store/app'

const Page: Taro.FC = () => {

  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }, [])

  useShareAppMessage(() => {
    const config: ShareAppMessageReturn = {
      title: '送您5张免费借书卡，一起来葫芦弟弟借书吧',
      // imageUrl: '',
      path: `/pages/share/land?memberCode=${(app.user as any).memberCode}`
    }
    return config
  })

  return (
    <View>
      <View className='banner'>
        <Image src={require('../../assets/invitefriends_bg@2x.png')} mode='aspectFit' className='bg' />
        <View className='content'>
          <View className='title'>邀请新用户借书，各得五张免费借书卡</View>
          <View className='desc gray'>若你的借阅卡在有效期内，则获得5天延期</View>
          <Button className='btn btn-primary' openType='share'>邀请好友一起读</Button>
        </View>
      </View>

      <View className='page-section' style={{ paddingTop: 0 }}>
        <View className='card-group-title'>邀请记录</View>
        <View className='card card--shadow'>
          <View className='cell-group'>
            <View className='cell'>
              <View className='cell__hd'>
                <Image src='//placehold.it/100' mode='aspectFit' className='thumb' />
              </View>
              <View className='cell__bd'>
                <View className='label'>MWMWMW</View>
                <View className='desc gray'>邀请成功: 2019-5-14</View>
              </View>
              <View className='cell__ft red bold'>
                +5张次卡
              </View>
            </View>
            <View className='cell'>
              <View className='cell__hd'>
                <Image src='//placehold.it/100' mode='aspectFit' className='thumb' />
              </View>
              <View className='cell__bd'>
                <View className='label'>MWMWMW</View>
                <View className='desc gray'>邀请成功: 2019-5-14</View>
              </View>
              <View className='cell__ft red bold'>
                +5张次卡
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: ''
}

export default Page
