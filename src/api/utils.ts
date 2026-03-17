import { useMessageDiscrete } from '@/utils/discreteApi'
// 请求状态错误
export const httpLogError = (error: any, msg: string) => {
  error.message = msg
  useMessageDiscrete(msg, 'error')
}

// api请求错误
export const requestError = (response: any) => {
  const { data } = response
  const msg = `api请求出错 ${response.config.url}：${data.message}`
  useMessageDiscrete(msg, 'error')
  return Promise.reject(data)
}

// 登录失效
export const throttleToLogin = () => {}

export const validator = (key: string) => {
  if (!key.startsWith('API_')) {
    console.warn(`api名称必须以API_为开头,${key} 应改为 API_${key}`)
  }
}
