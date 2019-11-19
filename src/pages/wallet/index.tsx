import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'

const Page: Taro.FC = () => {
  return (
    <View className='page-wallet'>

      <View className='page-section'>
        <View className='section-header'>我的卡</View>
        <View className='section-body'>

          <View className='user-card'>
            <View className='bg'>
              <Image src={require('../../assets/wallet_bg_car@3x.png')} mode='aspectFit' />
            </View>
            <View className='user'>
              <View className='user__hd'>
                <View className='thumb'>
                  <Image src='//placehold.it/200' mode='aspectFit' />
                </View>
                <View className='content'>
                  <View className='name'>哦哦</View>
                  <View className='desc'>2019-12-22到期</View>
                </View>
              </View>
              <View className='user__ft'>
                <View className='right'>葫芦借阅卡: 不限次</View>
              </View>
            </View>
          </View>

          <View className='card card--shadow'>
            <View className='cell-group'>
              <View className='cell'>
                <View className='cell__hd'>
                  <View className='label'>借阅卡</View>
                  <View className='desc orange'>5折起</View>
                </View>
                <View className='cell__bd'>
                  <Button className='btn-primary' size='mini'>购买</Button>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>

      <View className='page-section'>
        <View className='section-header'>我的资产</View>
        <View className='section-body'>

          <View className='card card--shadow cell-group'>
            <View className='cell'>
              <View className='cell__hd'>
                <View className='label'>余额</View>
              </View>
              <View className='cell__bd'>
                <View className='red'>100.2</View>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
              </View>
            </View>

            <View className='cell'>
              <View className='cell__hd'>
                <View className='label'>借阅次卡</View>
              </View>
              <View className='cell__bd'>
                <View className='red'>2张可用</View>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
              </View>
            </View>

            <View className='cell'>
              <View className='cell__hd'>
                <View className='label'>押金</View>
              </View>
              <View className='cell__bd'>
                <View className='red'>100</View>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@3x.png')} mode='aspectFit' />
              </View>
            </View>

          </View>
        </View>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的钱包'
}

export default Page
