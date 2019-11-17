import './index.scss'
import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import BookGrid from '../../components/BookGrid'

const Index: Taro.FC = () => {
  return (
    <View className='page-index'>
      <View className='page-section'>
        <View className='shop-book-list'>
          <View className='type-filter'>
            <View className='type-filter__item type-filter__item--active'>全部</View>
            <View className='type-filter__item'>小班</View>
            <View className='type-filter__item'>中班</View>
            <View className='type-filter__item'>大班</View>
          </View>
          <BookGrid items={[]} onBorrowClick={() => {}} readonly />
        </View>
      </View>

      <View className='space space--text'>
        <View className='text'>你已看过的书</View>
      </View>
      <View className='page-section'>
        <BookGrid items={[]} onBorrowClick={() => {}} readonly />
      </View>

      <View className='footer'>
        <Button className='btn-primary'>导航</Button>
      </View>
    </View>
  )
}

export default Index
