import { POST } from '../utils'
import { useState, useEffect, useCallback, useReachBottom } from '@tarojs/taro'

// eslint-disable-next-line import/prefer-default-export
export const usePagination = ({ url }) => {
  const [items, setItems] = useState<any[]>([])
  const [index, setIndex] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isFinish, setFinish] = useState(false)
  const [isEmpty, setEmpty] = useState(false)

  const fetch = useCallback(async () => {
    const data = await POST(url, {
      data: {
        pageIndex: index,
        pageSize: 10
      }
    })
    const f_items = data.records
    setItems(prevState => [...prevState, ...f_items])
    setLoading(false)
    if (!f_items.length) {
      setFinish(true)
    }
    if (index === 1 && !f_items.length) {
      setEmpty(true)
      setFinish(true)
    }
  }, [index, url])

  async function fetchStart() {
    setItems([])
    setEmpty(false)
    setFinish(false)
    setIndex(1)
    setLoading(true)
  }

  async function fetchNext() {
    setIndex(prevState => prevState + 1)
    setLoading(true)
  }

  useEffect(() => {
    if (loading && !isFinish) {
      fetch()
    }
  }, [fetch, isFinish, loading])

  useReachBottom(() => {
    if (!loading && !isFinish && !isEmpty) {
      fetchNext()
    }
  })

  return { items, fetchNext, fetchStart, loading, isFinish, isEmpty }
}
