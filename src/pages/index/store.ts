/* eslint-disable import/prefer-default-export */
import { useState } from '@tarojs/taro'
import { POST } from '../../utils'
import { Cabinet } from '../../typing'

export const useCabinetList = () => {
  const [items, setItems] = useState<Cabinet[]>([])
  async function fetch() {
    const data = await POST('book/getEquipmentListAll', {
      data: {
        networkCode: 'WD220191012112738888'
      }
    })
    setItems(data)
  }
  return { cabinetList: items, fetchCabinetList: fetch }
}


export const useCabinetBooks = () => {
  const [items, setItems] = useState<any[]>([])
  async function fetch({ eqCode }) {
    const data = await POST('book/getEquipmentBookList', {
      data: {
        eqCode
      }
    })
    setItems(data)
  }
  return { cabinetBookItems: items, fetchCabinetBook: fetch }
}
