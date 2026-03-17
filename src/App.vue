<script setup lang="ts">
import {
  NButton,
  NConfigProvider,
  NSelect,
  NSpace,
  dateEnUS,
  dateZhCN,
  enUS,
  zhCN,
  type SelectOption,
} from 'naive-ui'
import { useTheme } from './composables/useTheme'
import { useUiStore, type AppLocaleMode, type AppThemeMode } from './stores/ui'

const uiStore = useUiStore()
const { t, locale } = useI18n()
const { theme, themeOverrides } = useTheme()
// const {API_DEMO_GET} = useRequest()

const languageOptions = computed<SelectOption[]>(() => [
  { label: t('app.system'), value: 'system' },
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
])

const themeOptions = computed<SelectOption[]>(() => [
  { label: t('app.system'), value: 'system' },
  { label: t('app.light'), value: 'light' },
  { label: t('app.dark'), value: 'dark' },
])

const naiveLocale = computed(() => (uiStore.locale === 'zh' ? zhCN : enUS))
const naiveDateLocale = computed(() => (uiStore.locale === 'zh' ? dateZhCN : dateEnUS))
const containerClass = computed(() =>
  uiStore.isDark ? 'min-h-screen bg-black text-neutral-100' : 'min-h-screen bg-slate-50 text-slate-900'
)
const headerClass = computed(() =>
  uiStore.isDark
    ? 'border-b border-neutral-800 bg-black/90'
    : 'border-b border-slate-200 bg-white/90'
)

watch(
  () => uiStore.locale,
  (value) => {
    locale.value = value
  },
  { immediate: true }
)

onMounted(() => {
  uiStore.initSystemPreferences()
  // API_DEMO_GET({a:1}).then(res => {
  //   console.log(res);
  // })
})

const handleLocaleModeChange = (value: string) => {
  uiStore.setLocaleMode(value as AppLocaleMode)
}

const handleThemeModeChange = (value: string) => {
  uiStore.setThemeMode(value as AppThemeMode)
}
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
  >
    <div :class="containerClass">
      <header :class="headerClass">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 class="text-lg font-semibold">{{ t('app.title') }}</h1>
          <div class="flex items-center gap-3">
            <div class="w-28">
              <n-select
                size="small"
                :value="uiStore.localeMode"
                :options="languageOptions"
                @update:value="handleLocaleModeChange"
              />
            </div>
            <div class="w-28">
              <n-select
                size="small"
                :value="uiStore.themeMode"
                :options="themeOptions"
                @update:value="handleThemeModeChange"
              />
            </div>
          </div>
          <nav>
            <n-space>
            <router-link to="/">
              <n-button quaternary type="primary">{{ t('app.navHome') }}</n-button>
            </router-link>
            <router-link to="/about">
              <n-button quaternary>{{ t('app.navAbout') }}</n-button>
            </router-link>
            </n-space>
          </nav>
        </div>
      </header>
      <main class="mx-auto max-w-5xl px-6 py-8">
        <router-view />
      </main>
    </div>
  </n-config-provider>
</template>
