import Taro, { useContext } from '@tarojs/taro'
import AppStore from '../store/app'
import { defaultErrorHandler, hideLoading, POST, showLoading, showToast } from './index'

const useBindPhone = (props: { success?: () => void  } = {}) => {
  const { token, fetchUserInfo } = useContext(AppStore)

  async function onGetPhoneNumber({ encryptedData, iv }) {
    console.debug(encryptedData, iv)

    if (!encryptedData) {
      Taro.navigateTo({ url: '/pages/user-bind-phone/index' })
      return
    }

    showLoading()
    try {
      const { code, errMsg } = await Taro.login()
      if (!code) {
        showToast({ title: errMsg })
        return
      }
      await POST('base/phoneBindingWx', {
        data: {
          code,
          clientToken: token,
          encryptedData,
          iv
        }
      })
      await fetchUserInfo()

      showToast({ title: '手机号绑定成功' })
      setTimeout(() => {
        if (props.success) {
          props.success()
        }
      }, 2000)
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  return { onGetPhoneNumber }
}

export default useBindPhone
