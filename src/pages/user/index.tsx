import './index.scss'
import Taro, { useContext, useState, useDidShow } from '@tarojs/taro'
import { Image, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import AppStore from '../../store/app'
import { POST } from '../../utils'

const Page: Taro.FC = () => {
  const { user } = useContext(AppStore)

  const [notification, setNotification] = useState()
  useDidShow(async () => {
    const data = await POST('account/myOrder')
    setNotification(data)
  })

  function showNotify(key: 'borrowingNum' | 'beOverdueNum') {
    if (notification) {
      const val = notification[key]
      return val === '0' ? 0 : val
    }
    return 0
  }

  if (!user) {
    return <View />
  }
  return (
    <View className='page--gray'>

      <View className='banner'>
        <View className='bg'>
          <Image src={require('../../assets/user-bg.jpg')} mode='scaleToFill' />
        </View>
        <View className='content'>
          <View className='thumb' onClick={() => Taro.navigateTo({ url: '/pages/profile/index' })}>
            <Image src={user.image || '//placehold.it/200'} mode='aspectFill' />
          </View>
          <View className='name'>{user.nickName}</View>
          {notification && (
            <View className='desc'>宝宝已经看了{notification.readNum}本书</View>
          )}
        </View>
      </View>

      <View className='card card--shadow menu'>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_borrowing@2x.png')} mode='aspectFit' />
            {showNotify('borrowingNum') && (
              <View className='badge'>{showNotify('borrowingNum')}</View>
            )}
          </View>
          <View className='name'>借阅中</View>
        </View>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index?tab=3` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_overdue@2x.png')} mode='aspectFit' />
            {showNotify('beOverdueNum') && (
              <View className='badge'>{showNotify('beOverdueNum')}</View>
            )}
          </View>
          <View className='name'>已逾期</View>
        </View>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/order/index?tab=4` })}>
          <View className='thumb'>
            <Image src={require('../../assets/me_icon_completed@2x.png')} mode='aspectFit' />
          </View>
          <View className='name'>已完成</View>
        </View>
      </View>

      <View className='page-section'>
        <View className='card card--shadow'>
          <View className='cell-group'>
            <View className='cell' onClick={() => Taro.switchTab({ url: '/pages/wallet/index' })}>
              <View className='cell__hd'>
                <Image src={require('../../assets/me_icon_wallet@2x.png')} mode='aspectFit' />
              </View>
              <View className='cell__bd'>我的钱包</View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
              </View>
            </View>
            <View className='cell' onClick={() => Taro.navigateTo({ url: '/pages/share/index' })}>
              <View className='cell__hd'>
                <Image src={require('../../assets/me_icon_invite@2x.png')} mode='aspectFit' />
              </View>
              <View className='cell__bd'>邀请好友</View>
              <View className='cell__ft'>
                <Text className='orange'>得5次免费借阅</Text>
              </View>
              <View className='cell__link'>
                <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
              </View>
            </View>
            <View className='cell' onClick={() => Taro.navigateTo({ url: '/pages/help/index' })}>
              <View className='cell__hd'>
                <Image src={require('../../assets/me_icon_customerservice@2x.png')} mode='aspectFit' />
              </View>
              <View className='cell__bd'>客服帮助</View>
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
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#f6b810',
  navigationStyle: 'custom'
}

export default observer(Page)
