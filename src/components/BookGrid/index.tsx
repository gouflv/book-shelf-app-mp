import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import { BoxOpenState, DeviceBook } from '../../typing'
import numeral from 'numeral'

const BookGrid: Taro.FC<{
  items: DeviceBook[]
  readonly?: boolean
  onBorrowClick: (item: DeviceBook) => void
  onOpenClick: (item: DeviceBook) => void
}> = props => {

  function onItemClick(item: DeviceBook) {
    Taro.navigateTo({
      url: `/pages/book/index?id=${item.bookId}&eqBoxId=${item.eqBoxId}&rfidCode=${item.rfidCode}`
    })
  }

  return (
    <View className='book-grid'>
      {props.items && props.items.map(data => (
        <View className='book-grid__item-wrapper' key={data.eqBoxId}>
          <View className='book-grid__item' onClick={() => onItemClick(data)}>
            <View className='thumb'>
              <Image
                className='image'
                src={data.booksImg}
                mode='aspectFill'
                lazyLoad
              />
            </View>
            <View className='content'>
              <View className='title'>{data.booksName}</View>
              <View className='action' onClick={e => e.stopPropagation()}>
                {data.boxNum}
                {data.openStatus === BoxOpenState.FALSE
                  ? (
                    <Button className='btn' size='mini' onClick={() => props.onBorrowClick(data)}>
                      {numeral(data.boxNum).format('00')}号 借阅
                    </Button>
                  )
                  : (
                    <Button className='btn' size='mini' onClick={() => props.onOpenClick(data)}>
                      {numeral(data.boxNum).format('00')}号 开柜
                    </Button>
                  )
                }
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default BookGrid
