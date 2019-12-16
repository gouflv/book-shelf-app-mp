import Taro from '@tarojs/taro'
import { PaymentRequestParams } from '../typing'
import { defaultErrorHandler, POST } from './ajax'
import { hideLoading, showLoading } from './index'

const usePayment = () => {
  async function submitPayment({ url, data }) {
    showLoading()
    try {
      const params: PaymentRequestParams = await POST(url, { data })
      if (!params) {
        return
      }
      await Taro.requestPayment(params)
    } catch (e) {
      defaultErrorHandler(e)
      throw e
    } finally {
      hideLoading()
    }
  }

  return { submitPayment }
}

export default usePayment
