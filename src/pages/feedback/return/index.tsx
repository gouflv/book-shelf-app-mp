import '../index.scss'
import Taro, { useState, useEffect } from '@tarojs/taro'
import { Button, Image, Picker, View } from '@tarojs/components'
import useFetchOrders from '../useFetchOrders'
import { hideLoading, POST, showLoading, showToast } from '../../../utils'
import ModalWithClose from '../../../components/Modal/ModalWithClose'
import { Order, OrderStatus } from '../../../typing'
import classNames from 'classnames'
import dayjs from 'dayjs'

const Page: Taro.FC = () => {
  const { orderOptions, isOrderEmpty, getOrderByIndex } = useFetchOrders({
    status: OrderStatus.Borrow,
    emptyText: '暂无借书记录'
  })
  const [ currentOrder, setCurrentOrder ] = useState<Order>()
  const [ currentDate, setCurrentDate ] = useState<string>('')
  const [resultVisible, setResultVisible] = useState(false)

  useEffect(() => {
    if (currentOrder) {
      setCurrentDate('')
    }
  }, [currentOrder])

  async function submit() {
    if (!currentOrder) {
      showToast({ title: '请选择借阅书本' })
      return
    }
    if (!currentDate) {
      showToast({ title: '请选择借阅时间' })
      return
    }
    showLoading()
    await POST('account/configProblemAdd', {
      data: {
        orderNo: currentOrder.orderNo,
        faultType: 1,
        faultDescription: currentDate,
        faultNote: currentDate
      }
    })
    hideLoading()
    setResultVisible(true)
  }

  return (
    <View className='page--gray'>
      <View className='banner'>
        <Image src={require('../../../assets/details_icon_failed@2x.png')} mode='aspectFit' className='icon' />
        <View className='title'>还书失败</View>
      </View>

      <View className='page-section'>
        <View className='card'>
          <View className='cell-group'>
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
                    ? '暂无还书记录'
                    : currentOrder ? currentOrder.booksName : '请选择还书记录'
                  }
                </View>
                <View className='cell__ft'>
                </View>
                <View className='cell__link'>
                  <Image src={require('../../../assets/list_btn_more@2x.png')} mode='aspectFit' />
                </View>
              </View>
            </Picker>

            <Picker
              mode='date'
              value={currentDate}
              onChange={({ detail }) => {
                setCurrentDate(detail.value)
              }}
              start={currentOrder ? dayjs(currentOrder.createTime).format('YYYY-MM-DD') : '2019-01-01'}
              end={dayjs().format('YYYY-MM-DD')}
            >
              <View className='cell'>
                <View className='cell__bd'>
                  请选择还书时间
                </View>
                <View className='cell__ft'>
                  {currentDate}
                </View>
                <View className='cell__link'>
                  <Image src={require('../../../assets/list_btn_more@2x.png')} mode='aspectFit' />
                </View>
              </View>
            </Picker>
          </View>
        </View>
      </View>

      <View className='footer'>
        <Button className='btn btn-primary' onClick={submit}>确认提交</Button>
      </View>

      <ModalWithClose isOpened={resultVisible} onCancel={() => setResultVisible(false)}>
        <View className='message-title'>已收到你的反馈</View>
        <View className='message-desc'>
          你提交的还书失败订单已暂停计费，我们工作人员会对你的订单进行确认，如有疑问请联系客服
        </View>
        <View className='message-foot'>
          <Button className='btn btn-primary btn-block' onClick={() => Taro.navigateBack()}>确认</Button>
        </View>
      </ModalWithClose>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '还书失败'
}

export default Page
