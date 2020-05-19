import './index.scss'
import Taro, { useState, useEffect } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import { POST } from '../../utils'

const Page: Taro.FC = () => {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    async function fetch() {
      const data = await POST('account/configProblemList')
      setArticles(data)
    }
    // fetch()
  }, [])

  function phoneCall() {
    Taro.makePhoneCall({ phoneNumber: '4009926299' })
  }

  return (
    <View className='page page--gray'>
      <View className='card-group-title'>选择问题类型</View>
      <View className='card card--shadow menu'>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/feedback/return/index` })}>
          <View className='thumb'>
            <Image src={require('../../assets/details_icon_failed@2x.png')} mode='aspectFit' />
          </View>
          <View className='name'>还书失败</View>
        </View>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/feedback/payment/index` })}>
          <View className='thumb'>
            <Image src={require('../../assets/details_icon_billing@2x.png')} mode='aspectFit' />
          </View>
          <View className='name'>计费异常</View>
        </View>
        <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/feedback/shelf/index` })}>
          <View className='thumb'>
            <Image src={require('../../assets/details_icon_open@2x.png')} mode='aspectFit' />
          </View>
          <View className='name'>开柜异常</View>
        </View>
      </View>

      {articles.length &&
        <View>
          <View className='card-group-title'>常见问题</View>
          <View className='card'>
            <View className='cell-group'>
              {articles.map(item => (
                <View
                  key={item.cfgQuesId}
                  className='cell'
                  onClick={() => Taro.navigateTo({ url: `/pages/help/article?id=${item.cfgQuesId}` })}
                >
                  <View className='cell__bd'>{item.quesTitle}</View>
                  <View className='cell__link'>
                    <Image src={require('../../assets/list_btn_more@2x.png')} mode='aspectFit' />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      }

      <View className='footer'>
        <Button className='btn btn-primary btn-primary--plain' onClick={phoneCall}>客服电话</Button>
        <Button className='btn btn-primary btn-primary--plain' openType='contact'>在线客服</Button>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '客服帮助'
}

export default Page
