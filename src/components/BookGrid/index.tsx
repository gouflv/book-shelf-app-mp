import './index.scss'
import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'

const BookGrid: Taro.FC<{
  items: any[]
  onBorrowClick: (item) => void
}> = props => {
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
                <Button size='mini' onClick={() => props.onBorrowClick(i)}>
                  00 借阅
                </Button>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default BookGrid
