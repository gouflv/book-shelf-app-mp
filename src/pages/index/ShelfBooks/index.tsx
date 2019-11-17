import './index.scss'
import Taro, { Component, Config, ComponentOptions } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { BG_COLOR } from '../../../config'
import BookGrid from '../../../components/BookGrid'

export default class ShelfBooks extends Component {
  config: Config = {
    backgroundColor: BG_COLOR
  }
  static options: ComponentOptions = {
    addGlobalClass: true
  }

  render() {
    return (
      <View className='shop-book-list'>
        <View className='type-filter'>
          <View className='type-filter__item type-filter__item--active'>全部</View>
          <View className='type-filter__item'>小班</View>
          <View className='type-filter__item'>中班</View>
          <View className='type-filter__item'>大班</View>
        </View>
        <BookGrid>
        </BookGrid>
      </View>
    )
  }
}
