import './index.scss'
import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'

const Comments: Taro.FC = () => {
  return (
    <View className='comments'>
      {Array.from(Array(2)).map((_, i) => (
        <View className='comment' key={i}>
          <View className='thumb'>
            <Image src='//placehold.it/100' mode='aspectFit' className='avatar' />
          </View>
          <View className='content'>
            <View className='user'>
              用户{i}
              <View className='date'>2019-11-11</View>

              <View className='rate'>
                <Image src={require('../../../assets/evaluate_icon_star@3x.png')} mode='aspectFit' />
                <Image src={require('../../../assets/evaluate_icon_star@3x.png')} mode='aspectFit' />
                <Image src={require('../../../assets/evaluate_icon_star@3x.png')} mode='aspectFit' />
              </View>
            </View>
            <View className='text'>
              使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动/QQ小程序、快应用、H5、React-Native 等）运行的代码。
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Comments
