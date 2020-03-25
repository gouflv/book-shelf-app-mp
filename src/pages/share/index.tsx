import './index.scss'
import Taro, { useEffect, useShareAppMessage, ShareAppMessageReturn, useContext, useState } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'
import { POST } from '../../utils'
import dayjs from 'dayjs'

const Page: Taro.FC = () => {
  const { user }  = useContext(AppStore)

  //#region share
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }, [])

  useShareAppMessage(() => {
    if (!user) return
    const config: ShareAppMessageReturn = {
      title: '送您5张免费借书卡，一起来葫芦弟弟借书吧',
      // imageUrl: '',
      path: `/pages/share-land/index?memberCode=${user.memberCode}&nickName=${user.nickName}&image=${user.image}`
    }
    console.log(config.path)
    return config
  })
  //#enderegion

  //#region log
  const [logs, setLogs] = useState<any[]>()
  useEffect(() => {
    async function fetch() {
      const res = await POST('base/getNewMemberInvitation')
      setLogs(res)
    }
    fetch()
  }, [])
  //#endregion

  return (
    <View>
      <View className='banner'>
        <Image src={require('../../assets/invitefriends_bg@2x.png')} mode='aspectFit' className='bg' />
        <View className='content'>
          <View className='title'>邀请新用户借书，各得五张免费借书卡</View>
          <View className='desc gray'>若你的借阅卡在有效期内，则获得5天延期</View>
          <Button className='btn btn-primary' openType='share'>邀请好友一起读</Button>
        </View>
      </View>

      {logs && logs.length && (
        <View className='page-section' style={{ paddingTop: 0 }}>
          <View className='card-group-title'>邀请记录</View>
          <View className='card card--shadow'>
            <View className='cell-group'>
              {logs.map(item => (
                <View className='cell'>
                  <View className='cell__hd'>
                    <Image src={item.image || '//placehold.it/100'} mode='aspectFit' className='thumb' />
                  </View>
                  <View className='cell__bd'>
                    <View className='label'>{decodeURIComponent(item.nickName)}</View>
                    <View className='desc gray'>邀请成功: {dayjs(item.createTime).format('YYYY-M-D')}</View>
                  </View>
                  <View className='cell__ft red bold'>
                    +{5}
                    {
                      {1: '张次卡', 2: '天借阅卡'}[item.lendingcardType]
                    }
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

Page.config = {
  navigationBarTitleText: ''
}

export default observer(Page)
