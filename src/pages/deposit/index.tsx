import './index.scss'
import Taro, { useContext, useDidShow, useState } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { AtModal, AtModalAction, AtModalContent } from 'taro-ui'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import { usePagination } from '../../store/usePagaination'
import { defaultErrorHandler, moneyFormat, POST } from '../../utils'
import DialogService from '../../store/dialogService'
import BasicPageView from '../../components/BasicPageView'

const DepositType = {
  0: '归还',
  1: '充值',
  2: '续租抵扣',
}

const Page: Taro.FC = () => {
  const { wallet, depositAmount } = useContext(AppStore)
  const { showConfirm } = useContext(DialogService)

  //#region list
  const { items, fetchStart, isEmpty, isFinish } = usePagination({
    url: 'wallet/depositRecordList'
  })
  useDidShow(() => {
    fetchStart()
  })
  //#endregion

  //#region getBack
  const [babyCryConfirmVisible, setBabyCryConfirmVisible] = useState(false)

  async function onGetBackClick() {
    try {
      await POST('wallet/wxRefundPreposition')
      setBabyCryConfirmVisible(true)
    } catch (e) {
      if (e.code === 2) {
        await showConfirm({
          title: '还有逾期费用未结算，是否使用押金抵扣？',
          content: '系统优先使用余额抵扣费用'
        })
        onGetBackConfirm()
      } else {
        await showConfirm({
          title: '你还有未归还的书哦',
          content: '归还后可退还押金',
          confirmText: '查看详情'
        })
        Taro.navigateTo({ url: '/pages/order/index' })
      }
    }
  }
  async function onGetBackConfirm() {
    try {
      await POST('wallet/wxRefund')
      Taro.navigateTo({ url: '/pages/result/index?type=getBackDeposit' })
    } catch (e) {
      defaultErrorHandler(e)
    }
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
            {items.map((item, index) => (
              <View key={index} className='cell'>
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
    <BasicPageView className='page--gray'>
      <View className='page-banner'>
        <Image src={require('../../assets/deposit_bg@2x.png')} mode='aspectFill' className='bg' />
        <View className='content'>
          <View className='top'>押金</View>
          <View className='money red'>
            <Text className='money-unit'>¥</Text>
            {wallet && moneyFormat(wallet.depositTotal)}
          </View>

          {wallet && wallet.depositTotal < depositAmount && (
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

      {wallet && wallet.depositTotal > 0 && (
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
        isOpened={babyCryConfirmVisible}
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
            onClick={() => {onGetBackConfirm()}}
          >想好了，退押金</Button>
          <Button className='orange' onClick={() => setBabyCryConfirmVisible(false)}>不退了，留下</Button>
        </AtModalAction>
      </AtModal>
    </BasicPageView>
  )
}

Page.config = {
  navigationBarTitleText: '我的押金'
}

export default observer(Page)
