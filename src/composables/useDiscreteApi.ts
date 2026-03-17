import { createDiscreteApi, dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
import { Icon } from '@iconify/vue'
import phInfo from '@iconify-icons/ph/info'
import phSealCheck from '@iconify-icons/ph/seal-check'
import phWarning from '@iconify-icons/ph/warning'
import phXSquare from '@iconify-icons/ph/x-square'
import { computed, h } from 'vue'

import { useTheme } from './useTheme'
import { useUiStore } from '@/stores/ui'

import type { ConfigProviderProps } from 'naive-ui'

export function getConfigProviderProps() {
  const { theme, themeOverrides } = useTheme()
  const uiStore = useUiStore()

  const configProviderProps = computed<ConfigProviderProps>(() => ({
    locale: uiStore.locale === 'zh' ? zhCN : enUS,
    dateLocale: uiStore.locale === 'zh' ? dateZhCN : dateEnUS,
    theme: theme.value,
    themeOverrides: themeOverrides.value,
    icons: {
      info: () => h(Icon, { icon: phInfo, class: 'size-full' }),
      success: () => h(Icon, { icon: phSealCheck, class: 'size-full' }),
      warning: () => h(Icon, { icon: phWarning, class: 'size-full' }),
      error: () => h(Icon, { icon: phXSquare, class: 'size-full' }),
    },
  }))

  return configProviderProps
}

export function useDiscreteApi() {
  const configProviderProps = getConfigProviderProps()

  return createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar', 'modal'], {
    configProviderProps,
    notificationProviderProps: {
      placement: 'bottom-left',
    },
  })
}
