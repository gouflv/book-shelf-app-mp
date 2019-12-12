import Taro, { useContext, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import AppStore from '../../store/app'
import { hideLoading, showLoading } from '../../utils'

const Page: Taro.FC = () => {

  const { token, fetchUserInfo } = useContext(AppStore)

  useEffect(() => {
    async function redirect() {
      if (token) {
        showLoading()
        await fetchUserInfo()
        hideLoading()

        // Taro.switchTab({ url: '/pages/home/introGuard' })
        // Taro.switchTab({ url: '/pages/wallet/index' })
        Taro.switchTab({ url: '/pages/user/index' })
        // Taro.redirectTo({ url: '/pages/login/index' })
        // Taro.redirectTo({ url: '/pages/order/index' })
        // Taro.redirectTo({ url: '/pages/help/index' })
      } else {
        Taro.redirectTo({ url: '/pages/login/index' })
      }
    }
    redirect()
  }, [])

  return <View />
}
export default Page
