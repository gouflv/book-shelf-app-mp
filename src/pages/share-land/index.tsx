import './index.scss'
import Taro, { useState, useContext, useEffect } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import AppStore from '../../store/app'
import { observer } from '@tarojs/mobx'

const Page: Taro.FC = () => {
  const { token: hasRegister, shareMember, user, fetchUserInfo, loginWithData, loading } = useContext(AppStore)

  const [isSelf, setIsSelf] = useState(false)
  const [isShowResult, setShowResult] = useState(false)

  useEffect(() => {
    async function fetch() {
      if (hasRegister && shareMember) {
        await fetchUserInfo()
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    if (user && shareMember) {
      setIsSelf(user.memberCode === shareMember.memberCode)
    }
  }, [user])

  async function onGetUserInfo({ encryptedData, iv }) {
    if (!encryptedData) {
      return
    }
    console.debug(encryptedData, iv)
    await loginWithData({
      encryptedData,
      iv,
      inviter: shareMember && shareMember.memberCode
    }, false)
    setShowResult(true)
  }

  // eslint-disable-next-line react/no-multi-comp
  const renderBtn = () => {
    if (!loading && isSelf) {
      return <Button className='btn btn-disabled' onClick={() => Taro.reLaunch({ url: '/pages/index/index' })}>没有办法领取自己的优惠券哦</Button>
    }
    if (!loading && hasRegister) {
      return <Button className='btn btn-disabled' onClick={() => Taro.reLaunch({ url: '/pages/index/index' })}>你不是新用户咯，无法领取</Button>
    }
    return (
      <Button
        className='btn btn-primary'
        openType='getUserInfo'
        onGetUserInfo={e => onGetUserInfo(e.detail)}
      >领取免费借书卡</Button>
    )
  }

  // eslint-disable-next-line react/no-multi-comp
  const renderIndex = () => {
    const { nickName, image } = shareMember || {}
    return (
      <View>
        <View className='top'>
          <Image src={image || '//placehold.it/200'} mode='aspectFit' className='thumb' />
          <View className='title'>
            你的好友<Text className='orange'>{nickName}</Text>送你5张借书卡
            <View>邀请你一起读书啦！</View>
          </View>
        </View>

        <View className='ticket-container'>
          <Image src={require('../../assets/invite_bg_rule@2x.png')} mode='aspectFit' className='bg' />
          <View className='ticket'>
            <View className='ticket__hd'>
              5<Text className='unit'>张</Text>
            </View>
            <View className='ticket__bd'>
              免费借阅卡5张
            </View>
          </View>
          <View className='ticket-desc'>
            免费借书次卡<Text className='orange'>5张</Text>，每张借阅卡可免费借一本书3天，每次最多可同时借阅2本书。
          </View>
        </View>

        <View className='footer'>
          {renderBtn()}
        </View>
      </View>
    )
  }

  // eslint-disable-next-line react/no-multi-comp
  const renderResult = () => (
    <View>
      <View className='top'>
        <Image src={user ? user.image : '//placehold.it/200'} mode='aspectFit' className='thumb' />
        <View className='title2'>
          Hi, {user && user.nickName}
        </View>
      </View>
      <View className='result-container'>
        <Image src={require('../../assets/invite_bg_received@2x.png')} mode='aspectFit' className='bg' />
        <View className='content'>
          <View className='title'>恭喜！领取成功！</View>
          <View className='desc gray'>
            借阅卡已经放入你的账户，请在“钱包”中查看
          </View>
        </View>
      </View>
      <View className='footer'>
        <Button className='btn btn-primary' onClick={() => Taro.switchTab({ url: '/pages/home/introGuard' })}>去借书</Button>
      </View>
    </View>
  )

  return (
    <View className='page'>
      {isShowResult ? renderResult() : renderIndex()}
      <Image src={require('../../assets/invite_bg@2x.png')} mode='aspectFit' className='page-bg' />
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '葫芦弟弟借书馆'
}

export default observer(Page)
