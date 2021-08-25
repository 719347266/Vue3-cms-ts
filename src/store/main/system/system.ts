import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './types'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    },
    changeUsersCount(state, payload) {
      state.usersCount = payload
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload
    },
    changeMenuList(state, payload) {
      state.menuList = payload
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const pageNmae = payload.pageName
      const pageUrl = `/${pageNmae}/list`

      // 拿到请求信息 去请求对应的 列表信息
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const changePageName =
        pageNmae.slice(0, 1).toUpperCase() + pageNmae.slice(1)

      commit(`change${changePageName}List`, pageResult.data.list)
      commit(`change${changePageName}Count`, pageResult.data.totalCount)
    },
    async deletePageDataAction({ dispatch }, payload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 删除请求
      deletePageData(pageUrl)

      // 删除后重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, newData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
