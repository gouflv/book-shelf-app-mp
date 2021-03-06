import './index.scss'
import Taro, { useContext, useDidShow } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import dayjs from 'dayjs'
import { moneyFormat } from '../../utils'
import useBindPhone from '../../utils/bind-phone-hook'

const Page: Taro.FC = () => {
  const { user, wallet, fetchUserInfo, isUserBoundPhone } = useContext(AppStore)

  const { onGetPhoneNumber } = useBindPhone({
    success() {
      Taro.navigateTo({ url: '/pages/buy-deposit/index' })
    }
  })

  useDidShow(() => {
    fetchUserInfo()
  })

  if (!user || !wallet) {
    return <View />
  }
  return (
    <View className='page-wallet'>

      <View className='page-section'>
        <View className='section-header'>我的卡</View>
        <View className='section-body'>

          {wallet.effectiveTimes && (
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
                    <View className='desc'>{dayjs(wallet.effectiveTimes).format('YYYY-MM-DD')}到期</View>
                  </View>
                </View>
                <View className='user__ft'>
                  <View className='right'>葫芦借阅卡: 不限次</View>
                </View>
              </View>
            </View>
          )}

          <View className='card card--shadow' style={{ marginBottom: 0 }}>
            <View className='cell-group'>
              <View className='cell'>
                <View className='cell__bd'>
                  <View className='label'>借阅卡</View>
                  <View className='desc orange'>5折起</View>
                </View>
                <View className='cell__ft'>
                  <Button
                    className='btn-primary btn--square'
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
                <Text className='money red'>
                  <Text className='money-unit'>¥</Text>
                  {moneyFormat(wallet.balance)}
                </Text>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
              </View>
            </View>

            <View
              className='cell'
              onClick={() => {
                if (parseFloat(wallet.lendingCardTotal)) {
                  Taro.navigateTo({ url: '/pages/temp-cards/index' })
                }
              }}
            >
              <View className='cell__bd'>
                <View className='label'>借阅次卡</View>
                {!parseFloat(wallet.lendingCardTotal) && (
                  <View className='desc red'>暂无次卡</View>
                )}
              </View>
              {parseFloat(wallet.lendingCardTotal)
                ? (
                  <View className='cell__ft'>
                    <View className='red'>
                      {wallet.lendingCardTotal}张可用
                    </View>
                  </View>
                )
                : (
                  <View className='cell__ft' onClick={e => e.stopPropagation()}>
                    <Button
                      className='btn-primary btn--square'
                      size='mini'
                      onClick={() => Taro.navigateTo({ url: '/pages/buy-card/index' })}
                    >
                      去购买
                    </Button>
                  </View>
                )
              }
              {parseFloat(wallet.lendingCardTotal) && (
                <View className='cell__link'>
                  <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
                </View>
              )}
            </View>

            <View className='cell' onClick={() => {
              if (isUserBoundPhone && wallet.depositTotal) {
                Taro.navigateTo({ url: '/pages/deposit/index' })
              }
            }}
            >
              <View className='cell__bd'>
                <View className='label'>押金</View>
                {!wallet.depositTotal && (
                  <View className='desc red'>未缴纳</View>
                )}
              </View>

              {!isUserBoundPhone && (
                <View className='cell__ft'>
                  <Button
                    key='getPhoneNumber'
                    className='btn-primary btn--square'
                    size='mini'
                    openType='getPhoneNumber'
                    onGetPhoneNumber={e => onGetPhoneNumber(e.detail)}
                  >去缴纳</Button>
                </View>
              )}

              {isUserBoundPhone && (
                <View className='cell__ft'>
                  {wallet.depositTotal
                    ? (
                      <Text className='money red'>
                        <Text className='money-unit'>¥</Text>
                        {moneyFormat(wallet.depositTotal)}
                      </Text>
                    )
                    : (
                      <Button
                        className='btn-primary btn--square'
                        size='mini'
                        onClick={() => Taro.navigateTo({ url: '/pages/buy-deposit/index' })}
                      >
                        去缴纳
                      </Button>
                    )
                  }
                </View>
              )}

              {wallet.depositTotal && (
                <View className='cell__link'>
                  <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
                </View>
              )}
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
