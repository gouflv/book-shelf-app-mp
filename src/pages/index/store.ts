/* eslint-disable import/prefer-default-export */
import { useState, useCallback } from '@tarojs/taro'
import { hideLoading, POST, showLoading } from '../../utils'
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
  } catch (e) {

  } finally {
    hideLoading()
  }
}
