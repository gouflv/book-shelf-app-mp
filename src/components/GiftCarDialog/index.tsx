import './index.scss'
import Taro, { useContext, useState, useEffect } from '@tarojs/taro'
import { Image, ScrollView, View, Text } from '@tarojs/components'
import AppStore from '../../store/app'
import { AtModal } from 'taro-ui'
import { defaultErrorHandler, POST, showToast } from '../../utils'
import { ChnNumChar } from '../../config'
import dayjs from 'dayjs'

const GiftCarDialog: Taro.FC = () => {
  const { user } = useContext(AppStore)

  const [visible, setVisible] = useState(true)
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
    fetch()
  }, [])

  function onCloseClick() {
    // Taro.showTabBar({ animation: true })
    // TODO
    setVisible(false)
  }

  async function confirm() {
    try {
      await POST('base/drawNewLendingCard')
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
