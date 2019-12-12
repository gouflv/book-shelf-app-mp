import './index.scss'
import Taro, { useContext, useRouter, useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { moneyFormat, submitPayment } from '../../utils'
import AppStore from '../../store/app'
import numeral from 'numeral'
import dayjs from 'dayjs'

const Page: Taro.FC = () => {
  const router = useRouter()
  const { wallet, currentOrder } = useContext(AppStore)

  const [overdueAmount, setOverdueAmount] = useState<string>()
  const [amount, setAmount] = useState<string>()
  useEffect(() => {
    if (wallet && currentOrder) {
      const days = numeral(currentOrder.beOverdueNum || 0)
      const balance = wallet ? wallet.balance : '0'

      const overdue = days.multiply(0.6)
      setOverdueAmount(overdue.format('0[.]00'))

      const pay = numeral(overdue).multiply(balance)
      setAmount(
        (pay.value() < 0 ) ? '0' : pay.format('0[.]00')
      )
    }
  }, [wallet, currentOrder])

  async function onPaymentClick() {
    await submitPayment({
      url: 'book/payRenewingOrder',
      data: {
        orderNo: router.params.id
      }
    })
    Taro.navigateTo({ url: '/pages/result/index?type=payOverdue' })
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
              逾期费用<Text className='red cell-hd-ext'>（每天0.6元）</Text>:
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
                {wallet && moneyFormat(wallet.balance)}
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
