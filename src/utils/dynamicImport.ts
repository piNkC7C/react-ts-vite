import type { ComponentType } from 'react'

/**
 * 动态导入工具函数
 * 使用 Vite 的 glob 导入来支持动态路由加载
 */

// 使用 Vite 的 glob 导入预加载所有视图组件
const modules = import.meta.glob('../views/**/index.tsx')

/**
 * 动态导入视图组件
 * @param path 组件路径，相对于 views 目录
 * @returns Promise<Component>
 */
export const dynamicImport = (path: string): (() => Promise<{ default: ComponentType }>) => {
  const modulePath = `../views/${path}/index.tsx`
  const moduleLoader = modules[modulePath]
  
  if (!moduleLoader) {
    console.error(`Module not found: ${modulePath}`)
    console.warn('Available modules:', Object.keys(modules))
    return () => Promise.reject(new Error(`Module not found: ${modulePath}`))
  }
  
  return moduleLoader as () => Promise<{ default: ComponentType }>
}

/**
 * 获取所有可用的模块路径
 * @returns 所有可用模块的路径数组
 */
export const getAvailableModules = (): string[] => {
  return Object.keys(modules).map(path => {
    // 将 '../views/Login/index.tsx' 转换为 'Login'
    const match = path.match(/\.\.\/views\/([^/]+)\/index\.tsx$/)
    return match ? match[1] : ''
  }).filter(Boolean)
}

/**
 * 检查模块是否存在
 * @param path 组件路径
 * @returns boolean
 */
export const moduleExists = (path: string): boolean => {
  const modulePath = `../views/${path}/index.tsx`
  return modulePath in modules
}