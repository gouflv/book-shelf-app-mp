import './index.scss'
import Taro, { useContext, useDidShow, useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { AtModal, AtModalAction, AtModalContent } from 'taro-ui'
import AppStore, { app } from '../../store/app'
import { observer } from '@tarojs/mobx'
import { usePagination } from '../../store/usePagaination'
import { moneyFormat } from '../../utils'
import useBindPhone from '../../utils/bind-phone-hook'

const DepositType = {
  0: '归还',
  1: '充值',
  2: '续租抵扣',
}

const Page: Taro.FC = () => {
  const { wallet, isUserBoundPhone } = useContext(AppStore)
  const { onGetPhoneNumber } = useBindPhone({
    success() {
      Taro.navigateTo({ url: '/pages/buy-deposit/index' })
    }
  })

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
    // TODO 退款接口
    setConfirmVisible(true)
    Taro.navigateTo({ url: '/pages/result/index?type=getBackDeposit' })
  }
  //#endregion

  // eslint-disable-next-line react/no-multi-comp
  const renderList = () => {
    if (isEmpty) {
      return <View className='list-empty'>暂无押金记录</View>
    }
    return (
      <View>
        <View className='card'>
          <View className='cell-group'>
            {items.map(item => (
              <View className='cell'>
                <View className='cell__bd'>
                  <View className='label'>{DepositType[item.depositType] || item.depositType}</View>
                  <Text className='desc gray'>{item.createTime}</Text>
                </View>
                <View className='cell__ft'>
                  {item.depositType === '1'
                    ? (
                      <View className='money red'>
                        +<Text className='money-unit money-unit--large'>¥</Text>
                        {moneyFormat(item.depositPrice)}
                      </View>
                    )
                    : (
                      <View className='money green'>
                        -<Text className='money-unit money-unit--large'>¥</Text>
                        {moneyFormat(item.depositPrice)}
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
        <Image src={require('../../assets/deposit_bg@2x.png')} mode='aspectFill' className='bg' />
        <View className='content'>
          <View className='top'>押金</View>
          <View className='money red'>
            <Text className='money-unit'>¥</Text>
            {wallet && moneyFormat(wallet.depositTotal)}
          </View>

          {!isUserBoundPhone && (
            <Button
              key='getPhoneNumber'
              openType='getPhoneNumber'
              className='btn btn--round'
              size='mini'
              onGetPhoneNumber={e => onGetPhoneNumber(e.detail)}
            >补缴押金</Button>
          )}
          {wallet && (wallet.depositTotal < app.getDepositAmount()) && (
            <Button
              key='navigateTo'
              className='btn btn--round'
              size='mini'
              onClick={() => Taro.navigateTo({ url: '/pages/buy-deposit/index' })}
            >补缴押金</Button>
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
          <Button
            className='gray'
            onClick={() => {
              onGetBackConfirm()
              setConfirmVisible(false)
            }}
          >想好了，退押金</Button>
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
