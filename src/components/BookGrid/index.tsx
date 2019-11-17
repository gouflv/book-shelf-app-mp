import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'

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
      {Array.from(Array(8)).map((_, i) => (
        <View className='book-grid__item-wrapper' key={i}>
          <View className='book-grid__item' onClick={() => onItemClick(i)}>
            <View className='thumb'>
              <Image
                className='image'
                src='//placehold.it/200'
                mode='aspectFill'
                lazyLoad
              />
            </View>
            <View className='content'>
              <View className='title'>书名{i}</View>
              {!props.readonly && (
                <View className='action'>
                  <Button size='mini' onClick={() => props.onBorrowClick(i)}>
                    0{i} 借阅
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
