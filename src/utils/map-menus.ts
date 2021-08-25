import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const router: RouteRecordRaw[] = []
  // 1.先找出所有路由的路径信息 routes
  const allRoutes: RouteRecordRaw[] = []
  // 1.1 加载找到 router/main 里面所有ts文件导出的路径
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 1.2 routeFiles返回的路径 是基于 ../router/main 所以要做一个 完整的路径拼接
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    // 2.1 找到后台 返回该账号的权限列表
    for (const menu of menus) {
      if (menu.type === 2) {
        // type === 2 就是二级目录 在所有路由信息中查找 等于 后台返回的二级路由菜单信息
        const route = allRoutes.find((route) => route.path === menu.url)
        // 放入route中 动态添加到路由中
        if (route) router.push(route)
        if (!firstMenu) {
          // 默认将遍历到的第一个二级目录 存到firstMenu中 作为登录时默认进入第一个 二级页面
          firstMenu = menu
        }
      } else {
        // type === 1 就是一级目录 递归遍历 一级目录下的二级目录
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return router
}

// 遍历查找 当前打开页面的一二级路由菜单信息 面包屑导航显示
export function pathMapBreadcrumbs(useMenu: any[], currentPath: string) {
  const Breadcrumb: IBreadcrumb[] = []
  // useMenu后台返回的所有路由权限 currentPath 当前打开的页面路由信息 Breadcrumb面包屑数组
  pathMapToMenu(useMenu, currentPath, Breadcrumb)
  return Breadcrumb
}

// 遍历获取当前打开的路由信息
export function pathMapToMenu(
  useMenu: any[],
  currentPath: string,
  breadcrumb?: any[]
): any {
  for (const menu of useMenu) {
    if (menu.type === 1) {
      // type === 1 下面还有子集children
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // menu.name 一级菜单信息 findMenu.name 二级菜单信息
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 获取按钮权限
export function mapMenusToPermissions(useMenu: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(useMenu)
  return permissions
}

// 遍历获取 树形校色管理节点的id
export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leftKeys
}

export { firstMenu }
