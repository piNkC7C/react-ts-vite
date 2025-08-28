import React from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = _props => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">登录</div>
    </>
  )
}

export default Login
