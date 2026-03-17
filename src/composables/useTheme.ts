import { merge } from 'lodash-es'
import { darkTheme, lightTheme } from 'naive-ui'
import { computed } from 'vue'

import { useUiStore } from '@/stores/ui'
import { commonThemeOverrides } from '@/theme/common'
import { baseDarkThemeOverrides } from '@/theme/dark'
import { baseLightThemeOverrides } from '@/theme/light'

export function useTheme() {
  const uiStore = useUiStore()

  const themeColor = computed(() => uiStore.themeColor)
  const isDark = computed(() => uiStore.isDark)

  const getLightThemeOverrides = (primaryColor = themeColor.value) => {
    return merge(commonThemeOverrides(primaryColor), baseLightThemeOverrides(primaryColor))
  }

  const getDarkThemeOverrides = (primaryColor = themeColor.value) => {
    return merge(commonThemeOverrides(primaryColor), baseDarkThemeOverrides(primaryColor))
  }

  const themeOverrides = computed(() => {
    return isDark.value
      ? getDarkThemeOverrides(themeColor.value)
      : getLightThemeOverrides(themeColor.value)
  })

  const theme = computed(() => {
    return isDark.value ? darkTheme : lightTheme
  })

  return {
    theme,
    themeOverrides,
    getLightThemeOverrides,
    getDarkThemeOverrides,
  }
}
