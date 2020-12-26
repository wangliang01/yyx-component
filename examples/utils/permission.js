/**
 * 权限
 */

/*
   判断当前路由对象是否有权限
   route: 你要判断的路由对象
   role: 当前角色
 */
export function hasPermission(route, role) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role) // 如果配置了 就看roles包不包含当前角色 包含就是有权限 否则就是没有权限
  } else {
    return true // 如果没有配置meta 里面也没有roles 证明不需要权限 都可以访问 直接return true
  }
}

/*
    封装函数 把可以访问的路由过滤出来
  */
export function filterRoutes(asyncRoutes, role) {
  // 把有权限的路由过滤出来
  const accessRoute = asyncRoutes.filter((item) => {
    if (hasPermission(item, role)) {
      if (item.children && item.children.length) {
        // 递归过滤
        item.children = filterRoutes(item.children, role)
      }
      return true // 有权限 返回true
    } else {
      return false // 没有权限返回false
    }
  })
  console.log('accessRoute', accessRoute)
  return accessRoute
}
