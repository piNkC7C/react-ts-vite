import { createAsyncThunk } from '@reduxjs/toolkit'

import { getLoginInfoAPI } from '@/api/login'

import { setUserInfoAction, setUserLoadingAction, setUserRoleAction } from '../modules/user'
import type { IThunkUserState } from '../types/user'

// 修改泛型类型：第一个参数是返回数据的类型，而不是void
export const getLoginInfoAsync = createAsyncThunk<
  void, // 返回的数据类型，你可以根据实际API返回类型调整
  undefined,
  IThunkUserState
>('staff/getLoginInfoAsync', async (_, { dispatch }) => {
  // 在此请求接口获取数据
  const res = await getLoginInfoAPI()
  if (res.success) {
    // 请求成功
    // 设置数据
    dispatch(setUserInfoAction(res.data))
    // 设置等待状态
  } else {
    // 设置数据
    dispatch(setUserInfoAction(null))
  }
})
