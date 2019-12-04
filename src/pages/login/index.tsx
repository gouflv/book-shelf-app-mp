import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'

const Page: Taro.FC = () => {

  function onGetPhoneNumber({ encryptedData, iv }) {
    console.log(encryptedData, iv)
  }

  return (
    <View className='page'>
      <View className='page-section'>
        <Image src={require('../../assets/login@3x.png')} mode='aspectFit' className='top' />

        <View>
          <Button
            className='btn btn--round btn-primary'
            openType='getPhoneNumber'
            onGetPhoneNumber={e => onGetPhoneNumber(e.detail)}
          >
            <Image src={require('../../assets/icon-wechat@3x.png')} mode='aspectFit' />
            微信授权快捷登录
          </Button>
        </View>

        <View className='link gray'>
          授权即视为已同意<Text className='orange'>《葫芦弟弟借书助手用户协议》</Text>
        </View>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}

export default Page
