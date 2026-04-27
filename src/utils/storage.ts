/**
 * @Description: 本地存储
 * @Author zcf
 * @Date 2023-09-20 13:25
 * @E-mail boyzcf@qq.com
 */
import Cookies from "js-cookie";
const PREFIX = import.meta.env.VITE_APP_PREFIX

interface StorageBase {
  has: (key: string) => boolean
  get: (key: string) => string | null
  set: (key: string, value: string) => void
  remove: (key: string) => void
  clear: () => void
}

interface CookieSetOptions {
  expires?: number | Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  [property: string]: any
}

interface CookieStorage {
  has: (key: string) => boolean
  get: (key: string) => string | undefined
  set: (key: string, value: string, options?: CookieSetOptions) => void
  remove: (key: string, options?: CookieSetOptions) => void
}

interface StorageUtil {
  local: StorageBase
  session: StorageBase
  cookie: CookieStorage
}

const storage: StorageUtil = {
  local: {
    has: (key) => {
      return !!localStorage.getItem(`${PREFIX}${key}`)
    },
    get: (key) => {
      return localStorage.getItem(`${PREFIX}${key}`)
    },
    set: (key, value) => {
      localStorage.setItem(`${PREFIX}${key}`, value)
    },
    remove: (key) => {
      localStorage.removeItem(`${PREFIX}${key}`)
    },
    clear: () => {
      localStorage.clear()
    }
  },
  session: {
    has: (key) => {
      return !!sessionStorage.getItem(`${PREFIX}${key}`)
    },
    get: (key) => {
      return sessionStorage.getItem(`${PREFIX}${key}`)
    },
    set: (key, value) => {
      sessionStorage.setItem(`${PREFIX}${key}`, value)
    },
    remove: (key) => {
      sessionStorage.removeItem(`${PREFIX}${key}`)
    },
    clear: () => {
      sessionStorage.clear()
    }
  },
  cookie: {
    has: (key) => {
      return !!Cookies.get(`${PREFIX}${key}`)
    },
    get: (key) => {
      return Cookies.get(`${PREFIX}${key}`)
    },
    set: (key, value, options = {}) => {
      Cookies.set(`${PREFIX}${key}`, value, { ...options })
    },
    remove: (key, options = {}) => {
      Cookies.remove(`${PREFIX}${key}`, { ...options })
    }
  }
}

export default storage