import { getRefreshToken, setRefreshToken, setAccessToken } from "./storge"
import { refreshTokenAPI } from "@/api/login"
import type { Location } from "react-router-dom"

// 刷新token的API调用
export const refreshToken = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
        throw new Error('没有刷新令牌')
    }

    try {
        const result = await refreshTokenAPI(refreshToken)
        if (result.success) {
            // 保存新的token
            setRefreshToken(result.data.refreshToken)
            setAccessToken(result.data.accessToken)
            return result.data.accessToken
        } else {
            throw new Error(result.errMsg || '刷新令牌失败')
        }
    } catch (error) {
        console.log('刷新token失败:', error)
        throw error
    }
}

// 设置重定向信息
export const encodeRedirectInfo = (location: Location) => {
    return encodeURIComponent(JSON.stringify(location as Location))
}
// 获取重定向信息
export const decodeRedirectInfo = (encodedRedirectInfo: string) => {
    try {
        return JSON.parse(decodeURIComponent(encodedRedirectInfo)) as Location
    } catch (error) {
        console.log('解析重定向信息失败:', error)
        return null
    }
}

// 自定义参数序列化
export const customParamsSerializer = (config: any) => {
    if (config.params && config.method === 'get') {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            const part = encodeURIComponent(propName) + '='
            if (value !== null && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        const params = propName + '[' + key + ']';
                        const subPart = encodeURIComponent(params) + '='
                        url += subPart + encodeURIComponent(value[key]) + "&";
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    return config
}
