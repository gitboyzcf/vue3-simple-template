import { validator } from './utils'

import type { demoT } from './modules/demo'

// 所有接口类型, 需要在modules下的ts文件中导出, 在ApiType上添加合并 type ApiType = demoT & xxx
// 在vue文件中使用时具有提示作用
type ApiType = demoT
const map: Record<string, any> = {}
const isDev = import.meta.env.MODE === 'development'

const generators = (files = import.meta.glob('./modules/**/*.ts', { eager: true })) => {
  return Object.keys(files).map((key) => {
    return (files as Record<string, any>)[key].default
  })
}
generators().forEach((generator: any) => {
  for (const key in generator) {
    if (isDev) {
      validator(key)
    }

    if (!Object.prototype.hasOwnProperty.call(map, key)) {
      map[key] = generator[key]
    } else {
      if (isDev) {
        console.error(new Error(`API modules模块下 ${key} 接口名重复`))
      }

      continue
    }
  }
})

export function useRequest() {
  return map as ApiType
}

export default map as ApiType
