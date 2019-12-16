import Taro, { useContext } from '@tarojs/taro'
import AppStore from '../store/app'
import { PaymentRequestParams } from '../typing'
import { defaultErrorHandler, POST } from './ajax'
import { hideLoading, showLoading } from './index'

const usePayment = () => {
  const { fetchUserInfo } = useContext(AppStore)

  async function submitPayment({ url, data }) {
    showLoading()
    try {
      const params: PaymentRequestParams = await POST(url, { data })
      if (!params) {
        return
      }
      await Taro.requestPayment(params)
      await fetchUserInfo()
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
