<script setup lang="ts">
import { NCard } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <n-card :title="t('about.title')" size="large" class="shadow-sm">
    <p class="text-slate-600">{{ t('about.description') }}</p>
  </n-card>
</template>