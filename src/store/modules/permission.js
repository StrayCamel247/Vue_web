import { constantRoutes, asyncRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
export function filterAsyncRoutesViaPages(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRoutesViaPages(tmp.children)
    }
    res.push(tmp)
  })

  return res
}

/* Layout */
import Layout from '@/layout'

/*
因为import是静态执行的，不能使用表达式和变量，即在运行时才能拿到结果的语法结构（e.g. if…else…）
参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import
解决方法  构造import字典
===待优化===
*/
const importDict = {
  '@/views/icons/index': () => import('@/views/icons/index')
}
export function filterRoutesViaPages(pages) {
  const res = []
  for (const page of pages) {
    const tmp = {}
    // path
    tmp.path = page.path
    // component
    if (page.route) {
      tmp.component = importDict[page.route]
    } else {
      tmp.component = Layout
    }
    // hidden
    if (page.is_hidden) {
      tmp.hidden = page.is_hidden
    }
    // children
    if (page.children) {
      // alert(page.children)
      tmp.children = filterRoutesViaPages(page.children)
    }
    // redirect
    if (page.redirect) {
      tmp.redirect = page.redirect
    }
    // meta;name
    if (page.title) {
      if (page.icon) {
        tmp.meta = { title: page.title, icon: page.icon, affix: true }
      } else {
        tmp.meta = { title: page.title, icon: 'icon', affix: true }
      }
      tmp.name = page.title
    }
    res.push(tmp)
  }
  return res
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // state.routes = constantRoutes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generateRoutesViaPages({ commit }, pages) {
    return new Promise(resolve => {
      const pagesRoutes = filterRoutesViaPages(pages)
      const accessedRoutes = filterAsyncRoutesViaPages(pagesRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
