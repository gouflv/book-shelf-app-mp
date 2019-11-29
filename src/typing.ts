export interface User {
  clientToken: string
  openId: string
  unionId: string
  registerDate: string

  //#region wallet

  // 余额
  balance: string
  //押金
  depositTotal: string
  //卡有效期
  effectiveTimes: string
  lastConsumptionDate: string
  lendingCardTotal: string

  memberId: string
  memberCode: string
  memberSource: string

  //#endregion

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
}

export interface Book {
  booksId: string
  booksName: string
  booksImg: string
  totalPrice: string
  borrowTotal: string
}
