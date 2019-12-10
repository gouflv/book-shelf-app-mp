import './index.scss'
import Taro, { useDidShow, useState } from '@tarojs/taro'
import { Button, Image, RichText, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { hideLoading, POST, showLoading } from '../../utils'
import { UserTimesCard } from '../../typing'
import dayjs from 'dayjs'

const Page: Taro.FC = () => {
  const [tab, setTab] = useState<1 | 2>(1)
  const [itemsA, setItemsA] = useState<UserTimesCard[]>([])
  const [itemsB, setItemsB] = useState<UserTimesCard[]>([])
  const [loading, setLoading] = useState(true)

  useDidShow(() => {
    async function fetch() {
      showLoading()
      const resA = await POST('wallet/getOnceCard?type=1')
      setItemsA(resA)
      const resB = await POST('wallet/getOnceCard?type=2')
      setItemsB(resB)
      hideLoading()
      setLoading(false)
    }
    fetch()
  })

  function onBuyCardClick() {
    Taro.navigateTo({ url: '/pages/buy-card/index' })
  }

  if (loading) {
    return <View />
  }

  return (
    <View>
      <View className='top-tabbar'>
        <View
          className={classNames('item', { 'item--active': tab === 1 })}
          onClick={() => setTab(1)}
        >
          可使用（{itemsA.length}）
        </View>
        <View
          className={classNames('item', { 'item--active': tab === 2 })}
          onClick={() => setTab(2)}
        >
          不可使用（{itemsB.length}）
        </View>
      </View>

      {(tab === 1 && !itemsA.length) && (
        <View className='list-empty'>暂无可用的次卡</View>
      )}
      {(tab === 1 && itemsA.length) && (
        <View className='t-card-list'>
          {itemsA.map(item => (
            <View key={item.orderNo} className='t-card'>
              <Image src={require('../../assets/car_bg_use@2x.png')} mode='aspectFit' className='t-card__bg' />
              <View className='t-card__wrapper'>
                <View className='t-card__bd'>
                  <View className='label'>
                    借书<Text>{item.effectiveNum}</Text>次
                  </View>
                  <View className='desc gray'>
                    {(item.startDate && item.endDate)
                      ? `${dayjs(item.startDate).format('YYYY-MM-DD')
                          }至${dayjs(item.endDate).format('YYYY-MM-DD')}`
                      : '长期有效'
                    }
                  </View>
                </View>
                <View className='t-card__ft' onClick={() => Taro.navigateTo({ url: '/pages/index/introGuard' })}>
                  <Text className='orange'>去使用</Text>
                </View>
              </View>
            </View>
          ))}
          <View className='list-finished'>到底了，我是有底线的</View>
        </View>
      )}

      {(tab === 2 && !itemsB.length) && (
        <View className='list-empty'>暂无不可用的次卡</View>
      )}
      {(tab === 2 && itemsB.length) && (
        <View className='t-card-list'>
          {itemsB.map(item => (
            <View key={item.orderNo} className='t-card'>
              <Image src={require('../../assets/car_bg_expired@2x.png')} mode='aspectFit' className='t-card__bg' />
              <View className='t-card__wrapper'>
                <View className='t-card__bd'>
                  <View className='label gray'>
                    借书<Text>{item.effectiveNum}</Text>次
                  </View>
                  <View className='desc gray'>
                    {dayjs(item.startDate).format('YYYY-MM-DD')}至{
                    dayjs(item.endDate).format('YYYY-MM-DD')}
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View className='list-finished'>到底了，我是有底线的</View>
        </View>
      )}

      {tab === 1 && (
        <View>
          <View className='page-section buy-rules'>
            <View className='section-header'>
              购卡须知
            </View>
            <View className='buy-rules-content'>
              <RichText nodes='买借阅卡时优先使用用户余额抵扣' />
            </View>
          </View>
          <View className='footer'>
            <Button className='btn-primary' onClick={onBuyCardClick}>购买阅读卡</Button>
          </View>
        </View>
      )}
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的次卡'
}

export default Page
