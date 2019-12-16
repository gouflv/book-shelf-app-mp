import './index.scss'
import Taro, { useContext, useEffect } from '@tarojs/taro'
import { Button, Image, ScrollView, View } from '@tarojs/components'
import BorrowBookConfirm from '../../components/BorrowBookConfirm'
import BookGrid from '../../components/BookGrid'
import { useCabinetBooks } from './store'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import useBookBorrow from '../../utils/borrow-hook'

const Index: Taro.FC = () => {
  const { scanCabinet, isUserHasDeposit } = useContext(AppStore)
  const { cabinetBookItems, fetchCabinetBook } = useCabinetBooks()
  const { borrowItem, borrowConfirmVisible, closeBorrowConfirm, isBorrowSend, onBorrowClick, onBorrowConfirm } = useBookBorrow()

  useEffect(() => {
    if (scanCabinet) {
      fetchCabinetBook({ eqCode: scanCabinet.eqCode })
    }
  }, [scanCabinet])

  return (
    <View className='page-index'>

      {!isUserHasDeposit && (
        <View>
          <View className='deposit-tip'>
            <View className='content'>
              <Image src={require('../../assets/home_icon_prompt@2x.png')} mode='aspectFit' className='icon' />
              借书请先缴纳押金
            </View>
            <Button
              size='mini'
              className='btn-primary'
              onClick={() => Taro.navigateTo({ url: '/pages/buy-deposit/index' })}
            >缴纳押金</Button>
          </View>
          <View className='space' />
        </View>
      )}

      <View className='page-section'>
        <View className='shop-book-list'>
          <ScrollView scrollX>
            <View className='type-filter'>
              <View className='type-filter__item type-filter__item--active'>全部</View>
              <View className='type-filter__item'>小班</View>
              <View className='type-filter__item'>中班</View>
              <View className='type-filter__item'>大班</View>
            </View>
          </ScrollView>
          <BookGrid items={cabinetBookItems} onBorrowClick={item => onBorrowClick(item)} />
        </View>
      </View>

      <View className='space space--text'>
        <View className='text'>你已看过的书</View>
      </View>
      <View className='page-section'>
        <BookGrid items={[]} onBorrowClick={() => {}} />
      </View>
      <View className='space' />

      {borrowItem && (
        <BorrowBookConfirm
          visible={borrowConfirmVisible}
          book={borrowItem}
          isBorrowSend={isBorrowSend}
          onConfirm={() => onBorrowConfirm()}
          onCancel={() => closeBorrowConfirm()}
        />
      )}
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}
Index.options = {
  addGlobalClass: true
}

export default observer(Index)
