import hyRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法users/id
  UserMenus = '/role/' // 用法/role/id/menu
}

// 登录获取
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

// 获取用户信息
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  })
}

// 获取用户菜单
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu',
    showLoading: false
  })
}
