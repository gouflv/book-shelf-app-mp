import { defaultErrorHandler, hideLoading, POST, showLoading } from '../utils'
import { useState, useEffect, useCallback, useReachBottom } from '@tarojs/taro'

interface usePaginationProps {
  url: string
  getParams?: () => { [key: string]: any }
}

// eslint-disable-next-line import/prefer-default-export
export const usePagination = (props: usePaginationProps) => {
  const { url, getParams } = props
  const params = getParams ? getParams() : null

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
      setItems(prevState => [...prevState, ...f_items])
      if (!f_items.length) {
        setFinish(true)
      }
      if (index === 1 && !f_items.length) {
        setEmpty(true)
        setFinish(true)
      }
    } catch (e) {
      defaultErrorHandler(e)
    } finally {
      setLoading(false)
      hideLoading()
    }
  }, [index, url])

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
