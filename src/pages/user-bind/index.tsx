import './index.scss'
import Taro, { useContext } from '@tarojs/taro'
import { Button, Image, Input, View } from '@tarojs/components'
import AppStore from '../../store/app'

const Page: Taro.FC = () => {
  const {} = useContext(AppStore)

  async function submit() {
    Taro.navigateTo({ url: '/pages/index/index' })
  }

  return (
    <View className='page'>
      <View className='page-section'>
        <Image src={require('../../assets/login@3x.jpg')} mode='aspectFit' className='top' />

        <View className='form'>
          <View className='item'>
            <Image src={require('../../assets/login-btn1@2x.png')} mode='aspectFit' className='icon' />
            <Input className='input' placeholder='请输入账号' />
          </View>
          <View className='item'>
            <Image src={require('../../assets/login-btn2@2x.png')} mode='aspectFit' className='icon' />
            <Input className='input' placeholder='请输入密码' />
          </View>
        </View>

        <Button className='btn btn-primary' onClick={submit}>绑定手机号</Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '葫芦弟弟智能机柜管理端'
}

export default Page
