import './index.scss'
import Taro, { useEffect } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import ModalWithClose from '../Modal/ModalWithClose'
import { BoxOpenState, DeviceBook } from '../../typing'
import numeral from 'numeral'

const BorrowBookConfirm: Taro.FC<{
  visible: boolean
  book: DeviceBook
  onConfirm: () => void
  onCancel: () => void
}> = props => {

  useEffect(() => {
    console.log('BorrowBookConfirm book update', props.book)
  }, [props.book])

  if (!props.book) {
    return <View />
  }
  return (
    <ModalWithClose isOpened={props.visible} onCancel={() => props.onCancel()}>
      <View className='borrow-book-confirm'>
        <View className='book-item'>
          <View className='thumb'>
            <Image
              className='image'
              src={props.book.booksImg}
              mode='aspectFit'
              lazyLoad
            />
          </View>
          <View className='content'>
            <View className='title'>{props.book.booksName}</View>
          </View>
        </View>
        <View className='desc'>
          {numeral(props.book.boxNum).format('00')}号柜
          {props.book.openStatus !== BoxOpenState.FALSE ? '柜门已开' : ''}
        </View>
        <Button className='btn' onClick={() => props.onConfirm()}>
          {props.book.openStatus === BoxOpenState.FALSE ? '我在书柜旁, 开柜' : '再次开柜'}
        </Button>
      </View>
    </ModalWithClose>
  )
}

BorrowBookConfirm.options = {
  addGlobalClass: true
}

export default BorrowBookConfirm
