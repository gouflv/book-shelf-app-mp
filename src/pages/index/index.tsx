import './index.scss'
import Taro, { useEffect, useState } from '@tarojs/taro'
import { Button, Image, ScrollView, View } from '@tarojs/components'
import BorrowBookConfirm from '../../components/BorrowBookConfirm'
import BookGrid from '../../components/BookGrid'
import { useCabinetBooks, useCabinetList } from './store'
import classNames from 'classnames'

const Index: Taro.FC = () => {
  const { cabinetList, fetchCabinetList } = useCabinetList()
  const { cabinetBookItems, fetchCabinetBook } = useCabinetBooks()

  const [cabinetCode, setCabinetCode] = useState<string>()

  // initial
  useEffect(() => {
    initial()
  }, [])

  useEffect(() => {
    cabinetCode && fetchCabinetBook({ eqCode: cabinetCode })
  }, [cabinetCode])

  async function initial() {
    await fetchCabinetList()
    setCabinetCode('T738')
  }


  // borrow
  const [borrowConfirmVisible, setBorrowConfirmVisible] = useState(false)
  const [borrowItem, setBorrowItem] = useState(null)
  function onBorrowClick(book) {
    console.log(book)
    setBorrowItem(book)
    setBorrowConfirmVisible(true)
  }

  return (
    <View className='page-index'>
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
          <ScrollView>
            <View className='type-filter'>
              {cabinetList.map((data, index) => (
                <View
                  key={index}
                  className={classNames([
                    'type-filter__item',
                    {'type-filter__item--active': data.eqCode === cabinetCode}
                  ])}
                  onClick={() => setCabinetCode(data.eqCode)}
                >
                  {data.eqName}
                </View>
              ))}
            </View>
          </ScrollView>
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

      <BorrowBookConfirm
        visible={borrowConfirmVisible}
        book={borrowItem}
        onConfirm={() => { /*TODO*/ }}
        onCancel={() => setBorrowConfirmVisible(false)}
      />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}
Index.options = {
  addGlobalClass: true
}

export default Index
