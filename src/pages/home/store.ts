/* eslint-disable import/prefer-default-export */
import { useState, useEffect, useCallback } from '@tarojs/taro'
import { hideLoading, POST, showLoading } from '../../utils'
import _find from 'lodash.find'
import { CateType } from '../../config'

export const useDeviceBooks = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [eqCode, setEqCode] = useState()
  const [cateId, setCateId] = useState()

  const fetch = useCallback(async () => {
    let ageRange = {}
    if (cateId) {
      const match = _find(CateType, { id: cateId })
      if (match) {
        ageRange = {
          ageLowerLimit: match.value[0],
          ageUpperLimit: match.value[1]
        }
      }
    }

    setLoading(true)
    showLoading()
    const data = await POST('book/getEquipmentBookList', {
      data: {
        eqCode,
        ...ageRange
      }
    })
    setItems(data)
    setLoading(false)
    hideLoading()
  }, [cateId, eqCode])

  useEffect(() => {
    if (eqCode) {
      fetch()
    }
  }, [eqCode, fetch])

  return {
    deviceBookItems: items,
    fetchDeviceBook: fetch,
    deviceBookLoading: loading,

    setEqCode,
    cateId,
    setCateId
  }
}
