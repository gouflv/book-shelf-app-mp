import './index.scss'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, RichText, Text, View } from '@tarojs/components'
import SCheckbox from '../../components/SCheckbox'
import { hideLoading, moneyFormat, POST, showLoading } from '../../utils'
import numeral from 'numeral'
import classNames from 'classnames'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import usePayment from '../../utils/payment-hook'
import dayjs from 'dayjs'

const CARD_ID = 'cfgLcId'

const Page: Taro.FC = () => {
  const { wallet } = useContext(AppStore)
  const { submitPayment } = usePayment()

  const [currentChecked, setCurrentChecked] = useState<any>()
  const [rangeItems, setRangeItems] = useState<any[]>([])
  const [timesItems, setTimesItems] = useState<any[]>([])

  const [balanceCutAmount, setBalanceCutAmount] = useState('0')
  const [amount, setAmount] = useState('0')
  useEffect(() => {
    if (currentChecked && wallet) {
      const price = currentChecked.lendingcardPrice
      const balance = wallet.balance
      const pay = Math.max(0, price - balance)
      const balanceCut = Math.min(balance, price)

      setBalanceCutAmount(moneyFormat(balanceCut))
      setAmount(moneyFormat(pay))
    }
  },[currentChecked, wallet])

  async function fetch() {
    showLoading()
    const item2 = await POST('wallet/configLendingcardList', {
      data: { lendingcardType: 2 }
    })
    const item1 = await POST('wallet/configLendingcardList', {
      data: { lendingcardType: 1 }
    })
    setRangeItems(item2)
    setTimesItems(item1)
    hideLoading()
  }
  useEffect(() => {
    fetch()
  }, [])

  function onItemCheck(item) {
    setCurrentChecked({...item})
  }

  function isChecked(item) {
    if (!currentChecked) {
      return false
    }
    return currentChecked[CARD_ID] === item[CARD_ID]
  }

  async function onPaymentClick() {
    await submitPayment({
      amount: parseFloat(amount),
      url: 'wallet/payLendingCard',
      data: {
        [CARD_ID]: currentChecked[CARD_ID],
        lendingcardName: currentChecked.lendingcardName
      }
    })
    Taro.navigateTo({ url: `/pages/result/index?type=pay&price=${amount}` })
  }

  return (
    <View className='page-buy-card'>

      <View className='page-section'>
        <View className='section-header'>
          借阅卡
          <Text className='desc'>(不限次数, 每次借2本)</Text>
        </View>
        {rangeItems.map(item => (
          <View
            key={item.cfgLcId}
            className={classNames('card card--shadow', { 'card--checked': isChecked(item) })}
            onClick={() => onItemCheck(item)}
          >
            <View className='cell'>
              <View className='cell__hd'>
                <SCheckbox value={isChecked(item)} />
              </View>
              <View className='cell__bd'>
                {item.days
                  ? (
                    <View className='label bold'>
                      {item.days}
                      <Text className='label-unit'>天</Text>
                    </View>
                  )
                  : (
                    <View className='label bold'>
                      <Text className='label-unit'>
                        {dayjs(item.effectiveStarttimes).format('YYYY-MM-DD')}
                        至
                        {dayjs(item.effectiveEndtimes).format('YYYY-MM-DD')}
                      </Text>
                    </View>
                  )
                }
                <View className='desc gray'>{item.lendingcardName}</View>
              </View>
              <View className='cell__ft'>
                <View className='money red bold'>
                  <Text className='money-unit'>¥</Text>
                  {moneyFormat(item.lendingcardPrice)}
                </View>
                <View className='money-desc'>
                  每天
                  {item.days
                    ? (
                      <Text>
                        {numeral(item.lendingcardPrice).divide(item.days || 1).format('0[.]0')}
                      </Text>
                    )
                    : (
                      <Text>
                        {
                          numeral(item.lendingcardPrice).divide(
                            dayjs(item.effectiveEndtimes).diff(item.effectiveStarttimes, 'day')
                          ).format('0[.]0')
                        }
                      </Text>
                    )
                  }
                  元
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className='page-section' style={{ paddingTop: 0 }}>
        <View className='section-header'>
          次卡
          <Text className='desc'>(长期有效, 每次借2本)</Text>
        </View>
        {timesItems.map(item => (
          <View
            key={item.cfgLcId}
            className={classNames('card card--shadow', { 'card--checked': isChecked(item) })}
            onClick={() => onItemCheck(item)}
          >
            <View className='cell'>
              <View className='cell__hd'>
                <SCheckbox value={isChecked(item)} />
              </View>
              <View className='cell__bd'>
                <View className='label bold'>
                  {item.effectiveNum}
                  <Text className='label-unit'>次卡</Text>
                </View>
                <View className='desc gray'>{item.lendingcardName}</View>
              </View>
              <View className='cell__ft'>
                <View className='money red bold'>
                  <Text className='money-unit'>¥</Text>
                  {moneyFormat(item.lendingcardPrice)}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className='page-section buy-rules'>
        <View className='section-header'>
          购卡须知
        </View>
        <View className='buy-rules-content'>
          <RichText nodes='买借阅卡时优先使用用户余额抵扣' />
        </View>
        <View className='buy-rules-content'>
          确认购买即视为已同意<Text className='orange'>《借阅卡卡权益及服务规则》</Text>
        </View>
      </View>

      <View className='space' />

      {currentChecked && (
        <View className='payment-footer'>
          <View className='left'>
            <View>
              共计：
              <Text className='money red bold'>
                <Text className='money-unit money-unit--large'>¥</Text>
                {moneyFormat(currentChecked.lendingcardPrice)}
              </Text>
            </View>
            {parseFloat(balanceCutAmount) > 0 && (
              <View className='desc'>账户余额可抵扣: {balanceCutAmount}元</View>
            )}
          </View>
          <Button className='btn btn-primary' onClick={onPaymentClick}>购买</Button>
        </View>
      )}
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '借阅卡'
}

export default observer(Page)
