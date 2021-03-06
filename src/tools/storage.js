export const KEY_LOGIN_INFO = 'KEY_LOGIN_INFO'
export const KEY_USER_TOKEN = 'KEY_USER_TOKEN'
export const KEY_FAMI_CONFIG = 'KEY_FAMI_CONFIG'

export const session = {
  save (key, item) {
    if (!window.sessionStorage) {
      console.warn('當前瀏覽器不支持sessionStorage')
      return null
    }
    if (typeof item === 'object') {
      window.sessionStorage.setItem(key, JSON.stringify(item))
    } else {
      window.sessionStorage.setItem(key, item)
    }
  },
  get (key, isObject = false) {
    if (!window.sessionStorage) {
      console.warn('當前瀏覽器不支持sessionStorage')
      return null
    }
    const str = window.sessionStorage.getItem(key)
    return str ? (isObject ? JSON.parse(str) : str) : null
  }
}

export const local = {
  save (key, item) {
    if (!window.localStorage) {
      console.warn('當前瀏覽器不支持localStorage')
      return null
    }
    if (typeof item === 'object') {
      window.localStorage.setItem(key, JSON.stringify(item))
    } else {
      window.localStorage.setItem(key, item)
    }
  },
  get (key, isObject = false) {
    if (!window.localStorage) {
      console.warn('當前瀏覽器不支持localStorage')
      return null
    }
    const str = window.localStorage.getItem(key)
    return str ? (isObject ? JSON.parse(str) : str) : null
  },
  remove (key) {
    if (!window.localStorage) {
      console.warn('當前瀏覽器不支持localStorage')
      return null
    }
    window.localStorage.removeItem(key)
  }
}
