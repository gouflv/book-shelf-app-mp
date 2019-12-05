import './index.scss'
import Taro, { useContext } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'

const Page: Taro.FC = () => {
  const { user } = useContext(AppStore)


  if (!user) {
    return <View />
  }
  return (
    <View className='page-wallet'>

      <View className='page-section'>
        <View className='section-header'>我的卡</View>
        <View className='section-body'>

          <View className='user-card'>
            <View className='bg'>
              <Image src={require('../../assets/wallet_bg_car@2x.png')} mode='aspectFit' />
            </View>
            <View className='user'>
              <View className='user__hd'>
                <View className='thumb'>
                  <Image src={user.image || '//placehold.it/200'} mode='aspectFill' />
                </View>
                <View className='content'>
                  <View className='name'>{user.nickName}</View>
                  <View className='desc'>{user.effectiveTimes}到期</View>
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
                <View className='cell__bd'>
                  <View className='label'>借阅卡</View>
                  <View className='desc orange'>5折起</View>
                </View>
                <View className='cell__ft'>
                  <Button
                    className='btn-primary'
                    size='mini'
                    onClick={() => Taro.navigateTo({ url: '/pages/buy-card/index' })}
                  >
                    购买
                  </Button>
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
            <View className='cell' onClick={() => Taro.navigateTo({ url: '/pages/balance/index' })}>
              <View className='cell__bd'>
                <View className='label'>余额</View>
              </View>
              <View className='cell__ft'>
                <View className='red'>{user.balance}</View>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
              </View>
            </View>

            <View className='cell' onClick={() => Taro.navigateTo({ url: '/pages/temp-cards/index' })}>
              <View className='cell__bd'>
                <View className='label'>借阅次卡</View>
              </View>
              <View className='cell__ft'>
                <View className='red'>{user.lendingCardTotal}张可用</View>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
              </View>
            </View>

            <View className='cell' onClick={() => Taro.navigateTo({ url: '/pages/deposit/index' })}>
              <View className='cell__bd'>
                <View className='label'>押金</View>
              </View>
              <View className='cell__ft'>
                <View className='red'>{user.depositTotal}</View>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
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

export default observer(Page)
