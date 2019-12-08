import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'

const Page: Taro.FC = () => {

  useEffect(() => {
    async function redirect() {
      if (this.token) {
        await this.fetchUserInfo()
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
