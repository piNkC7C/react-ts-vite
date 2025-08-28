// 地区树
export type IAreaTree = {
  id: string
  name: string
  children: IAreaTree[]
}

// 获取详情
export type IDetailRequest = {
  id: number // 主键ID
}

// 公共的分页返回
export type IPageResponse<T> = {
  list: T[] // 列表
  total: number // 总数
}

// 员工信息
export type IStaffInfo = {
  id: number // 员工ID
  employeeNo: string // 员工编号
  username: string // 员工编号
  nickname: string // 员工姓名
  status: 0 | 1 // 员工状态 0:启用 1:禁用
  mobile: string // 员工手机号
  deptName: string // 员工部门名称
  staffPositionName: string // 员工职位名称
  idType:
    | 'ID_CARD'
    | 'PASSPORT'
    | 'MILITARY_ID'
    | 'OTHER' // 证件类型 ID_CARD:身份证 PASSPORT:护照 MILITARY_ID:军官证 OTHER:其他
  idNumber: string // 证件号码
  hireDate: number[] // 入职时间
  hireTime: number | undefined // 入职时间戳
  createTime: number // 员工创建时间戳
  staffUpdateTime: number // 员工更新时间戳
  staffDeleteTime: number // 员工删除时间戳
  sex?: 0 | 1 | 2 // 员工性别 0:保密 1:男 2:女
  education?:
    | 'DOCTOR'
    | 'MASTER'
    | 'BACHELOR'
    | 'COLLEGE'
    | 'HIGH_SCHOOL'
    | 'OTHER' // 学历 DOCTOR:博士 MASTER:硕士 BACHELOR:本科 COLLEGE:专科 HIGH_SCHOOL:高中 OTHER：其他
  marriageStatus?:
    | 'SINGLE'
    | 'MARRIED'
    | 'DIVORCED'
    | 'WIDOWED' // 婚姻状态 STAFF_MARRIAGE_STATUS
  email?: string // 邮箱
  remark?: string // 备注
  password?: string // 密码
}
