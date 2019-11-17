import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import ModalWithClose from '../Modal/ModalWithClose'

const BorrowBookConfirm: Taro.FC<{
  visible: boolean
  book: any
  onConfirm: () => void
  onCancel: () => void
}> = props => {
  return (
    <ModalWithClose isOpened={props.visible} onCancel={() => props.onCancel()}>
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
        <Button className='btn' onClick={() => props.onConfirm()}>我在书柜旁, 开柜</Button>
      </View>
    </ModalWithClose>
  )
}

export default BorrowBookConfirm
