import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Input, View } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View className='page-section'>

      <View className="form">
        <View className='form-item'>
          <Input placeholder='请输入您要绑定的新手机号' />
        </View>
        <View className='form-item'>
          <Input placeholder='请输入短信验证码' />
          <Button className='btn btn--plain orange btn-send' size='mini'>
            获取验证码
          </Button>
        </View>
      </View>

      <Button className='btn btn-primary'>确认更换</Button>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '手机号更换'
}

export default Page
