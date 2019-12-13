import { useEffect, useState } from '@tarojs/taro'
import { POST } from '../../utils'
import { OrderStatus } from '../../typing'

interface useFetchOrdersProps {
  day?: number
  status?: OrderStatus
  emptyText: string
}

export default function useFetchOrders(
  { day, status, emptyText }: useFetchOrdersProps
) {
  const [items, setItems] = useState<any[]>([])
  const [isEmpty, setEmpty] = useState(false)
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    async function fetch() {
      const data = {} as any
      if (day) data.day = day
      if (status) data.status = status

      const res = await POST('account/getOrderList', {
        data
      })
      setEmpty(!res.length)
      setItems(res)
      setOptions(res.length
        ? res.map(d => d.booksName)
        : [emptyText]
      )
    }
    fetch()
  }, [day, emptyText, status])


  function getOrderByIndex(index: number) {
    return items[index] || null
  }

  return {
    orderOptions: options,
    isOrderEmpty: isEmpty,
    getOrderByIndex
  }
}
