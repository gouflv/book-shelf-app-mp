import './index.scss'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'

const OrderItem: Taro.FC = () => {
  // @ts-ignore
  // eslint-disable-next-line react/no-multi-comp
  const renderAction = () => {
    return (
      <View>
        <View className='actions'>
          <View className='state'>
            已逾期4天
            <Text className='money red bold'>
              <Text className='money-unit'>¥</Text>100
            </Text>
          </View>
          <View className='btns'>
            <Button
              size='mini'
              className='btn btn-primary btn-primary--plain btn--round'
              onClick={
                () => Taro.navigateTo({ url: `/pages/pay-overdue/index?id=1` })
              }
            >
              逾期支付
            </Button>
            <Button
              size='mini'
              className='btn btn-primary btn--round'
              onClick={
                () => Taro.navigateTo({ url: `/pages/buy-book/index?id=1` })
              }
            >
              买下
            </Button>
            <Button size='mini' className='btn btn--plain btn--round'>
              计费异常
            </Button>
          </View>
        </View>
      </View>
    )
  }

  // @ts-ignore
  // eslint-disable-next-line react/no-multi-comp
  const renderBuyFlag = () => (
    <View className='flag-buy'>
      <Image src={require('../../../assets/order_icon_hasbought@3x.png')} className='icon' />
    </View>
  )

  return (
    <View className='order-item order-item--shrink'>
      <View className='order-item__hd'>
        <Text className='date'>2019-09-11 12:22:11</Text>
        <Text className='state green'>借阅中</Text>
      </View>
      <View className='order-item__bd'>
        <Image className='thumb' src='//placehold.it/130x160' mode='aspectFit' />
        <View className='content'>
          <View className='title'>體兩清開進起有候過特中</View>
          <View className='desc'>
            <Image src={require('../../../assets/order_icon_borrowcard@3x.png')} mode='aspectFit' className='icon-card-1' />
            到期时间:
            2019-12-12
          </View>
          <View className='flex-grow' />
          {renderAction()}
        </View>
      </View>
    </View>
  )
}

OrderItem.options = {
  addGlobalClass: true
}

export default OrderItem
