import './index.scss'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { Order, OrderStatus } from '../../../typing'

const OrderItem: Taro.FC<{ data: Order }> = props => {
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
              className='btn btn-primary btn-primary--plain'
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

  const { data } = props
  return (
    <View className='order-item order-item--shrink'>
      <View className='order-item__hd'>
        <Text className='date'>{data.createTime}</Text>
        <Text className='state green'>
          {
            {
              [OrderStatus.Borrow]: '借阅中',
              [OrderStatus.Overdue]: '已逾期',
              [OrderStatus.Finish]: '已完成'
            }[data.status]
          }
        </Text>
      </View>
      <View className='order-item__bd'>
        <Image className='thumb' src={data.booksImg || '//placehold.it/130x160'} mode='aspectFit' />
        <View className='content'>
          <View className='title'>{data.goodsNames || data.booksName}</View>
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
