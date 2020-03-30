import Taro, { useContext, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import AppStore from '../../store/app'
import { hideLoading, showLoading } from '../../utils'
import { ForceBindPhoneAfterRegister } from '../../config'

const Page: Taro.FC = () => {

  const { token, fetchUserInfo, fetchDict, isUserBoundPhone } = useContext(AppStore)

  useEffect(() => {
    async function redirect() {
      if (token) {
        showLoading()
        await fetchUserInfo()
        await fetchDict()
        hideLoading()

        if (ForceBindPhoneAfterRegister && !isUserBoundPhone) {
          Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
          return
        }

        Taro.switchTab({ url: '/pages/home/introGuard' })
        // Taro.switchTab({ url: '/pages/wallet/index' })
        // Taro.switchTab({ url: '/pages/user/index' })
        // Taro.redirectTo({ url: '/pages/deposit/index' })
        // Taro.redirectTo({ url: '/pages/order/index' })
        // Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
        // Taro.redirectTo({ url: '/pages/profile/index' })
        // Taro.redirectTo({ url: '/pages/book/index?id=10043' })
        // Taro.redirectTo({ url: '/pages/feedback/shelf/index', })
      } else {
        Taro.redirectTo({ url: '/pages/login/index' })
      }
    }
    redirect()
  }, [])

  return <View />
}
export default Page
