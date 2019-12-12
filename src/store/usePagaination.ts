import { defaultErrorHandler, hideLoading, POST, showLoading } from '../utils'
import { useCallback, useEffect, useReachBottom, useState } from '@tarojs/taro'

interface usePaginationProps {
  url: string
  params: any
}

// eslint-disable-next-line import/prefer-default-export
export const usePagination = ({ url, params }: usePaginationProps) => {
  const [items, setItems] = useState<any[]>([])
  const [index, setIndex] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isFinish, setFinish] = useState(false)
  const [isEmpty, setEmpty] = useState(false)

  const fetch = useCallback(async () => {
    try {
      const data = await POST(url, {
        data: {
          pageIndex: index,
          pageSize: 10,
          ...params
        }
      })
      const f_items = data.records
      const n_items = [...items, ...f_items]
      setItems(n_items)
      if (n_items.length >= data.total) {
        setFinish(true)
      }
      if (index === 1 && !f_items.length) {
        setEmpty(true)
      }
    } catch (e) {
      setFinish(true)
      defaultErrorHandler(e)
    } finally {
      setLoading(false)
      hideLoading()
    }
  }, [index, items, url, params])

  async function fetchStart() {
    showLoading()
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
    if (url && loading && !isFinish) {
      fetch()
    }
  }, [fetch, isFinish, loading, url])

  useReachBottom(() => {
    if (!loading && !isFinish && !isEmpty) {
      fetchNext()
    }
  })

  return { items, fetchNext, fetchStart, loading, isFinish, isEmpty }
}
