import { configureStore } from '@reduxjs/toolkit'

import exampleReducer from './modules/example'
import routeReducer from './modules/route'
import userReducer from './modules/user'

const store = configureStore({
  reducer: {
    route: routeReducer,
    example: exampleReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // 开启thunk
      thunk: true,
      // 关闭序列化检查
      serializableCheck: false,
    }),
  // 添加 DevTools 配置
  devTools: {
    // 指定扩展配置
    trace: true, // 允许追踪 action 调用栈
    traceLimit: 25, // 限制追踪调用栈深度
    name: 'My App Store', // 应用名称显示在 DevTools 中

    // 可选：仅在开发环境启用
    // enable: process.env.NODE_ENV !== 'production'
  },
})

export type IRootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
