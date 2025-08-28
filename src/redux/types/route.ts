import type { RouteObject } from 'react-router-dom'

export type IRoute = RouteObject & {
  name?: string; // 路由名称
  icon?: string; // 路由图标
  key: string; // 路由key
  parentKey: string; // 父级路由key
  path?: string; // 路由路径
  elementPath?: string; // 路由组件路径
  redirect?: string; // 重定向路径
  hideInMenu?: boolean; // 是否在侧边栏中隐藏
  order?: number; // 路由排序
  requiredRole?: string[]; // 所需角色标识
  requiredPermission?: string; // 所需权限标识
  type: number; // 路由类型 1: 目录 2: 菜单 3: 按钮
  children?: IRoute[]; // 子路由
};

export interface IRouteState {
  routes: IRoute[]; // 路由列表
  collapsed: boolean; // 侧边栏是否折叠
}

export interface IThunkRouteState {
  state: IRouteState // 路由状态
}
