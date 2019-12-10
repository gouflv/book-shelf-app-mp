import './index.scss'
import Taro, { useContext, useDidShow, useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { AtModal, AtModalAction, AtModalContent } from 'taro-ui'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import { usePagination } from '../../store/usePagaination'

const Page: Taro.FC = () => {
  const { wallet, isUserBoundPhone } = useContext(AppStore)

  //#region list
  const { items, fetchStart, isEmpty, isFinish, loading } = usePagination({
    url: 'wallet/depositRecordList'
  })
  useDidShow(() => {
    fetchStart()
  })
  //#endregion

  //#region getBack
  const [confirmVisible, setConfirmVisible] = useState(false)
  function onGetBackClick() {
    setConfirmVisible(true)
  }
  function onGetBackConfirm() {
    // TODO
    setConfirmVisible(true)
    Taro.navigateTo({ url: '/pages/result/index?type=getBackDeposit' })
  }
  //#endregion

  function onDepositPaymentClick() {
    if (!isUserBoundPhone) {
      Taro.navigateTo({ url: '/pages/user-bind-phone/index' })
      return
    }
    Taro.navigateTo({ url: '/pages/buy-deposit/index' })
  }

  // eslint-disable-next-line react/no-multi-comp
  const renderList = () => {
    if (isEmpty) {
      return <View className='list-empty'>暂无押金记录</View>
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
                <View className='money green'>
                  -<Text className='money-unit money-unit--large'>¥</Text>
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
        <Image src={require('../../assets/deposit_bg@2x.png')} mode='aspectFill' className='bg' />
        <View className='content'>
          <View className='top'>押金</View>
          <View className='money red'>
            <Text className='money-unit'>¥</Text>
            {(wallet && wallet.depositTotal) ? wallet.depositTotal : '0'}
          </View>
          {(wallet && wallet.depositTotal && parseFloat(wallet.depositTotal) < 99) && (
            <Button className='btn btn--round' size='mini' onClick={onDepositPaymentClick}>补缴押金</Button>
          )}
        </View>
      </View>

      <View className='page-section'>
        <View className='section-header'>
          押金记录
        </View>
        {renderList()}
      </View>

      {!loading && !isEmpty && (
        <View className='page-section' style={{ paddingTop: 0 }}>
          <View className='card'>
            <View className='cell-group'>
              <View className='cell' onClick={onGetBackClick}>
                <View className='cell__bd orange'>
                  退回押金
                </View>
                <View className='cell-ft' />
                <View className='cell__link'>
                  <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
                </View>
              </View>
            </View>
          </View>
        </View>
      )}

      <AtModal
        isOpened={confirmVisible}
        className='get-back-confirm'
      >
        <AtModalContent>
          <View className='title'>是否确认退还押金？</View>
          <Image src={require('../../assets/deposit_icon_sad@2x.png')} mode='aspectFit' className='img' />
          <View className='content red'>再给宝宝多看两本书吧</View>
        </AtModalContent>
        <AtModalAction>
          <Button className='gray' onClick={onGetBackConfirm}>想好了，退押金</Button>
          <Button className='orange' onClick={() => setConfirmVisible(false)}>不退了，留下</Button>
        </AtModalAction>
      </AtModal>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的押金'
}

export default observer(Page)
