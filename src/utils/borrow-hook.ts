import Taro, { useContext, useState } from '@tarojs/taro'
import { BoxOpenState, DeviceBook } from '../typing'
import { defaultErrorHandler, hideLoading, POST, showLoading, showToast } from './index'
import DialogService from '../store/dialogService'
import useBindPhone from './bind-phone-hook'

const borrowErrorConfig = {
  1: { type: '需绑定手机号', text: '查看', page: '/pages/user-bind-phone/index' },
  2: { type: '每次最多只能借阅2本书', text: '查看', page: '/pages/order/index' },
  3: { type: '你还有逾期费用未支付', text: '去支付', page: '/pages/order/index?tab=3' },
  4: { type: '缴纳押金', text: '交押金', page: '/pages/buy-deposit/index' },
  5: { type: '押金不足', text: '补押金', page: '/pages/buy-deposit/index' },
  6: { type: '借阅卡', text: '去购买', page: '/pages/buy-card/index' }
}

async function checkBorrowAllow() {
  try {
    showLoading()
    await POST('base/judgeBorrowing')
    return { error: false }
  } catch (e) {
    const [title, content] = (e.message || '').split(':')
    return { error: true, code: e.code, title, content }
  } finally {
    hideLoading()
  }
}

const useBookBorrow = (
  {
    onBorrowSuccess
  } : {
    onBorrowSuccess?: (book: DeviceBook) => void
  }
) => {
  const { showConfirm } = useContext(DialogService)
  const { onGetPhoneNumber } = useBindPhone({
    success() {
      //重新打开借阅对话框
      setBorrowConfirmVisible(true)
    }
  })

  const [borrowConfirmVisible, setBorrowConfirmVisible] = useState(false)
  const [borrowItem, setBorrowItem] = useState<DeviceBook>()

  async function onBorrowClick(book: DeviceBook) {
    const { error, code, title, content } = await checkBorrowAllow()
    if (error) {
      const config = borrowErrorConfig[code]
      if (!config) {
        console.error('handler undefined for', code)
        return
      }

      if (code === 1) {
        setBorrowItem(book)
        await showConfirm({
          title,
          content,
          confirmText: config.text,
          confirmOpenType: 'getPhoneNumber',
          onGetPhoneNumber: (e) => onGetPhoneNumber(e.detail)
        })

      } else {
        await showConfirm({
          title,
          content,
          confirmText: config.text
        })
        Taro.navigateTo({ url: config.page })
      }

    } else {
      setBorrowItem(book)
      setBorrowConfirmVisible(true)
    }
  }

  async function onBorrowConfirm() {
    if (!borrowItem) return
    showLoading()
    try {
      await POST('book/borrow', {
        data: {
          eqCode: borrowItem.eqCode,
          eqBoxId: borrowItem.eqBoxId,
          booksInfoId: borrowItem.bookId,
          rfidCode: borrowItem.rfidCode
        }
      })
      showToast({ title: '开柜成功' })

      const newState: DeviceBook = {
        ...borrowItem,
        openStatus: BoxOpenState.UN_SAFE_TRUE
      }
      setBorrowItem(newState)

      onBorrowSuccess && onBorrowSuccess(newState)

    } catch (e) {
      showToast({ title: '开柜失败，如果疑问请联系客服' })
    } finally {
      hideLoading()
    }
  }

  async function onBorrowOpenAgain(book: DeviceBook) {
    showLoading()
    try {
      await POST('book/openTheCabinetAgain', {
        data: {
          eqBoxId: book.eqBoxId
        }
      })
      showToast({ title: '开柜成功' })
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      hideLoading()
    }
  }

  return {
    borrowConfirmVisible,
    borrowItem,

    onBorrowClick,
    onBorrowConfirmClick: onBorrowConfirm,
    closeBorrowConfirm() {
      setBorrowConfirmVisible(false)
    },

    onBorrowOpenBoxClick: onBorrowOpenAgain
  }
}

export default useBookBorrow
