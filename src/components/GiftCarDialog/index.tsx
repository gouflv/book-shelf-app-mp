import './index.scss'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import AppStore from '../../store/app'
import { AtModal } from 'taro-ui'
import { POST, showToast } from '../../utils'
import { ChnNumChar } from '../../config'
import dayjs from 'dayjs'
import { UserIsNew } from '../../typing'

const GiftCarDialog: Taro.FC = () => {
  const { user, fetchUserInfo } = useContext(AppStore)
  const [nextShowDate] = useState(Taro.getStorageSync('gift_card_next_show_date'))

  const [visible, setVisible] = useState(false)
  const [cards, setCards] = useState<any[]>([])

  useEffect(() => {
    // Taro.hideTabBar({ animation: false })

    async function fetch() {
      const res = await POST('base/getNewLendingCard')
      setCards(res)
      if (res && res.length) {
        setVisible(true)
      }
    }

    const isNewUser = user && user.newFlag === UserIsNew.TRUE
    const showToday = !nextShowDate || !dayjs(nextShowDate).isAfter(dayjs(), 'day')
    if (isNewUser && showToday) {
      fetch()
    }
  }, [nextShowDate, user])

  function onCloseClick() {
    // Taro.showTabBar({ animation: true })
    Taro.setStorageSync('gift_card_next_show_date', dayjs().add(1, 'day').format('YYYY-MM-DD'))
    setVisible(false)
  }

  async function confirm() {
    try {
      await POST('base/drawNewLendingCard')
      await fetchUserInfo()
    } catch (e) {
      // defaultErrorHandler(e)
    } finally {
      showToast({ title: '领取成功' })
      setVisible(false)
    }
  }

  return (
    <AtModal
      className='gift-card-dialog'
      isOpened={visible}
      closeOnClickOverlay={false}
    >
      <Image src={require('../../assets/home-gift-card-bg.png')} mode='aspectFit' className='bg' />
      <View className='dialog-container'>
        <View className='close' onClick={onCloseClick} />
        <View className='card-list'>
          <ScrollView scrollY className='scroller'>

            {cards.map(card => (
              <View key={card.cfgLcId} className='cell card'>
                <Image src={require('../../assets/home-gift-card.png')} mode='aspectFit' className='card-bg' />
                <View className='cell__hd'>
                  <Text className='num'>{card.effectiveNum}</Text>次
                </View>
                <View className='cell__bd'>
                  <View className='title'>免费借书{ChnNumChar[card.effectiveNum] || card.effectiveNum}次</View>
                  <View className='desc'>
                    有效期：
                    {dayjs(card.effectiveStarttimes).format('YYYY-MM-DD')}
                    至
                    {dayjs(card.effectiveEndtimes).format('YYYY-MM-DD')}
                  </View>
                </View>
              </View>
            ))}

          </ScrollView>
        </View>
        <Image src={require('../../assets/home-gift-card-ft.png')} mode='aspectFit' className='ft' />
        <View className='ft-btn' onClick={confirm} />
      </View>
    </AtModal>
  )
}

GiftCarDialog.options = {
  addGlobalClass: true
}
export default GiftCarDialog
