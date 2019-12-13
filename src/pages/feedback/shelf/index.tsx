import '../index.scss'
import Taro, { useState } from '@tarojs/taro'
import { Button, Image, Picker, Textarea, View } from '@tarojs/components'
import ModalWithClose from '../../../components/Modal/ModalWithClose'
import useFetchOrders from '../useFetchOrders'
import classNames from 'classnames'
import { hideLoading, POST, showLoading, showToast } from '../../../utils'
import { Order } from '../../../typing'

const Problems = [
  { key: 1, name: '提示已开柜，但柜门未开启' },
  { key: 2, name: '机柜损坏' },
]
function getProblemByIndex(index) {
  return Problems[index]
}

const Page: Taro.FC = () => {
  const { orderOptions, isOrderEmpty, getOrderByIndex } = useFetchOrders({
    day: 1,
    emptyText: '暂无借书记录'
  })
  const [resultVisible, setResultVisible] = useState(false)
  const [ currentOrder, setCurrentOrder] = useState<Order>()
  const [ problem, setProblem ] = useState<{ key, name }>()
  const [ other, setOther ] = useState()

  async function submit() {
    if (!currentOrder) {
      showToast({ title: '请填选择开柜异常的书本' })
      return
    }
    if (!problem) {
      showToast({ title: '请选择异常原因' })
      return
    }
    showLoading()
    await POST('account/configProblemAdd', {
      data: {
        orderNo: currentOrder.orderNo,
        faultType: '0',
        faultDescription: problem.name,
        faultNote: other
      }
    })
    hideLoading()
    setResultVisible(true)
  }

  return (
    <View className='page--gray'>
      <View className='banner'>
        <Image src={require('../../../assets/details_icon_open@2x.png')} mode='aspectFit' className='icon' />
        <View className='title'>开柜异常</View>
      </View>

      <View className='page-section'>
        <View className='card-group-title'>开柜异常的书</View>
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
                    ? '暂无借书记录'
                    : currentOrder
                      ? currentOrder.booksName
                      : '请选择开柜异常的书'
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

        <View className='card-group-title'>异常原因</View>
        <View className='card'>
          <View className='cell-group cell-group--small'>
            <Picker
              mode='selector'
              range={Problems.map(p => p.name)}
              value={0}
              onChange={({ detail }) => {
                setProblem(getProblemByIndex(detail.value))
              }}
            >
              <View className='cell'>
                <View className={classNames(['cell__bd', { 'gray': !problem }])}>
                  {problem ? problem.name : '请选择异常原因'}
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

        <View className='card-group-title'>其他原因说明（非必填）</View>
        <View className='card'>
          <View className='cell-group cell-group--small'>
            <View className='cell'>
              <Textarea
                value=''
                maxlength={100}
                placeholder='点击填写问题说明'
                onInput={({ detail}) => {
                  setOther(detail.value)
                }}
              />
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
          你提交的开柜异常反馈我们已经收到，工作人员会在第一时间确认问题
        </View>
        <View className='message-foot'>
          <Button className='btn btn-primary btn-block' onClick={() => Taro.navigateBack()}>确认</Button>
        </View>
      </ModalWithClose>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '开柜异常'
}

export default Page
