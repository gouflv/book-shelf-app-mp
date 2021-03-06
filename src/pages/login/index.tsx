import './index.scss'
import Taro, { useContext } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import AppStore from '../../store/app'

const Page: Taro.FC = () => {

  const { loginWithData } = useContext(AppStore)

  async function onGetUserInfo({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
    console.debug(encryptedData, iv)
    await loginWithData({ encryptedData, iv })
  }

  return (
    <View className='page'>
      <View className='page-section'>
        <Image src={require('../../assets/login@3x.jpg')} mode='aspectFit' className='top' />

        <View>
          <Button
            className='btn btn--round btn-primary'
            openType='getUserInfo'
            onGetUserInfo={e => onGetUserInfo(e.detail)}
          >
            <Image src={require('../../assets/icon-wechat@3x.png')} mode='aspectFit' />
            微信授权快捷登录
          </Button>
        </View>

        <View className='link gray'>
          授权即视为已同意<Text className='orange'>《葫芦弟弟借书馆用户协议》</Text>
        </View>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}

export default Page
