import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import ModalWithClose from '../Modal/ModalWithClose'
import { CabinetBook } from '../../typing'
import numeral from 'numeral'

const BorrowBookConfirm: Taro.FC<{
  visible: boolean
  book: CabinetBook
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
        </View>
        <Button className='btn' onClick={() => props.onConfirm()}>我在书柜旁, 开柜</Button>
      </View>
    </ModalWithClose>
  )
}

export default BorrowBookConfirm
