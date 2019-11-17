import './index.scss'
import Taro, { useState } from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import BorrowBookConfirm from '../../components/BorrowBookConfirm'
import { BG_COLOR } from '../../config'
import BookGrid from '../../components/BookGrid'

const Index: Taro.FC = () => {
  const [borrowConfirmVisible, setBorrowConfirmVisible] = useState(false)

  return (
    <View className='index'>
      <View className='deposit-tip'>
        <View className='content'>
          <Image src={require('../../assets/home_icon_prompt@3x.png')} mode='aspectFit' className='icon' />
          借书请先缴纳押金
        </View>
        <Button size='mini' className='btn-primary'>缴纳押金</Button>
      </View>
      <View className='space' />

      <View className='page-section'>
        <View className='shop-book-list'>
          <View className='type-filter'>
            <View className='type-filter__item type-filter__item--active'>全部</View>
            <View className='type-filter__item'>小班</View>
            <View className='type-filter__item'>中班</View>
            <View className='type-filter__item'>大班</View>
          </View>
          <BookGrid items={[]} onBorrowClick={() => setBorrowConfirmVisible(true)} />
        </View>
      </View>

      <View className='space space--text'>
        <View className='text'>你已看过的书</View>
      </View>
      <View className='page-section'>
        <BookGrid items={[]} onBorrowClick={() => setBorrowConfirmVisible(true)} />
      </View>
      <View className='space' />

      <BorrowBookConfirm
        visible={borrowConfirmVisible}
        book={{}}
        onConfirm={() => { /*TODO*/ }}
        onCancel={() => setBorrowConfirmVisible(false)}
      />
    </View>
  )
}

Index.config = {
  backgroundColor: BG_COLOR
}

export default observer(Index)
