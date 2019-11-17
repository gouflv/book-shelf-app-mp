import './BookGrid.less'
import Taro, { Component } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'

export default class BookGrid extends Component {
  static options = {
    addGlobalClass: true
  }
  render() {
    return (
      <View className='book-grid'>
        {Array.from(Array(8)).map(i => (
          <View className='book-grid__item-wrapper' key={i}>
            <View className='book-grid__item'>
              <View className='thumb'>
                <Image
                  className='image'
                  src='//placehold.it/200'
                  mode='aspectFill'
                  lazyLoad
                />
              </View>
              <View className='content'>
                <View className='title'>书名</View>
                <View className='action'>
                  <Button size='mini'>00 借阅</Button>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
