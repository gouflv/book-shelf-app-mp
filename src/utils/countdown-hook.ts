import Taro, { useEffect, useState, useCallback } from '@tarojs/taro'
import dayjs from 'dayjs'

const useCountDown = (timeToCount = 60 * 1000, interval = 1000) => {
  const [timeLeft, setTimeLeft] = useState(0)

  const start = useCallback(
    (newTimeToCount) => setTimeLeft(newTimeToCount !== undefined ? newTimeToCount : timeToCount),
    [timeToCount],
  )

  let timer: any = null

  useEffect(
    () => {
      if (timeLeft === 0) {
        return
      }

      clearTimeout(timer)
      timer = setTimeout(() => {
        const nextSecondsLeft = timeLeft - interval > 0 ? timeLeft - interval : 0
        setTimeLeft(nextSecondsLeft)
      }, interval)

      return () => clearTimeout(timer)
    },
    [timeLeft, timer],
  )

  return [timeLeft, start]
}

export default useCountDown

const CountDownValueKey = 'countDown'
const CountDownStampKey = 'countDownStamp'

export const useCountDownWithResume = (namespace: string) => {
  const [timeLeft, startCountDown] = useCountDown()

  useEffect(() => {
    saveCountDownValue(timeLeft)
  }, [timeLeft])

  function saveCountDownValue(value) {
    Taro.setStorageSync(`${CountDownValueKey}.${namespace}`, value)
  }

  function updateCountDownStamp() {
    Taro.setStorageSync(`${CountDownStampKey}.${namespace}`, dayjs().format('YYYY-MM-DD HH:mm:ss'))
  }

  function getTimeRemind() {
    const prevCountDown = Taro.getStorageSync(`${CountDownValueKey}.${namespace}`)
    const countDownStamp = Taro.getStorageSync(`${CountDownStampKey}.${namespace}`)
    if (prevCountDown && countDownStamp &&
      dayjs(countDownStamp).add(60 - 1, 'second').isAfter(dayjs()))
    {
      //距离上次标记在60s之内，才计算剩余时间
      const timePass = dayjs().diff(dayjs(countDownStamp), 'second')
      const res = (60 - timePass) * 1000
      return res > 0 ? res : 0
    }
    return 0
  }

  return {
    timeLeft,
    getTimeRemind,
    updateCountDownStamp,
    startCountDown
  }
}
