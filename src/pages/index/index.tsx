import Taro, { useContext, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import AppStore from '../../store/app'
import { hideLoading, showLoading } from '../../utils'
import { ForceBindPhoneAfterRegister } from '../../config'
import { observer } from '@tarojs/mobx'

const Page: Taro.FC = () => {

  const { token, fetchUserInfo, fetchDict, user, isUserBoundPhone } = useContext(AppStore)

  useEffect(() => {
    async function login() {
      if (token) {
        showLoading()
        await fetchUserInfo()
        await fetchDict()
        hideLoading()
      } else {
        Taro.redirectTo({ url: '/pages/login/index' })
      }
    }
    login()
  }, [])

  // loginGuard
  useEffect(() => {
    if (!user) return

    if (ForceBindPhoneAfterRegister && !isUserBoundPhone) {
      Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
      return
    }

    Taro.switchTab({ url: '/pages/home/introGuard' })
    // Taro.redirectTo({ url: '/pages/share-land/index' })
    // Taro.switchTab({ url: '/pages/wallet/index' })
    // Taro.switchTab({ url: '/pages/user/index' })
    // Taro.redirectTo({ url: '/pages/deposit/index' })
    // Taro.redirectTo({ url: '/pages/order/index' })
    // Taro.redirectTo({ url: '/pages/user-bind-phone/index' })
    // Taro.redirectTo({ url: '/pages/profile/index' })
    // Taro.redirectTo({ url: '/pages/book/index?id=10043' })
    // Taro.redirectTo({ url: '/pages/feedback/shelf/index', })
  }, [user, isUserBoundPhone])

  return <View />
}
export default observer(Page)
