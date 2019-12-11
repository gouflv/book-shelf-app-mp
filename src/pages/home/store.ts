/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from '@tarojs/taro'
import { hideLoading, POST, showLoading, showToast } from '../../utils'
import { CabinetBook } from '../../typing'

export const useCabinetBooks = () => {
  const [items, setItems] = useState<any[]>([])

  const fetch = useCallback(async ({ eqCode }) => {
    const data = await POST('book/getEquipmentBookList', {
      data: {
        eqCode
      }
    })
    setItems(data)
  }, [])
  return { cabinetBookItems: items, fetchCabinetBook: fetch }
}

export const checkBorrowAllow = async () => {
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

export const onBorrowConfirm = async (borrowItem: CabinetBook) => {
  showLoading()
  try {
    await POST('book/borrow', {
      data: {
        booksInfoId: borrowItem.bookId,
        eqBoxId: borrowItem.eqBoxId,
        eqCode: borrowItem.eqCode,
        rfidCode: borrowItem.rfidCode
      }
    })
    showToast({ title: '开柜成功' })
  } catch (e) {
    showToast({ title: '开柜失败，如果疑问请联系客服' })
  } finally {
    hideLoading()
  }
}
