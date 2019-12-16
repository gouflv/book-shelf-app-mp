import './index.scss'
import Taro, { useContext, useEffect, useState, useRouter } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { moneyFormat } from '../../utils'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import numeral from 'numeral'
import { MoneyFormatter } from '../../config'
import usePayment from '../../utils/payment-hook'

const Page: Taro.FC = () => {
  const router = useRouter()
  const { wallet, currentOrder } = useContext(AppStore)
  const { submitPayment } = usePayment()

  const [price, setPrice] = useState<string>()
  const [discountAmount, setDiscountAmount] = useState<string>()
  const [amount, setAmount] = useState<string>()

  useEffect(() => {
    if (currentOrder && wallet) {
      setPrice(currentOrder.booksPrice)

      const discount = numeral(currentOrder.booksPrice).multiply(1- 0.7)
      setDiscountAmount(discount.format(MoneyFormatter))

      const val = numeral(currentOrder.booksPrice)
        .subtract(discount.value())
        .subtract(wallet.balance)
      setAmount((val.value() < 0) ? '0' : val.format(MoneyFormatter))
    }
  }, [currentOrder, wallet])

  async function onPaymentClick() {
    await submitPayment({
      url: 'book/payToSaleOrder',
      data: {
        orderNo: router.params.id
      }
    })
    Taro.navigateTo({ url: '/pages/result/index?type=buyBook' })
  }

  return (
    <View className='page-section page--gray'>

      {currentOrder && (
        <View className='card book-info-card'>
          <View className='card-body'>
            <Image className='thumb' src={currentOrder.booksImg || '//placehold.it/130x160'} mode='aspectFit' />
            <View className='content'>
              <View className='title'>{currentOrder.booksName}</View>
            </View>
          </View>
        </View>
      )}

      <View className='card'>
        <View className='cell-group'>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>书本售价:</View>
            <View className='cell__ft'>
              <Text className='money'>
                <Text className='money-unit money-unit--large'>¥</Text>
                {moneyFormat(price)}
              </Text>
            </View>
          </View>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>优惠金额:</View>
            <View className='cell__ft'>
              <Text className='tag' style={{ marginRight: '10px' }}>7折</Text>
              <Text className='money red'>
                -<Text className='money-unit money-unit--large'>¥</Text>
                {discountAmount}
              </Text>
            </View>
          </View>
          <View className='cell'>
            <View className='cell__bd'>余额抵扣:</View>
            <View className='cell__ft'>
              <Text className='money red'>
                -<Text className='money-unit money-unit--large'>¥</Text>
                {wallet && moneyFormat(wallet.balance)}
              </Text>
            </View>
          </View>
          <View className='cell summary'>
            <View className='cell__bd bold'>合计:</View>
            <View className='cell__ft'>
              <Text className='money red bold'>
                <Text className='money-unit money-unit--large'>¥</Text>
                {amount}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className='payment-footer'>
        <View className='left'>
          <View>
            需支付：
            <Text className='money red bold'>
              <Text className='money-unit'>¥</Text>
              {amount}
            </Text>
          </View>
        </View>
        <Button className='btn btn-primary' onClick={onPaymentClick}>确认支付</Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '购买图书'
}

export default observer(Page)
