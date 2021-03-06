import './index.scss'
import Taro, { useState, useRouter, useEffect, useContext } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, RichText, Button } from '@tarojs/components'
import { POST } from '../../utils'
import { Book, DeviceBook, Order } from '../../typing'
import useBookBorrow from '../../utils/borrow-hook'
import BorrowBookConfirm from '../../components/BorrowBookConfirm'
import AppStore from '../../store/app'
import BasicPageView from '../../components/BasicPageView'

const BookDetail: Taro.FC = () => {
  const { params } = useRouter()
  const { setCurrentOrder, scannedDevice, isUserBoundDevice } = useContext(AppStore)
  const {
    borrowItem, borrowConfirmVisible, closeBorrowConfirm,
    onBorrowClick, onBorrowConfirmClick, onBorrowOpenBoxClick
  } = useBookBorrow({
    //TODO update footer btn
    // @ts-ignore
    onBorrowSuccess: item => {}
  })

  function onBorrow() {
    if (book) {
      onBorrowClick({
        bookId: book.booksId,
        booksImg: book.booksImg,
        booksName: book.booksName,
        eqCode: scannedDevice.eqCode,
        eqBoxId: params.eqBoxId,
        rfidCode: params.rfidCode,
        boxNum: params.boxNum,
        openStatus: params.openStatus
      } as DeviceBook)
    }
  }

  function onBuyClick() {
    if (book) {
      setCurrentOrder({
        orderNo: book.borrowOrder,
        booksName: book.booksName,
        booksImg: book.booksImg,
        booksPrice: book.totalPrice
      } as Order)
      Taro.navigateTo({ url: '/pages/buy-book/index' })
    }
  }

  //#region PageData
  const [swiperIndex, onSwiperIndexChange] = useState(0)
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    fetch()
  }, [])

  async function fetch() {
    const data = await POST('book/getBookDetail', {
      data: { booksId: params.id }
    })
    setBook(data)
  }
  //#endregion

  if (!book) {
    return <View />
  }
  return (
    <BasicPageView className='page page--has-footer'>
      <View className='banner'>
        <Swiper className='swiper' circular onChange={e => onSwiperIndexChange(e.detail.current)}>
          <SwiperItem>
            <Image src={book.booksImg} className='image' />
          </SwiperItem>
        </Swiper>
        <View className='indicator'>
          {swiperIndex+1}/{1}
        </View>
      </View>

      <View className='main'>
        <View className='content'>
          <View className='title'>
            {book.booksName}
          </View>
          {book.borrowTotal &&
            <View className='ext'>被借了: {book.borrowTotal}次</View>
          }
        </View>

        {book.goodsSpec && (
          <View className='desc'>
            {book.goodsSpec}
          </View>
        )}
      </View>
      {/*<View className='space' />*/}

      {/*<View className='page-section comments'>*/}
      {/*  <View className='header'>*/}
      {/*    <View className='title'>*/}
      {/*      <Image src={require('../../assets/detail_icon_comment@2x.png')} mode='aspectFit' className='icon' />*/}
      {/*      评价*/}
      {/*      <View className='count'>(15)</View>*/}
      {/*    </View>*/}
      {/*    <View className='more' onClick={() => Taro.navigateTo({ url: '/pages/book/comments/index' })}>*/}
      {/*      查看全部 <View className='icon-more' />*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View className='list'>*/}
      {/*    {Array.from(Array(2)).map((_, i) => (*/}
      {/*      <View className='comment' key={i}>*/}
      {/*        <View className='thumb'>*/}
      {/*          <Image src='//placehold.it/100' mode='aspectFit' className='avatar' />*/}
      {/*        </View>*/}
      {/*        <View className='content'>*/}
      {/*          <View className='user'>*/}
      {/*            用户{i} <View className='date'>2019-11-11</View>*/}
      {/*          </View>*/}
      {/*          <View className='text'>*/}
      {/*            使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动/QQ小程序、快应用、H5、React-Native 等）运行的代码。*/}
      {/*          </View>*/}
      {/*        </View>*/}
      {/*      </View>*/}
      {/*    ))}*/}
      {/*  </View>*/}
      {/*</View>*/}

      {book.goodsIntroduce && book.goodsIntroduce.length && (
        <View>
          <View className='space space--text space--large'>
            <View className='text'>图文详情</View>
          </View>

          <View className='article'>
            <RichText nodes={`<div>${book.goodsIntroduce}</div>`} />
          </View>
        </View>
      )}

      {isUserBoundDevice && (
        <View className='footer'>
          {book.borrowOrder
            ? <Button className='btn btn-primary' onClick={onBuyClick}>立即购买</Button>
            : <Button className='btn btn-primary' onClick={onBorrow}>借阅</Button>
          }
        </View>
      )}

      {borrowItem && (
        <BorrowBookConfirm
          visible={borrowConfirmVisible}
          book={borrowItem}
          onConfirm={isOpen => {
            isOpen ? onBorrowOpenBoxClick(borrowItem) : onBorrowConfirmClick()
          }}
          onCancel={() => closeBorrowConfirm()}
        />
      )}
    </BasicPageView>
  )
}

BookDetail.config = {
  navigationBarTitleText: '商品详情'
}

export default BookDetail
