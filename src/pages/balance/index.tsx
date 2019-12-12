import './index.scss'
import Taro, { useContext, useDidShow } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { usePagination } from '../../store/usePagaination'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import { moneyFormat } from '../../utils'

const RechargeType = {
  0: '赠送',
  1: '退款',
  2: '消费',
}

const Page: Taro.FC = () => {
  const { wallet } = useContext(AppStore)
  const { items, fetchStart, isEmpty, isFinish } = usePagination({ url: 'wallet/rechargeRecordList' })

  useDidShow(() => {
    fetchStart()
  })

  // eslint-disable-next-line react/no-multi-comp
  const renderList = () => {
    if (isEmpty) {
      return <View className='list-empty'>暂无记录</View>
    }
    return (
      <View>
        <View className='card'>
          <View className='cell-group'>
            {items.map(item => (
              <View key={item.rechargeId} className='cell'>
                <View className='cell__bd'>
                  <View className='label'>{RechargeType[item.rechargeType] || item.rechargeType}</View>
                  <Text className='desc gray'>{item.rechargeDate}</Text>
                </View>
                <View className='cell__ft'>
                  {item.rechargeType === '2'
                    ? (
                      <View className='money green'>
                        -<Text className='money-unit money-unit--large'>¥</Text>
                        {moneyFormat(item.rechargePrice)}
                      </View>
                    )
                    : (
                      <View className='money red'>
                        +<Text className='money-unit money-unit--large'>¥</Text>
                        {moneyFormat(item.rechargePrice)}
                      </View>
                    )
                  }
                </View>
              </View>
            ))}
          </View>
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
            {wallet && moneyFormat(wallet.depositTotal)}
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
