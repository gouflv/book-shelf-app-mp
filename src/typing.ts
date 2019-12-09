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
  totalPrice: string
  borrowTotal: string
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
  goodsNames: string
  lendingcardType: CardType
  booksName: string
  booksImg: string
  createTime: string
  status: OrderStatus
}

export interface Wallet {
  // 余额
  balance: string
  //押金总额
  depositTotal: string
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
