import { createSlice } from '@reduxjs/toolkit'
import type { IRouteState } from '../types/route'

const initialState: IRouteState = {
  // 路由列表
  routes: [],
  // 侧边栏是否折叠
  collapsed: false,
}

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    collapsedAction: (state, { payload: { type, data } }) => {
      switch (type) {
        case 'set':
          state.collapsed = data
          break
      }
    },
  },
})

export const { collapsedAction } = routeSlice.actions
export default routeSlice.reducer
