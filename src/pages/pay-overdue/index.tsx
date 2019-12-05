import './index.scss'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'

const Page: Taro.FC = () => {

  async function onPaymentClick() {
    Taro.navigateTo({ url: '/pages/result/index?type=payOverdue' })
  }

  return (
    <View className='page-section page--gray'>

      <View className='card book-info-card'>
        <View className='card-body'>
          <Image className='thumb' src='//placehold.it/130x160' mode='aspectFit' />
          <View className='content'>
            <View className='title'>體兩清開進起有候過特中</View>
          </View>
        </View>
      </View>

      <View className='card-group-desc'>逾期信息</View>
      <View className='card'>
        <View className='cell-group'>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>借阅时间:</View>
            <View className='cell__ft'>
              2019-5-9 至 2019-5-12
            </View>
          </View>
          <View className='cell'>
            <View className='cell__bd'>归还时间:</View>
            <View className='cell__ft'>
              2019-5-14
            </View>
          </View>
          <View className='cell summary'>
            <View className='cell__bd bold'>逾期天数:</View>
            <View className='cell__ft red bold'>
              2天
            </View>
          </View>
        </View>
      </View>

      <View className='card-group-desc'>逾期费用</View>
      <View className='card'>
        <View className='cell-group'>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>
              逾期费用<Text className='red cell-hd-ext'>（每天0.6元）</Text>:
            </View>
            <View className='cell__ft'>
              <Text className='money red'>
                <Text className='money-unit'>¥</Text>90.99
              </Text>
            </View>
          </View>
          <View className='cell'>
            <View className='cell__bd'>余额抵扣:</View>
            <View className='cell__ft'>
              <Text className='money red'>
                -<Text className='money-unit'>¥</Text>90.99
              </Text>
            </View>
          </View>
          <View className='cell summary'>
            <View className='cell__bd bold'>合计:</View>
            <View className='cell__ft'>
              <Text className='money red bold'>
                <Text className='money-unit'>¥</Text>90.99
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
              <Text className='money-unit'>¥</Text>90.99
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
