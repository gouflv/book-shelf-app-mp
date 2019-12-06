import './index.scss'
import Taro, { useContext, useEffect, useState } from '@tarojs/taro'
import { Button, Image, ScrollView, View } from '@tarojs/components'
import BorrowBookConfirm from '../../components/BorrowBookConfirm'
import BookGrid from '../../components/BookGrid'
import { checkBorrowAllow, onBorrowConfirm, useCabinetBooks } from './store'
import AppStore from '../../store/app'
import { Cabinet, CabinetBook } from '../../typing'
import { observer } from '@tarojs/mobx'

const Index: Taro.FC = () => {
  const { scanCabinet, setScanCabinet } = useContext(AppStore)
  const { cabinetBookItems, fetchCabinetBook } = useCabinetBooks()

  // initial
  useEffect(() => {
    setScanCabinet({ eqCode: 'T738' } as Cabinet)
  }, [])

  useEffect(() => {
    if (scanCabinet) {
      fetchCabinetBook({ eqCode: scanCabinet.eqCode })
    }
  }, [scanCabinet])


  // borrow
  const [borrowConfirmVisible, setBorrowConfirmVisible] = useState(false)
  const [borrowItem, setBorrowItem] = useState<CabinetBook>()
  /*
  * 1 需绑定手机号:确保借阅账户安全
  * 2 每次最多只能借阅2本书:你还有未归还的书
  * 3 你还有逾期费用未支付:请缴纳费用
  * 4 缴纳押金:你还未交纳押金
  * 5 押金不足:请补纳押金
  * 6 借阅卡:你还未购买借阅卡
  * */
  async function onBorrowClick(book) {
    const { error, title, content } = await checkBorrowAllow()
    if (error) {
      //TODO
      Taro.showModal({
        title,
        content
      })
      return
    }
    setBorrowItem(book)
    setBorrowConfirmVisible(true)
  }

  return (
    <View className='page-index'>
      <View className='deposit-tip'>
        <View className='content'>
          <Image src={require('../../assets/home_icon_prompt@2x.png')} mode='aspectFit' className='icon' />
          借书请先缴纳押金
        </View>
        <Button size='mini' className='btn-primary'>缴纳押金</Button>
      </View>
      <View className='space' />

      <View className='page-section'>
        <View className='shop-book-list'>
          <ScrollView>
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
        <BookGrid items={[]} onBorrowClick={item => onBorrowClick(item)} />
      </View>
      <View className='space' />

      {borrowItem && (
        <BorrowBookConfirm
          visible={borrowConfirmVisible}
          book={borrowItem}
          onConfirm={() => onBorrowConfirm(borrowItem)}
          onCancel={() => setBorrowConfirmVisible(false)}
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
