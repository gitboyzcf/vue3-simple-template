<script setup lang="ts">
import { Icon } from '@iconify/vue'
import mdiGithub from '@iconify-icons/mdi/github'
import phSparkle from '@iconify-icons/ph/sparkle'
import { ColorPaletteOutline, LogoGithub, NotificationsOutline } from '@vicons/ionicons5'
import { NButton, NCard, NIcon, NTag } from 'naive-ui'
import { useCounterStore } from '../stores/counter'
import { useMessageDiscrete, useModalDiscrete, useNotificationDiscrete } from '../utils/discreteApi'

const counterStore = useCounterStore()
const { t } = useI18n()

const showMessage = () => {
  useMessageDiscrete(t('discrete.notificationContent'), 'info')
}

const showModal = () => {
  useModalDiscrete(t('discrete.notificationMeta'), 'info')
}

const showNotification = () => {
  useNotificationDiscrete('success')
}
</script>

<template>
  <n-card :title="t('home.ready')" size="large" class="shadow-sm">
    <div class="space-y-4">
      <p class="text-slate-600">
        {{ t('home.stack') }}：<n-tag type="success">Vue 3 + TypeScript + Vite</n-tag>
      </p>
      <p class="text-slate-600">
        {{ t('home.modules') }}：<n-tag type="info">Pinia + Vue Router + Naive UI + Tailwind CSS</n-tag>
      </p>
      <div class="flex items-center gap-3">
        <n-button type="primary" @click="counterStore.increment">{{ t('home.increment') }}</n-button>
        <n-tag :bordered="false" type="warning">{{ t('home.count') }}: {{ counterStore.count }}</n-tag>
      </div>
      <div class="space-y-2">
        <p class="text-slate-600">{{ t('home.discreteDemo') }}</p>
        <div class="flex flex-wrap items-center gap-3">
          <n-button secondary @click="showMessage">{{ t('home.showMessage') }}</n-button>
          <n-button secondary @click="showModal">{{ t('home.showModal') }}</n-button>
          <n-button secondary @click="showNotification">{{ t('home.showNotification') }}</n-button>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-slate-600">{{ t('home.iconDemo') }}</p>
        <div class="flex flex-wrap items-center gap-3">
          <n-button secondary>
            <template #icon>
              <Icon :icon="mdiGithub" class="text-base" />
            </template>
            {{ t('home.iconifyDemo') }}
          </n-button>

          <n-button secondary>
            <template #icon>
              <n-icon :component="LogoGithub" class="text-base" />
            </template>
            {{ t('home.naiveIconDemo') }}
          </n-button>

          <div class="flex items-center gap-2 rounded border border-slate-300 px-3 py-1.5 dark:border-slate-700">
            <Icon :icon="phSparkle" class="text-purple-500" />
            <n-icon :component="ColorPaletteOutline" class="text-blue-500" />
            <n-icon :component="NotificationsOutline" class="text-amber-500" />
          </div>

          <div class="flex items-center gap-2 rounded border border-slate-300 px-3 py-1.5 dark:border-slate-700">
            <span class="icon-[mdi--github] size-5 text-slate-700 dark:text-slate-200" />
            <span class="icon-[ph--sparkle] size-5 text-purple-500" />
            <span class="text-xs text-slate-500">{{ t('home.iconClassDemo') }}</span>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>