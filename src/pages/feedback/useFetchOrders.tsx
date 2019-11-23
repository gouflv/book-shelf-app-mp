import { useState, useEffect } from '@tarojs/taro'

export default function useFetchOrders() {
  const [items, setItems] = useState<any[]>([])
  const [isEmpty, setEmptyState] = useState(false)
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    fetch()
  }, [])

  function fetch() {
    const data = [{ name: 'A1' }] as any[]
    setEmptyState(!data.length)
    setItems(data)
    setOptions(data.length
      ? data.map(d => d.name)
      : ['暂无还书记录']
    )
  }

  function getOrderByIndex(index: number) {
    return items[index] || null
  }

  return {
    orderOptions: options,
    isOrderEmpty: isEmpty,
    getOrderByIndex
  }
}
