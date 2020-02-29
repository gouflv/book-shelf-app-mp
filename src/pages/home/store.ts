/* eslint-disable import/prefer-default-export */
import { useCallback, useEffect, useState } from '@tarojs/taro'
import { hideLoading, POST, showLoading } from '../../utils'
import _find from 'lodash.find'
import { CateType } from '../../config'
import { DeviceBook } from '../../typing'

export const useDeviceBooks = () => {
  const [items, setItems] = useState<DeviceBook[]>([])
  const [loading, setLoading] = useState(true)

  const [eqCode, setEqCode] = useState()
  const [cateId, setCateId] = useState()

  const fetch = useCallback(async () => {
    if (!eqCode) return

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
    // const data = require('./mock').default
    setItems(data)
    setLoading(false)
    hideLoading()
  }, [cateId, eqCode])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    deviceBookItems: items,
    fetchDeviceBook: fetch,
    deviceBookLoading: loading,

    setEqCode,
    cateId,
    setCateId,

    // updateDeviceStateByBoxId(item: DeviceBook) {
    //   setItems(prevState => {
    //     console.log(prevState)
    //     return prevState.map(s => {
    //       if (s.eqBoxId === item.eqBoxId) {
    //         return { ...s, openStatus: BoxOpenState.UN_SAFE_TRUE }
    //       }
    //       return s
    //     })
    //   })
    // }
  }
}
