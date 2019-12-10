import Taro, { useEffect, useState, useRouter } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import { hideLoading, POST, showLoading } from '../../utils'

const Page: Taro.FC = () => {
  const router = useRouter()
  const [data, setData] = useState()

  useEffect(() => {
    async function fetch() {
      showLoading()
      const data = await POST('account/configProblemDetail', {
        data: { cfgQuesId: router.params.id }
      })
      setData(data)
      hideLoading()
    }
    fetch()
  }, [router.params.id])

  return (
    <View className='page'>
      <View className='page-section'>
        <RichText nodes={data.content} />
      </View>
    </View>
  )
}

export default Page
