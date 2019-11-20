import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View className='page page--gray'>
      <View className='page-banner'>
        <Image src={require('../../assets/pay_icon@3x.png')} mode='aspectFit' />
        <View className='money red'>
          <Text className='money-unit'>¥</Text>
          199
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
                  99
                </View>
              </View>
            </View>
            <View className='cell'>
              <View className='cell__bd'>我的可用押金</View>
              <View className='cell__ft'>
                <View className='money'>
                  <Text className='money-unit'>¥</Text>
                  99
                </View>
              </View>
            </View>
            <View className='cell'>
              <View className='cell__bd' />
              <View className='cell__ft'>
                需缴押金：
                <Text className='money red'>
                  <Text className='money-unit'>¥</Text>
                  99
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
        <Button className='btn-block btn-primary btn--round'>
          确认支付199元押金
        </Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的押金'
}

export default Page
