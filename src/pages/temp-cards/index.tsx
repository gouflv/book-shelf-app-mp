import './index.scss'
import Taro, { useState } from '@tarojs/taro'
import { Button, Image, RichText, Text, View } from '@tarojs/components'
import classNames from 'classnames'

const Page: Taro.FC = () => {
  const [tab, setTab] = useState<1 | 2>(1)

  return (
    <View>

      <View className='top-tabbar'>
        <View
          className={classNames('item', { 'item--active': tab === 1 })}
          onClick={() => setTab(1)}
        >
          可使用（5）
        </View>
        <View
          className={classNames('item', { 'item--active': tab === 2 })}
          onClick={() => setTab(2)}
        >
          不可使用（1）
        </View>
      </View>

      {tab === 1 && (
        <View className='t-card-list'>
          <View className='t-card'>
            <Image src={require('../../assets/car_bg_use@3x.png')} mode='aspectFit' className='t-card__bg' />
            <View className='t-card__wrapper'>
              <View className='t-card__bd'>
                <View className='label'>
                  借书<Text>1</Text>次
                </View>
                <View className='desc gray'>长期有效</View>
              </View>
              <View className='t-card__ft'>
                <Text className='orange'>去使用</Text>
              </View>
            </View>
          </View>
          <View className='t-card'>
            <Image src={require('../../assets/car_bg_use@3x.png')} mode='aspectFit' className='t-card__bg' />
            <View className='t-card__wrapper'>
              <View className='t-card__bd'>
                <View className='label'>
                  借书<Text>1</Text>次
                </View>
                <View className='desc red'>可用日期: 2019/9/1 至 2019/10/1</View>
              </View>
            </View>
          </View>
        </View>
      )}

      {tab === 2 && (
        <View className='t-card-list'>
          <View className='t-card'>
            <Image src={require('../../assets/car_bg_expired@3x.png')} mode='aspectFit' className='t-card__bg' />
            <View className='t-card__wrapper'>
              <View className='t-card__bd'>
                <View className='label gray'>
                  借书<Text>1</Text>次
                </View>
                <View className='desc gray'>2019/9/1 至 2019/10/1</View>
              </View>
            </View>
          </View>
        </View>
      )}

      {tab === 1 && (
        <View>
          <View className='page-section buy-rules'>
            <View className='section-header'>
              购卡须知
            </View>
            <View className='buy-rules-content'>
              <RichText nodes='买借阅卡时优先使用用户余额抵扣' />
            </View>
          </View>
          <View className='footer'>
            <Button className='btn-primary'>购买阅读卡</Button>
          </View>
        </View>
      )}
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '我的次卡'
}

export default Page
