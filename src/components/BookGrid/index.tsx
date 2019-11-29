import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import numeral from 'numeral'

const BookGrid: Taro.FC<{
  items: any[]
  readonly?: boolean
  onBorrowClick: (item) => void
}> = props => {

  function onItemClick(item) {
    Taro.navigateTo({ url: `/pages/book/index?id=${item}` })
  }

  return (
    <View className='book-grid'>
      {props.items && props.items.map((data, index) => (
        <View className='book-grid__item-wrapper' key={index}>
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
              {!props.readonly && (
                <View className='action' onClick={e => e.stopPropagation()}>
                  <Button className='btn' size='mini' onClick={() => props.onBorrowClick(data)}>
                    {numeral(data.boxNum).format('00')}号 借阅
                  </Button>
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default BookGrid
