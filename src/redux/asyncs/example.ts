import { createAsyncThunk } from '@reduxjs/toolkit'

import type { IExampleRequest } from '@/api/type'

import { setExampleData, setExampleLoading } from '../modules/example'
import type { IThunkExampleState } from '../types/example'

// 修改泛型类型：第一个参数是返回数据的类型，而不是void
export const getExampleAsync = createAsyncThunk<
  void, // 返回的数据类型，你可以根据实际API返回类型调整
  IExampleRequest,
  IThunkExampleState
>('example/getExampleAsync', async (queryData, { dispatch }) => {
  dispatch(setExampleLoading(true))
  // 在此请求接口获取数据
  const res = {
    success: true,
    data: {
      id: 1,
      name: 'test',
    },
    errMsg: 'test',
  }
  if (res.success) {
    // 请求成功
    // 设置数据
    dispatch(setExampleData(res.data))
    // 设置等待状态
    dispatch(setExampleLoading(false))
  } else {
    // 设置数据
    dispatch(setExampleData(null))
    // 设置等待状态
    dispatch(setExampleLoading(false))
  }
})
