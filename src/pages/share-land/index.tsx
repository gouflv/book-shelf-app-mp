import './index.scss'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View className='page'>
      <View className='top'>
        <Image src='//placehold.it/200' mode='aspectFit' className='thumb' />
        <View className='title'>
          你的好友<Text className='orange'>马里奥</Text>送你5张借书卡
          <View>邀请你一起读书啦！</View>
        </View>
      </View>

      <View className='ticket-container'>
        <Image src={require('../../assets/invite_bg_rule@3x.png')} mode='aspectFit' className='bg' />
        <View className='ticket'>
          <View className='ticket__hd'>
            5<Text className='unit'>张</Text>
          </View>
          <View className='ticket__bd'>
            免费借阅卡5张
          </View>
        </View>
        <View className='ticket-desc'>
          產是完所象人著去心都究而對！業趣好減步的樣供色輕他座統你行陸，故話經
        </View>
      </View>

      <View className='footer'>
        <Button className='btn btn-primary'>领取免费借书卡</Button>
      </View>

      <Image src={require('../../assets/invite_bg@3x.png')} mode='aspectFit' className='page-bg' />
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}

export default Page
