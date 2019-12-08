import Taro, { useContext, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import AppStore from '../../store/app'

const Page: Taro.FC = () => {

  const { token, fetchUserInfo } = useContext(AppStore)

  useEffect(() => {
    async function redirect() {
      if (token) {
        await fetchUserInfo()
        Taro.switchTab({ url: '/pages/index/introGuard' })
      } else {
        Taro.redirectTo({ url: '/pages/login/index' })
      }
    }
    redirect()
  }, [])

  return <View />
}
export default Page
