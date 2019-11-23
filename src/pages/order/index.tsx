import './index.scss'
import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import OrderItem from './OrderItem'

const Page: Taro.FC = () => {
  const [tab, setTab] = useState<1 | 2 | 3 | 4>(1)

  return (
    <View className='page--gray'>
      <View className='top-tabbar'>
        <View
          className={classNames('item', { 'item--active': tab === 1 })}
          onClick={() => setTab(1)}
        >
          全部
        </View>
        <View
          className={classNames('item', { 'item--active': tab === 2 })}
          onClick={() => setTab(2)}
        >
          借阅中
        </View>
        <View
          className={classNames('item', { 'item--active': tab === 3 })}
          onClick={() => setTab(3)}
        >
          已逾期
        </View>
        <View
          className={classNames('item', { 'item--active': tab === 4 })}
          onClick={() => setTab(4)}
        >
          已完成
        </View>
      </View>

      <View className='page-container'>
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '借阅订单'
}

export default Page
