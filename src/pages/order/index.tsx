import './index.scss'
import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import OrderItem from './OrderItem'
import { usePagination } from '../../store/usePagaination'

const Page: Taro.FC = () => {
  const [tab, setTab] = useState<1 | 2 | 3 | 4>(1)

  const { items, fetchStart, isFinish, isEmpty, loading } = usePagination({
    url: 'account/getOrderPageList'
  })

  useDidShow(() => {
    fetchStart()
  })

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

      isFinish:{isFinish}
      isEmpty:{isEmpty}
      loading:{loading}

      <View className='page-container'>
        {items.map(item => (
          <OrderItem key={item.orderNo} data={item} />
        ))}
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '借阅订单'
}

export default Page
