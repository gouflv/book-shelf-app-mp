import './index.less'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import BookGrid from '../../../components/BookGrid/BookGrid'

export default class UserBooks extends Component {
  render() {
    return (
      <View className='shop-book-list'>
        <BookGrid>
        </BookGrid>
      </View>
    )
  }
}
