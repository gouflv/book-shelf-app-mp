import './index.scss'
import Taro, { useContext, useEffect, useRouter, useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { moneyFormat, submitPayment } from '../../utils'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import numeral from 'numeral'

const Page: Taro.FC = () => {
  const { wallet } = useContext(AppStore)
  const router = useRouter()

  const [price] = useState(router.params.price)
  const [amount, setAmount] = useState()

  useEffect(() => {
    const val = numeral(price)
      .subtract(wallet ? wallet.balance : 0)
      .format('0[.]00')
    setAmount(val)
  }, [wallet, price])

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

      <View className='card book-info-card'>
        <View className='card-body'>
          <Image className='thumb' src={router.params.image || '//placehold.it/130x160'} mode='aspectFit' />
          <View className='content'>
            <View className='title'>{router.params.book}</View>
          </View>
        </View>
      </View>

      <View className='card'>
        <View className='cell-group'>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>书本售价:</View>
            <View className='cell__ft'>
              <Text className='money'>
                <Text className='money-unit money-unit--large'>¥</Text>
                {moneyFormat(bookPrice)}
              </Text>
            </View>
          </View>
          {/*<View className='cell cell--noborder'>*/}
          {/*  <View className='cell__bd'>优惠金额:</View>*/}
          {/*  <View className='cell__ft'>*/}
          {/*    <Text className='tag' style={{ marginRight: '10px' }}>7折</Text>*/}
          {/*    <Text className='money red'>*/}
          {/*      -<Text className='money-unit money-unit--large'>¥</Text>100*/}
          {/*    </Text>*/}
          {/*  </View>*/}
          {/*</View>*/}
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
