import './index.scss'
import Taro, { useEffect, useState, useRouter, useContext } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { moneyFormat } from '../../utils'

const Page: Taro.FC = () => {
  const router = useRouter()
  const { fetchUserInfo } = useContext(AppStore)

  const [type, setType] = useState<string>()
  const [price, setPrice] = useState<string>()

  useEffect(() => {
    setType(router.params.type)
    setPrice(router.params.price)

    setTimeout(() => {
      fetchUserInfo()
    }, 2000)
  },[])

  useEffect(() => {
    switch (type) {
      case 'pay':
        Taro.setNavigationBarTitle({ title: '借阅卡' })
        break
      case 'deposit':
        Taro.setNavigationBarTitle({ title: '缴纳押金' })
        break
      case 'getBackDeposit':
        Taro.setNavigationBarTitle({ title: '退回押金' })
        break
      case 'buyBook':
        Taro.setNavigationBarTitle({ title: '商品购买' })
        break
      case 'payOverdue':
        Taro.setNavigationBarTitle({ title: '支付成功' })
        break
    }
  }, [type])

  function withReload(callback) {
    callback()
  }

  return (
    <View className='page'>
      {type === 'pay' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          {price && (
            <View className='money'>
              <Text className='money-unit'>¥</Text>
              {moneyFormat(price)}
            </View>
          )}
          <View className='title'>支付成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => withReload(() => Taro.switchTab({ url: '/pages/home/introGuard' }))}
            >
              去借书
            </Button>
          </View>
        </View>
      )}
      {type === 'deposit' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          {price && (
            <View className='money'>
              <Text className='money-unit'>¥</Text>
              {moneyFormat(price)}
            </View>
          )}
          <View className='title'>押金支付成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => withReload(() => Taro.switchTab({ url: '/pages/home/introGuard' }))}
            >
              去借书
            </Button>
          </View>
        </View>
      )}
      {type === 'getBackDeposit' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          {price && (
            <View className='money'>
              <Text className='money-unit'>¥</Text>
              {moneyFormat(price)}
            </View>
          )}
          <View className='title'>押金退还成功</View>
          <View className='desc gray'>预计在1个工作日内退还成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => withReload(() => Taro.navigateBack())}
            >
              完成
            </Button>
          </View>
        </View>
      )}
      {type === 'buyBook' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          {price && (
            <View className='money'>
              <Text className='money-unit'>¥</Text>
              {moneyFormat(price)}
            </View>
          )}
          <View className='title'>商品购买成功</View>
          <View className='desc gray'>预计在1个工作日内退还成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => withReload(() => Taro.navigateBack({ delta: 2 }))}
            >
              完成
            </Button>
          </View>
        </View>
      )}
      {type === 'payOverdue' && (
        <View className='page-section'>
          <Image src={require('../../assets/complete_icon@2x.png')} mode='aspectFit' className='icon' />
          {price && (
            <View className='money'>
              <Text className='money-unit'>¥</Text>
              {moneyFormat(price)}
            </View>
          )}
          <View className='title'>支付成功</View>
          <View>
            <Button
              className='btn btn--round btn-primary'
              onClick={() => withReload(() => Taro.navigateBack({ delta: 2 }))}
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
