import Taro, { useEffect, useState, useRouter } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import { hideLoading, POST, showLoading } from '../../utils'

const Page: Taro.FC = () => {
  const router = useRouter()
  const [data, setData] = useState()

  useEffect(() => {
    async function fetch() {
      showLoading()
      const res = await POST('account/configProblemDetail', {
        data: { cfgQuesId: router.params.id }
      })
      setData(res)
      hideLoading()
    }
    fetch()
  }, [])

  return (
    <View className='page'>
      <View className='page-section'>
        <RichText nodes={data.content} />
      </View>
    </View>
  )
}

export default Page
