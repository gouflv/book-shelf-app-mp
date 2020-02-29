import './index.scss'
import Taro, { useContext } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { CardType, Order, OrderStatus } from '../../../typing'
import dayjs from 'dayjs'
import classNames from 'classnames'
import numeral from 'numeral'
import AppStore from '../../../store/app'
import { MoneyFormatter } from '../../../config'

const OrderType = {
  [OrderStatus.Borrow]: '借阅中',
  [OrderStatus.Overdue]: '已逾期',
  [OrderStatus.Finish]: '已完成'
}

const OrderItem: Taro.FC<{ data: Order }> = props => {
  const { setCurrentOrder, overduePrice } = useContext(AppStore)

  const renderAction = (data: Order) => {
    const overdueAmount = numeral(data.overdueDays || 0).multiply(overduePrice).format(MoneyFormatter)
    return (
      <View>
        <View className='actions'>
          {data.status === OrderStatus.Overdue && (
            <View className='state'>
              已逾期
              {data.overdueDays ? `${data.overdueDays}天` : ''}
              <Text className='money red bold'>
                <Text className='money-unit'>¥</Text>{overdueAmount}
              </Text>
            </View>
          )}
          <View className='btns'>
            {/*逾期归还*/}
            {data.status === OrderStatus.Overdue && data.returnTime && (
              <Button
                size='mini'
                className='btn btn-primary btn-primary--plain'
                onClick={() => {
                  setCurrentOrder(data)
                  Taro.navigateTo({ url: `/pages/pay-overdue/index?id=${data.orderNo}` })
                }}
              >
                逾期支付
              </Button>
            )}
            {data.status !== OrderStatus.Finish && (
              <Button
                size='mini'
                className='btn btn-primary btn--round'
                onClick={() => {
                  setCurrentOrder(data)
                  Taro.navigateTo({ url: `/pages/buy-book/index?id=${data.orderNo}` })
                }}
              >
                买下
              </Button>
            )}
            {data.billingExceptions !== '0' && (
              <Button size='mini' className='btn btn--plain btn--round'>
                计费异常
              </Button>
            )}
          </View>
        </View>
      </View>
    )
  }

  const renderBuyFlag = () => (
    <View className='flag-buy'>
      <Image src={require('../../../assets/order_icon_hasbought@2x.png')} className='icon' />
    </View>
  )

  const renderDescText = (data: Order) => {
    if (data.status === OrderStatus.Finish) {
      return <Text>归还时间: {dayjs(data.returnTime).format('YYYY-MM-DD')}</Text>
    }
    if (data.expireTime) {
      return <Text>到期时间: {dayjs(data.expireTime).format('YYYY-MM-DD')}</Text>
    }
  }

  const { data } = props
  if (!data) {
    return <View />
  }
  return (
    <View className='order-item order-item--shrink'>
      <View className='order-item__hd'>
        <Text className='date'>{data.createTime}</Text>
        {data.subStatus === '3' ?
          (
            <Text className='state gray'>
              已完成
            </Text>
          ) : (
            <Text className={classNames('state', {
              'green': data.status === OrderStatus.Borrow,
              'red': data.status === OrderStatus.Overdue,
              'gray': data.status === OrderStatus.Finish
            })}
            >
              {data.status === OrderStatus.Overdue
                ? (data.returnTime ? '逾期' : '已逾期')
                : OrderType[data.status]
              }
              {data.status === OrderStatus.Overdue
                ? (data.returnTime ? '/已归还' : '/未归还')
                : ''
              }
            </Text>
          )
        }
      </View>
      <View className='order-item__bd'>
        <Image className='thumb' src={data.booksImg || '//placehold.it/130x160'} mode='aspectFit' />
        <View className='content'>
          <View className='title'>{data.booksName}</View>
          <View className='desc'>
            {data.lendingcardType === CardType.DATE_RANGE
              ? <Image src={require('../../../assets/order_icon_borrowcard@2x.png')} mode='aspectFit' className='icon-card-1' />
              : <Image src={require('../../../assets/order_icon_secondarycard@2x.png')} mode='aspectFit' className='icon-card-1' />
            }
            {renderDescText(data)}
          </View>
          <View className='flex-grow' />
          {data.subStatus === '3'
            ? renderBuyFlag()
            : renderAction(data)
          }
        </View>
      </View>
    </View>
  )
}

OrderItem.options = {
  addGlobalClass: true
}

export default OrderItem
