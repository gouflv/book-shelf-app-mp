import { useEffect, useState } from '@tarojs/taro'
import { POST } from '../../utils'
import { OrderStatus } from '../../typing'

interface useFetchOrdersProps {
  day?: number
  status?: OrderStatus
  emptyText: string
}

export default function useFetchOrders(props: useFetchOrdersProps = {} as any) {
  const { day, status, emptyText } = props

  const [items, setItems] = useState<any[]>([])
  const [isEmpty, setEmpty] = useState(false)
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    async function fetch() {
      const data = await POST('account/getOrderList', {
        data: { day, status }
      })
      setEmpty(!data.length)
      setItems(data)
      setOptions(data.length
        ? data.map(d => d.goods_names)
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
