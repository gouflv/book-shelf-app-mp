/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from '@tarojs/taro'
import { POST } from '../../utils'

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
