import type { ILoginInfo } from "@/api/type";
import type { DispatchType } from '@/redux'

export interface IUserState {
  userRole: string[]; // 用户角色
  permissions: string[]; // 权限列表 *:*:* 所有权限
  loading: boolean;
  userInfo: ILoginInfo | null;
}

export interface IThunkUserState {
  state: IUserState
  dispatch: DispatchType
}
