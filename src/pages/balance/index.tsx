import './index.scss'
import Taro, { useContext, useDidShow } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { usePagination } from '../../store/usePagaination'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'

const Page: Taro.FC = () => {
  const { wallet } = useContext(AppStore)
  const { items, fetchStart, isEmpty, isFinish } = usePagination({ url: 'wallet/rechargeRecordList' })

  useDidShow(() => {
    fetchStart()
  })

  const renderList = () => {
    if (isEmpty) {
      return <View className='list-empty'>暂无记录</View>
    }
    return (
      <View className='card'>
        <View className='cell-group'>
          {items.map(item => (
            <View className='cell'>
              <View className='cell__bd'>
                <View className='label'>[缴纳]缴纳押金</View>
                <Text className='desc gray'>2019/11/12 18:00</Text>
              </View>
              <View className='cell__ft'>
                <View className='money red'>
                  +<Text className='money-unit money-unit--large'>¥</Text>
                  99
                </View>
              </View>
            </View>
          ))}
        </View>
        {isFinish && (
          <View className='list-finished'>到底了，我是有底线的</View>
        )}
      </View>
    )
  }

  return (
    <View className='page page--gray'>
      <View className='page-banner'>
        <Image src={require('../../assets/balance_bg@2x.png')} mode='aspectFill' className='bg' />
        <View className='content'>
          <View className='top'>余额</View>
          <View className='money red'>
            <Text className='money-unit'>¥</Text>
            {(wallet && wallet.depositTotal) ? wallet.depositTotal : 0}
          </View>
        </View>
      </View>

      <View className='page-section'>
        <View className='section-header'>
          余额记录
        </View>
        {renderList()}
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的余额'
}

export default observer(Page)
