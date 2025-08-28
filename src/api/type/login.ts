import type { IStaffInfo } from './common'

// 用户名登录请求参数
export type ILoginRequest = {
  username: string // 用户名
  password: string // 密码
}

// 用户名登录响应参数
export type ILoginResponse = {
  userId: number // 用户ID
  accessToken: string // 访问令牌
  refreshToken: string // 刷新令牌
  expiresTime: number // 过期时间
}

// 角色
export type IRole = {
  id: string // 角色标识
  name: string // 角色名称
}

export type ILoginInfo = IStaffInfo & {
  roles: IRole[] // 角色列表
}

// 登录权限信息
export type ILoginPermissionInfo = {
  roles: string[] // 角色列表
}

// 发送验证码请求参数
export type ISendMobileCodeRequest = {
  mobile: string // 手机号
  scene: number // 场景
  captchaVerification?: string // 验证码
}

// 验证验证码请求参数
export type IVerifyMobileCodeRequest = {
  mobile: string // 手机号
  scene: number // 场景 23:重置密码 21:登录
  code: string // 验证码
}

// 重置密码请求参数
export type IResetPasswordRequest = {
  mobile: string // 手机号
  code: string // 验证码
  password: string // 新密码
}

// 手机号登录请求参数
export type IPhoneLoginRequest = {
  mobile: string // 手机号
  code: string // 验证码
}
