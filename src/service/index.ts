// 组件
import { Modal, message } from 'antd'

// 类型
import type { IResponseData } from '@/api/type'
// 常量
import { ROUTE_PARAM_NAME, ROUTE_PATH, ROUTE_PATH_COMMON } from '@/constants'
// 工具函数
import { customParamsSerializer, encodeRedirectInfo, refreshToken } from '@/utils/auth'
import { getAccessToken, removeAccessToken, removeRefreshToken } from '@/utils/storge'

// 配置
import { SENIOR_TENANT_ID, SENIOR_TOKEN, TIME_OUT, VITE_BASE_URL } from './config'
import ZZRequest from './request'

// 是否正在刷新token
let isRefreshToken = false

// 等待队列 - 存储待重试的请求
interface PendingRequest {
  config: any
  resolve: (value: any) => void
  reject: (reason?: any) => void
  requestInstance: ZZRequest // 保存请求实例以便重试时使用相同的拦截器
}
const waitQueue: PendingRequest[] = []

// 处理token刷新逻辑
const handleTokenRefresh = async (originalRequest: any, requestInstance: ZZRequest) => {
  return new Promise((resolve, reject) => {
    // 将请求加入等待队列
    waitQueue.push({
      config: originalRequest,
      resolve,
      reject,
      requestInstance,
    })

    // 如果已经在刷新token，直接返回
    if (isRefreshToken) {
      return
    }

    // 开始刷新token
    isRefreshToken = true

    refreshToken()
      .then(newToken => {
        // 刷新成功，处理等待队列中的所有请求
        // console.log('Token刷新成功，重试等待队列中的请求')

        // 为所有等待的请求更新token并重试
        waitQueue.forEach(({ config, resolve, reject, requestInstance }) => {
          config.headers = config.headers || {}
          config.headers['Authorization'] = `Bearer ${newToken}`

          // 使用原始的请求实例重新发起请求，确保经过相同的拦截器处理
          requestInstance.instance.request(config).then(resolve).catch(reject)
        })

        // 清空等待队列
        waitQueue.length = 0
      })
      .catch(error => {
        console.log('Token刷新失败:', error)

        // 刷新失败，拒绝所有等待的请求
        waitQueue.forEach(({ reject }) => {
          reject(error)
        })

        // 清空等待队列
        waitQueue.length = 0

        // 清除token
        removeAccessToken()
        removeRefreshToken()
        // 若当前路由为登录页，不跳转登录页
        const pathname = window.location.pathname.split('?')[0]
        if (ROUTE_PATH_COMMON.includes(pathname)) {
          return
        }
        // 使用Modal静态方法显示提示框
        Modal.info({
          title: '登录已过期',
          content: '登录已过期，请重新登录',
          okText: '确定',
          onOk: () => {
            // 获取当前位置信息并编码
            const currentLocation = {
              pathname: window.location.pathname,
              search: window.location.search,
              hash: window.location.hash,
              state: null,
              key: 'default',
            }
            // console.log('currentLocation', currentLocation);
            const encodedRedirectInfo = encodeRedirectInfo(currentLocation)

            // 跳转到登录页面
            const loginUrl = `${ROUTE_PATH.LOGIN}?${ROUTE_PARAM_NAME.REDIRECT_INFO}=${encodedRedirectInfo}`
            window.location.href = loginUrl
          },
        })
      })
      .finally(() => {
        // 重置刷新状态
        isRefreshToken = false
      })
  })
}

// 定义更明确的类型
interface ICreateRequestArgs {
  paramsSerializer?: boolean // 是否需要参数序列化
  // 其他配置选项
}

const createRequest = (baseURL: string, headerAuth?: string, ...args: ICreateRequestArgs[]) => {
  // 合并所有配置选项
  const mergedArgs = Object.assign({}, ...args)

  const requestInstance = new ZZRequest({
    baseURL,
    timeout: TIME_OUT,
    interceptors: {
      // 请求拦截器 - 自动携带访问令牌
      requestSuccessFn(config: any) {
        // 设置请求头
        config.headers = config.headers || {}
        config.headers['tenant-id'] = SENIOR_TENANT_ID
        // 设置token
        const token = getAccessToken()
        if (token || headerAuth) {
          config.headers['Authorization'] = `Bearer ${token || headerAuth}`
        }
        // 需要参数序列化
        if (mergedArgs.paramsSerializer) {
          return customParamsSerializer(config)
        }
        return config
      },
      requestFailureFn(error) {
        console.log('请求失败', error)
        let errMsg
        switch (error.status) {
          case 500:
            // 处理系统异常情况
            message.error('系统异常')
            errMsg = '系统异常'
            break
          default:
            // 处理其他错误情况
            message.error(error.message || '接口请求失败')
            errMsg = error.message || '接口请求失败'
            break
        }
        // 继续抛出错误，以便在业务代码中可以继续捕获
        return Promise.reject({
          success: false,
          data: null,
          errMsg,
        })
      },
      responseSuccessFn(response: any) {
        const res: IResponseData<any> = response.data
        switch (res.code) {
          // 成功
          case 0:
            // console.log('响应成功', res)
            // 统一的前端接口返回格式
            return {
              success: true,
              data: res.data,
            }
          // 成功
          case 200:
            // console.log('响应成功', res)
            // 统一的前端接口返回格式
            return {
              success: true,
              data: res.data,
            }
          // 登录过期/权限不足 - 使用原始请求配置进行token刷新
          case 401:
            return handleTokenRefresh(response.config, requestInstance)
          // 其他失败情况
          default:
            message.error(res.msg || '接口响应失败')
            return {
              success: false,
              data: res.data,
              errMsg: res.msg || '响应失败',
            }
        }
      },
      responseFailureFn(error) {
        console.log('响应失败', error)
        let errMsg
        switch (error.status) {
          case 500:
            // 处理系统异常情况
            message.error('系统异常')
            errMsg = '系统异常'
            break
          case 400:
            message.error('接口响应失败')
            errMsg = '接口响应失败'
            break
          default:
            // 处理其他错误情况
            message.error(error.message || '接口响应失败')
            errMsg = error.message || '接口响应失败'
            break
        }
        // 继续抛出错误，以便在业务代码中可以继续捕获
        return Promise.reject({
          success: false,
          data: null,
          errMsg,
        })
      },
    },
  })

  return requestInstance
}

const baseRequest = createRequest(VITE_BASE_URL)
const adminRequest = createRequest(VITE_BASE_URL, undefined, {
  paramsSerializer: true,
})
const seniorRequest = createRequest(VITE_BASE_URL, SENIOR_TOKEN, {
  paramsSerializer: true,
})

export { baseRequest, adminRequest, seniorRequest }
