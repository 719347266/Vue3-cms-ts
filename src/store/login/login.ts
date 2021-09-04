import { Module } from 'vuex'

import { IRootState } from '../type'
import { ILoginState } from './type'
import { IAccount } from '@/service/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login'
import LocalCache from '@/utils/cache'
import router from '@/router'

import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload: any) {
      state.userMenus = payload

      // 动态添加路由
      const routes = mapMenusToRoutes(payload)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      const permissions = mapMenusToPermissions(payload)

      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userinfo = userInfoResult.data
      commit('changeUserInfo', userinfo)
      LocalCache.setCache('userinfo', userinfo)

      // 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userinfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      console.log(router.getRoutes())

      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userinfo = LocalCache.getCache('userinfo')
      if (userinfo) {
        commit('changeUserInfo', userinfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
