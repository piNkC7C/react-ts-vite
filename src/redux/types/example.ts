import type { IExampleResponse } from '@/api/type'
import type { DispatchType } from '@/redux'

export interface IExampleState {
  data: IExampleResponse | null
  loading: boolean
}

export interface IThunkExampleState {
  state: IExampleState
  dispatch: DispatchType
}
