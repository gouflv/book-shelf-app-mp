export const API_BASE = () => {
  //@ts-ignore
  if (__wxConfig && ~['develop'].indexOf(__wxConfig.envVersion)) {
    return 'https://app.ruijiehailiang.com/gourd/client'
  }
  return 'https://jieshu.hollobook.com/gourd/client'
}

export const MoneyFormatter = '0[.]00'

export const CateType = [
  { id: 1, name: '小班', value: [3, 4] },
  { id: 2, name: '中班', value: [4, 5] },
  { id: 3, name: '大班', value: [5, 6] },
]

export const ChnNumChar = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九'
}
