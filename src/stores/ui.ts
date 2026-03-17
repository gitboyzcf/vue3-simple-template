import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export type AppTheme = 'light' | 'dark'
export type AppLocale = 'zh' | 'en'
export type AppThemeMode = AppTheme | 'system'
export type AppLocaleMode = AppLocale | 'system'

const STORAGE_THEME_KEY = 'theme-mode'
const STORAGE_LOCALE_KEY = 'locale-mode'
const STORAGE_THEME_COLOR_KEY = 'theme-color'

const resolveSystemLocale = (): AppLocale => {
  if (typeof navigator === 'undefined') {
    return 'zh'
  }

  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const readStorageValue = <T extends string>(key: string, values: readonly T[], fallback: T): T => {
  const value = localStorage.getItem(key) as T | null
  return value && values.includes(value) ? value : fallback
}

export const useUiStore = defineStore('ui', () => {
  const themeMode = ref<AppThemeMode>(readStorageValue(STORAGE_THEME_KEY, ['system', 'light', 'dark'], 'system'))
  const localeMode = ref<AppLocaleMode>(readStorageValue(STORAGE_LOCALE_KEY, ['system', 'zh', 'en'], 'system'))
  const themeColor = ref(localStorage.getItem(STORAGE_THEME_COLOR_KEY) ?? '#4D7CFF')
  const systemDark = ref(false)
  const systemLocale = ref<AppLocale>(resolveSystemLocale())

  const theme = computed<AppTheme>(() =>
    themeMode.value === 'system' ? (systemDark.value ? 'dark' : 'light') : themeMode.value
  )
  const locale = computed<AppLocale>(() => (localeMode.value === 'system' ? systemLocale.value : localeMode.value))
  const isDark = computed(() => theme.value === 'dark')

  let mediaQuery: MediaQueryList | null = null
  let mediaQueryListener: (() => void) | null = null

  const initSystemPreferences = () => {
    systemLocale.value = resolveSystemLocale()

    if (typeof window === 'undefined' || mediaQuery) {
      return
    }

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = mediaQuery.matches
    mediaQueryListener = () => {
      systemDark.value = mediaQuery?.matches ?? false
    }
    mediaQuery.addEventListener('change', mediaQueryListener)
  }

  const setThemeMode = (value: AppThemeMode) => {
    themeMode.value = value
  }

  const setLocaleMode = (value: AppLocaleMode) => {
    localeMode.value = value
  }

  const setThemeColor = (value: string) => {
    themeColor.value = value
  }

  watch(themeMode, (value) => {
    localStorage.setItem(STORAGE_THEME_KEY, value)
  })

  watch(localeMode, (value) => {
    localStorage.setItem(STORAGE_LOCALE_KEY, value)
  })

  watch(themeColor, (value) => {
    localStorage.setItem(STORAGE_THEME_COLOR_KEY, value)
  })

  return {
    themeMode,
    localeMode,
    theme,
    locale,
    themeColor,
    isDark,
    initSystemPreferences,
    setThemeMode,
    setLocaleMode,
    setThemeColor,
  }
})