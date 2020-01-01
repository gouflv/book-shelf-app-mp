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

export const useCountDownWithResume = (namespace: string, onStart: () => void) => {
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

  function start() {
    const prevCountDown = Taro.getStorageSync(`${CountDownValueKey}.${namespace}`)
    const countDownStamp = Taro.getStorageSync(`${CountDownStampKey}.${namespace}`)

    if (prevCountDown && countDownStamp && dayjs(countDownStamp).add(60 - 1, 'second').isAfter(dayjs())) {
      const timePass = dayjs().diff(dayjs(countDownStamp), 'second')
      // @ts-ignore
      startCountDown(timePass >= 60 ? 60 : (prevCountDown - timePass * 1000))
    } else {
      // @ts-ignore
      startCountDown()
      onStart()
      updateCountDownStamp()
    }
  }

  return {
    timeLeft,
    startCountDown: start
  }
}
