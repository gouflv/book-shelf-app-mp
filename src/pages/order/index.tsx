import './index.scss'
import Taro, { useDidShow, useEffect, useState, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import OrderItem from './OrderItem'
import { usePagination } from '../../store/usePagaination'

const Page: Taro.FC = () => {
  const router = useRouter()
  const [tab, setTab] = useState<1 | 2 | 3 | 4>(
    (router.params.tab ? parseInt(router.params.tab) : 1) as any
  )
  const [params, setParams] = useState()

  const { items, fetchStart, isFinish, isEmpty, loading } = usePagination({
    url: 'account/getOrderPageList',
    params
  })

  useEffect(() => {
    let status = ''
    if (tab === 2) status = '0'
    if (tab === 3) status = '2'
    if (tab === 4) status = '3'
    setParams({ status })
    fetchStart()
  }, [tab])

  useDidShow(() => {
    fetchStart()
  })

  // eslint-disable-next-line react/no-multi-comp
  const renderTab = () => {
    return (
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
    )
  }

  // eslint-disable-next-line react/no-multi-comp
  const renderList = () => {
    if (isEmpty) {
      return <View className='list-empty'>暂无订单</View>
    }
    return (
      <View className='page-container'>
        {items.map(item => (
          <OrderItem key={item.orderNo} data={item} />
        ))}
        {isFinish && (
          <View className='list-finished'>已显示所有订单</View>
        )}
      </View>
    )
  }

  if (loading) {
    return renderTab()
  }

  return (
    <View className='page--gray'>
      {renderTab()}
      {renderList()}
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '借阅订单'
}

export default Page
