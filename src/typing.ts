export interface User {
  clientToken: string
  openId: string
  unionId: string
  registerDate: string

  //#region profile

  nickName: string
  realName: string
  sex: string
  tel: string
  address: string
  birthday: string
  image: string
  childBirthday: string
  childName: string
  childSex: string

  //#endregion
}

export interface Site {
  netCode: string
  netName: string
  address: string
  longitude: string
  latitude: string
  distance: string
}

export interface Cabinet {
  eqId: string
  eqName: string
  eqCode: string
  networkCode: string
  networkName: string
}

export interface CabinetBook {
  bookId: string
  booksImg: string
  booksName: string
  cabinetNum: string
  boxNum: string

  eqCode: string
  eqBoxId: string
  rfidCode: string
}

export interface Book {
  booksId: string
  booksName: string
  booksImg: string
  booksPrice: string
  borrowTotal: string
  // 用户借阅单号
  borrowOrder: string
  totalPrice: string
}

// eslint-disable-next-line import/prefer-default-export
export const enum CardType {
  TIMES = '1',
  DATE_RANGE = '2'
}

export const enum OrderStatus {
  Borrow = '0',
  Overdue = '2',
  Finish = '3'
}

export interface Order {
  orderNo: string
  lendingcardType: CardType
  booksName: string
  booksImg: string
  booksPrice: string

  status: OrderStatus
  subStatus: '3'
  createTime: string
  expireTime: string
  returnTime: string
  // 逾期天数
  beOverdueNum: string
  // 图书购买状态, 未购买为 null
  tosaleOrderNo: string
  // 计费异常: 大于0
  billingExceptions: string
}

export interface Wallet {
  // 余额
  balance: number
  //押金总额
  depositTotal: number
  //卡有效期
  // null 时代表次卡
  effectiveTimes: string
  //借阅卡数
  lendingCardTotal: string
}

export interface UserTimesCard {
  orderNo: string
  lendingcardType: CardType
  lendingcardName: string
  // timesCard only
  effectiveNum: string

  // dateRangeCard only
  effectiveTimes: string
  startDate: string
  endDate: string
}

export interface PaymentRequestParams {
  timeStamp: string
  nonceStr: string
  package: string
  signType: 'MD5'
  paySign: string
}
