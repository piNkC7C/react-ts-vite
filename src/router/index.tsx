import Lazy from './lazy'
import type { IRoute } from '@/redux/types/route'
import { ROUTE_KEY, ROUTE_PATH, ROUTE_ELEMENT_PATH, ROUTE_KEY_TOP } from '@/constants'

const routes: IRoute[] = [
  {
    key: ROUTE_KEY.NOT_FOUND,
    parentKey: ROUTE_KEY_TOP,
    order: -1,
    type: -1,
    path: ROUTE_PATH.NOT_FOUND,
    hideInMenu: true,
    element: Lazy(ROUTE_ELEMENT_PATH.NOT_FOUND)
  },
  {
    key: ROUTE_KEY.LOGIN,
    parentKey: ROUTE_KEY_TOP,
    order: -1,
    type: -1,
    path: ROUTE_PATH.LOGIN,
    hideInMenu: true,
    element: Lazy(ROUTE_ELEMENT_PATH.LOGIN)
  },
]

export default routes
