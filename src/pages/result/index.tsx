import './index.scss'
import Taro, { useEffect, useState, useRouter } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'

const Page: Taro.FC = () => {
  const router = useRouter()
  const [type, setType] = useState<string>()

  useEffect(() => {
    setType(router.params.type)
  },[])

  return (
    <View className='page'>
      {type}
      {type === 'pay' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          <View className='money'>
            <Text className='money-unit'>¥</Text>
            19.9
          </View>
          <View className='title'>支付成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => Taro.switchTab({ url: '/pages/index/introGuard' })}
            >
              去借书
            </Button>
          </View>
        </View>
      )}
      {type === 'deposit' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          <View className='money'>
            <Text className='money-unit'>¥</Text>
            19.9
          </View>
          <View className='title'>押金支付成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => Taro.switchTab({ url: '/pages/index/introGuard' })}
            >
              去借书
            </Button>
          </View>
        </View>
      )}
      {type === 'getBackDeposit' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          <View className='money'>
            <Text className='money-unit'>¥</Text>
            19.9
          </View>
          <View className='title'>押金退还成功</View>
          <View className='desc gray'>预计在1个工作日内退还成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => Taro.navigateBack()}
            >
              完成
            </Button>
          </View>
        </View>
      )}
      {type === 'buyBook' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          <View className='money'>
            <Text className='money-unit'>¥</Text>
            19.9
          </View>
          <View className='title'>商品购买成功</View>
          <View className='desc gray'>预计在1个工作日内退还成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => Taro.navigateBack({ delta: 2 })}
            >
              完成
            </Button>
          </View>
        </View>
      )}
      {type === 'payOverdue' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          <View className='money'>
            <Text className='money-unit'>¥</Text>
            19.9
          </View>
          <View className='title'>支付成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => Taro.navigateBack({ delta: 2 })}
            >
              完成
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}

Page.config = {
  navigationBarTitleText: ''
}

export default Page
