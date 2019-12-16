import '../index.scss'
import Taro, { useState, useEffect } from '@tarojs/taro'
import { Button, Image, Input, Picker, Text, View } from '@tarojs/components'
import ModalWithClose from '../../../components/Modal/ModalWithClose'
import useFetchOrders from '../useFetchOrders'
import classNames from 'classnames'
import { hideLoading, moneyFormat, POST, showLoading, showToast } from '../../../utils'
import { CardType, Order, OrderStatus } from '../../../typing'
import { MoneyFormatter } from '../../../config'
import dayjs from 'dayjs'
import numeral from 'numeral'
import { app } from '../../../store/app'

const Page: Taro.FC = () => {
  const { orderOptions, isOrderEmpty, getOrderByIndex } = useFetchOrders({
    day: 7,
    status: OrderStatus.Finish,
    emptyText: '暂无归还记录'
  })
  const [resultVisible, setResultVisible] = useState(false)
  const [ currentOrder, setCurrentOrder ] = useState<Order>()
  const [ inputDays, setInputDays ] = useState()

  const [amount, setAmount] = useState('')
  useEffect(() => {
    if (currentOrder) {
      const num = numeral(currentOrder.overdueDays).multiply(app.getOverduePrice())
      setAmount(num.value() < 0 ? '0' : num.format(MoneyFormatter))
    }
  }, [currentOrder])

  async function submit() {
    if (!currentOrder) {
      showToast({ title: '请选择借阅书本' })
      return
    }
    if (!inputDays) {
      showToast({ title: '请填写实际借阅天数' })
      return
    }
    showLoading()
    await POST('account/configProblemAdd', {
      data: {
        orderNo: currentOrder.orderNo,
        faultType: 2,
        faultDescription: inputDays,
        faultNote: inputDays
      }
    })
    hideLoading()
    setResultVisible(true)
  }

  return (
    <View className='page--gray'>
      <View className='banner'>
        <Image src={require('../../../assets/details_icon_billing@2x.png')} mode='aspectFit' className='icon' />
        <View className='title'>计费有误</View>
        <View className='desc orange'>（还书后7天内有效）</View>
      </View>

      <View className='page-section'>
        <View className='card-group-title'>计费有误的书</View>
        <View className='card'>
          <View className='cell-group cell-group--small'>
            <Picker
              mode='selector'
              range={orderOptions}
              value={isOrderEmpty ? 0 : -1}
              onChange={({ detail }) => {
                setCurrentOrder(getOrderByIndex(detail.value))
              }}
            >
              <View className='cell'>
                <View className={classNames(['cell__bd', { 'gray': isOrderEmpty || !currentOrder }])}>
                  {isOrderEmpty
                    ? '暂无归还记录'
                    : currentOrder ? currentOrder.booksName : '请选择计费有误的书'
                  }
                </View>
                <View className='cell__ft'>
                </View>
                <View className='cell__link'>
                  <Image src={require('../../../assets/list_btn_more@2x.png')} mode='aspectFit' />
                </View>
              </View>
            </Picker>

          </View>
        </View>

        {currentOrder && (
          <View className='card'>
            <View className='cell-group cell-group--small'>
              <View className='cell cell--noborder'>
                <View className='cell__bd'>借阅时间:</View>
                <View className='cell__ft'>
                  {dayjs(currentOrder.createTime).format('YYYY-MM-DD')}
                  至
                  {dayjs(currentOrder.expireTime).format('YYYY-MM-DD')}
                </View>
              </View>
              <View className='cell cell--noborder'>
                <View className='cell__bd'>归还时间:</View>
                <View className='cell__ft'>
                  {dayjs(currentOrder.returnTime).format('YYYY-MM-DD')}
                </View>
              </View>
              <View className='cell cell--noborder'>
                <View className='cell__bd'>借阅方式:</View>
                <View className='cell__ft'>
                  {currentOrder.lendingcardType === CardType.TIMES ? '次卡' : '借阅卡'}
                </View>
              </View>
              <View className='cell'>
                <View className='cell__bd'>借阅天数:</View>
                <View className='cell__ft'>
                  {currentOrder.borrowingDays}天
                </View>
              </View>
              <View className='cell summary'>
                <View className='cell__bd bold'>费用:</View>
                <View className='cell__ft'>
                  <Text className='money red bold'>
                    <Text className='money-unit'>¥</Text>
                    {moneyFormat(amount)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View className='card'>
          <View className='cell-group cell-group--small'>
            <View className='cell'>
              <View className='cell__bd'>实际借阅的天数</View>
              <View className='cell__ft'>
                <Input
                  type='number'
                  placeholder='输入实际借阅天数'
                  onInput={({ detail }) => {
                    setInputDays(detail.value)
                  }}
                />
              </View>
              <View className='cell__link'>
                天
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='footer'>
        <Button className='btn btn-primary' onClick={submit}>确认提交</Button>
      </View>

      <ModalWithClose isOpened={resultVisible} onCancel={() => setResultVisible(false)}>
        <View className='message-title'>已收到你的反馈</View>
        <View className='message-desc'>
          你提交的反馈我们已经收到，我们工作人员会对你的借阅订单进行确认，如有疑问请联系客服
        </View>
        <View className='message-foot'>
          <Button className='btn btn-primary btn-block' onClick={() => Taro.navigateBack()}>确认</Button>
        </View>
      </ModalWithClose>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '计费有误'
}

export default Page
