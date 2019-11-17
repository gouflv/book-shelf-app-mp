import './index.scss'
import Taro, { Component } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import ModalWithClose from '../Modal/ModalWithClose'

export default class BorrowBookConfirm extends Component {
  render() {
    return (
      <ModalWithClose isOpened>
        <View className='borrow-book-confirm'>
          <View className='book-item'>
            <View className='thumb'>
              <Image
                className='image'
                src='//placehold.it/200'
                mode='aspectFit'
                lazyLoad
              />
            </View>
            <View className='content'>
              <View className='title'>书名</View>
            </View>
          </View>
          <View className='desc'>00号柜</View>
          <Button className='btn'>我在书柜旁, 开柜</Button>
        </View>
      </ModalWithClose>
    )
  }
}
