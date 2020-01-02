import './index.scss'
import Taro, { useContext, useEffect, useRouter, useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { moneyFormat } from '../../utils'
import AppStore, { app } from '../../store/app'
import dayjs from 'dayjs'
import usePayment from '../../utils/payment-hook'

const Page: Taro.FC = () => {
  const router = useRouter()
  const { wallet, currentOrder, overduePrice } = useContext(AppStore)
  const { submitPayment } = usePayment()

  const [overdueAmount, setOverdueAmount] = useState('0')
  const [balanceCutAmount, setBalanceCutAmount] = useState('0')
  const [amount, setAmount] = useState('0')

  useEffect(() => {
    if (wallet && currentOrder) {
      const days = parseInt(currentOrder.beOverdueNum) || 0
      const balance = wallet.balance
      const overdue = days * app.overduePrice
      const pay = Math.max(0, overdue - balance)
      const balanceCut = Math.min(balance, overdue)

      setOverdueAmount(moneyFormat(overdue))
      setBalanceCutAmount(moneyFormat(balanceCut))
      setAmount(moneyFormat(pay))
    }
  }, [wallet, currentOrder])

  async function onPaymentClick() {
    await submitPayment({
      amount: parseFloat(amount),
      url: 'book/payRenewingOrder',
      data: {
        orderNo: router.params.id
      }
    })
    Taro.navigateTo({ url: `/pages/result/index?type=payOverdue&price=${amount}` })
  }

  return (
    <View className='page-section page--gray'>

      {currentOrder && (
        <View>
          <View className='card book-info-card'>
            <View className='card-body'>
              <Image className='thumb' src={currentOrder.booksImg || '//placehold.it/130x160'} mode='aspectFit' />
              <View className='content'>
                <View className='title'>{currentOrder.booksName}</View>
              </View>
            </View>
          </View>

          <View className='card-group-desc'>逾期信息</View>
          <View className='card'>
            <View className='cell-group'>
              <View className='cell cell--noborder'>
                <View className='cell__bd'>借阅时间:</View>
                <View className='cell__ft'>
                  {dayjs(currentOrder.createTime).format('YYYY-MM-DD')}
                  至
                  {dayjs(currentOrder.expireTime).format('YYYY-MM-DD')}
                </View>
              </View>
              {currentOrder && currentOrder.returnTime && (
                <View className='cell'>
                  <View className='cell__bd'>归还时间:</View>
                  <View className='cell__ft'>
                    {dayjs(currentOrder.returnTime).format('YYYY-MM-DD')}
                  </View>
                </View>
              )}
              <View className='cell summary'>
                <View className='cell__bd bold'>逾期天数:</View>
                <View className='cell__ft red bold'>
                  {currentOrder.beOverdueNum || 0}天
                </View>
              </View>
            </View>
          </View>
        </View>
      )}

      <View className='card-group-desc'>逾期费用</View>
      <View className='card'>
        <View className='cell-group'>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>
              逾期费用<Text className='red cell-hd-ext'>（每天{overduePrice}元）</Text>:
            </View>
            <View className='cell__ft'>
              <Text className='money red'>
                <Text className='money-unit'>¥</Text>
                {overdueAmount}
              </Text>
            </View>
          </View>
          <View className='cell'>
            <View className='cell__bd'>余额抵扣:</View>
            <View className='cell__ft'>
              <Text className='money red'>
                -<Text className='money-unit'>¥</Text>
                {balanceCutAmount}
              </Text>
            </View>
          </View>
          <View className='cell summary'>
            <View className='cell__bd bold'>合计:</View>
            <View className='cell__ft'>
              <Text className='money red bold'>
                <Text className='money-unit'>¥</Text>
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
  navigationBarTitleText: '逾期支付'
}

export default Page
