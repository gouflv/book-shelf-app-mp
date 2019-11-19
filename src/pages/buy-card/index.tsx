import './index.scss'
import Taro from '@tarojs/taro'
import { View, Text, RichText, Button } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View className='page-buy-card'>

      <View className='page-section'>
        <View className='section-header'>
          借阅卡
          <Text className='desc'>(不限次数, 每次借2本)</Text>
        </View>
        <View className='card card--shadow card--checked'>
          <View className='cell'>
            <View className='cell__hd'>

            </View>
            <View className='cell__bd'>
              <View className='label bold'>
                30
                <Text className='label-unit'>天</Text>
              </View>
              <View className='desc gray'>月卡, 不限次数</View>
            </View>
            <View className='cell__ft'>
              <View className='money red bold'>
                <Text className='money-unit'>$</Text>100
              </View>
              <View className='money-desc'>每天1.2元</View>
            </View>
          </View>
        </View>
        <View className='card card--shadow'>
          <View className='cell'>
            <View className='cell__hd'>

            </View>
            <View className='cell__bd'>
              <View className='label bold'>
                30
                <Text className='label-unit'>天</Text>
              </View>
              <View className='desc gray'>月卡, 不限次数</View>
            </View>
            <View className='cell__ft'>
              <View className='money red bold'>
                <Text className='money-unit'>$</Text>100
              </View>
              <View className='money-desc'>每天1.2元</View>
            </View>
          </View>
        </View>
      </View>

      <View className='page-section' style={{ paddingTop: 0 }}>
        <View className='section-header'>
          次卡
          <Text className='desc'>(长期有效, 每次借2本)</Text>
        </View>
        <View className='card card--shadow card--checked'>
          <View className='cell'>
            <View className='cell__hd'>

            </View>
            <View className='cell__bd'>
              <View className='label bold'>
                30
                <Text className='label-unit'>次卡</Text>
              </View>
              <View className='desc gray'>每次借3天, 周末不计费</View>
            </View>
            <View className='cell__ft'>
              <View className='money red bold'>
                <Text className='money-unit'>$</Text>100
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='page-section rules' style={{ paddingTop: 0 }}>
        <View className='section-header'>
          购卡须知
        </View>
        <View className='rules-content'>
          <RichText nodes='买借阅卡时优先使用用户余额抵扣' />
        </View>
        <View className='rules-content'>
          确认购买即视为已同意<Text className='orange'>《借阅卡卡权益及服务规则》</Text>
        </View>
      </View>

      <View className='footer'>
        <View className='left'>
          <View>
            共计：
            <Text className='money red'>
              <Text className='money-unit'>$</Text>90.99
            </Text>
          </View>
          <View>账户余额可抵扣: 9元</View>
        </View>
        <Button className='btn-primary btn--round'>购买</Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '借阅卡'
}

export default Page
