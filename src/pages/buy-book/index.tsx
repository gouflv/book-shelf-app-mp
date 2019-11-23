import './index.scss'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'

const Page: Taro.FC = () => {
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

      <View className='card'>
        <View className='cell-group'>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>书本售价:</View>
            <View className='cell__ft'>
              <Text className='money'>
                <Text className='money-unit money-unit--large'>¥</Text>100
              </Text>
            </View>
          </View>
          <View className='cell cell--noborder'>
            <View className='cell__bd'>优惠金额:</View>
            <View className='cell__ft'>
              <Text className='tag' style={{ marginRight: '10px' }}>7折</Text>
              <Text className='money red'>
                -<Text className='money-unit money-unit--large'>¥</Text>100
              </Text>
            </View>
          </View>
          <View className='cell'>
            <View className='cell__bd'>余额抵扣:</View>
            <View className='cell__ft'>
              <Text className='money red'>
                -<Text className='money-unit money-unit--large'>¥</Text>100
              </Text>
            </View>
          </View>
          <View className='cell summary'>
            <View className='cell__bd bold'>合计:</View>
            <View className='cell__ft'>
              <Text className='money red bold'>
                <Text className='money-unit money-unit--large'>¥</Text>100
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
        <Button className='btn btn-primary btn--round'>确认支付</Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '购买图书'
}

export default Page
