import './index.scss'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import { moneyFormat } from '../../utils'
import usePayment from '../../utils/payment-hook'

const Page: Taro.FC = () => {
  const { wallet, depositAmount } = useContext(AppStore)
  const { submitPayment } = usePayment()

  const [payAmount, setPayAmount] = useState('0')
  useEffect(() => {
    if (wallet) {
      setPayAmount(moneyFormat(depositAmount - wallet.depositTotal))
    }
  }, [depositAmount, wallet])

  async function onPaymentClick() {
    await submitPayment({
      amount: parseFloat(payAmount),
      url: 'wallet/payDepositCash',
      data: {}
    })
    Taro.navigateTo({ url: `/pages/result/index?type=deposit&price=${payAmount}` })
  }

  return (
    <View className='page page--gray'>
      <View className='page-banner'>
        <Image src={require('../../assets/pay_icon@2x.png')} mode='aspectFit' />
        <View className='money red'>
          <Text className='money-unit'>¥</Text>
          {depositAmount}
        </View>
        <View className='title'>押金总额</View>
        <View className='desc'>
          押金随时退, 无需舍和退款秒到账
        </View>
      </View>

      <View className='page-section'>
        <View className='card'>
          <View className='cell-group'>
            <View className='cell'>
              <View className='cell__bd'>押金总额</View>
              <View className='cell__ft'>
                <View className='money'>
                  <Text className='money-unit'>¥</Text>
                  {depositAmount}
                </View>
              </View>
            </View>
            <View className='cell'>
              <View className='cell__bd'>我的可用押金</View>
              <View className='cell__ft'>
                <View className='money'>
                  <Text className='money-unit'>¥</Text>
                  {wallet && moneyFormat(wallet.depositTotal)}
                </View>
              </View>
            </View>
            <View className='cell'>
              <View className='cell__bd' />
              <View className='cell__ft'>
                需缴押金：
                <Text className='money red'>
                  <Text className='money-unit'>¥</Text>
                  {payAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='page-section buy-rules' style={{ paddingTop: 0 }}>
        <View className='buy-rules-content center'>
          确认购买即视为已同意<Text className='orange'>《借阅卡卡权益及服务规则》</Text>
        </View>
        <Button className='btn-block btn-primary' onClick={onPaymentClick}>
          确认支付{payAmount}元押金
        </Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的押金'
}

export default observer(Page)
