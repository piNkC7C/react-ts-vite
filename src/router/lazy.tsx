import React from 'react'
import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'

import { Spin } from 'antd'

import { dynamicImport } from '@/utils/dynamicImport'

function Lazy(path: string): ReactNode {
  const Lazy = lazy(dynamicImport(path))
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <Spin />
        </div>
      }
    >
      <Lazy />
    </Suspense>
  )
}
export default Lazy
