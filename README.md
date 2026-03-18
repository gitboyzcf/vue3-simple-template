# Vue 3 工程模板

技术栈：Vue 3 + TypeScript + Vite + Pinia + Vue Router + Naive UI + Tailwind CSS + pnpm

📦开箱即用

![结果](./public/image.png)

## 环境要求

- Node.js：`^20.19.0 || >=22.12.0`
- pnpm：`>=9`
- 包管理器：仅允许使用 `pnpm`（已在 `preinstall` 中强制校验）

## 相关依赖

| 分类 | 包名 | 当前版本 | 说明 |
| --- | --- | --- | --- |
| 核心框架 | `vue` | `^3.5.30` | Vue 3 核心 |
| 路由 | `vue-router` | `^4.6.4` | 页面路由管理 |
| 状态管理 | `pinia` | `^3.0.4` | 全局状态管理 |
| 国际化 | `vue-i18n` | `^11.3.0` | 多语言支持 |
| UI 组件库 | `naive-ui` | `^2.44.1` | 基础业务组件 |
| 组合式工具 | `@vueuse/core` | `^14.2.1` | 常用 hooks 集合 |
| HTTP 请求 | `axios` | `^1.13.6` | 接口请求封装 |
| 构建工具 | `vite` | `^8.0.0` | 开发与构建 |
| Vue 构建插件 | `@vitejs/plugin-vue` | `^6.0.5` | Vue SFC 支持 |
| TypeScript | `typescript` | `~5.9.3` | 类型系统 |
| Vue TS 检查 | `vue-tsc` | `^3.2.5` | Vue 类型检查 |
| 代码规范 | `eslint` | `^9.39.4` | 代码检查 |
| 代码格式化 | `prettier` | `^3.8.1` | 代码格式化 |
| 样式框架 | `tailwindcss` | `^4.2.1` | 原子化 CSS |

## 启动与构建

```bash
pnpm dev
pnpm build
pnpm preview
```

## 代码规范

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## 自动导入（unplugin-auto-import）

项目已接入 `unplugin-auto-import`，用于自动导入常用 API 和 `src/api` 目录导出。

### 已自动导入的 API

- `vue`：如 `ref`、`computed`、`watch`、`onMounted`
- `vue-router`：如 `useRouter`、`useRoute`
- `pinia`：如 `defineStore`、`storeToRefs`、`createPinia`
- `vue-i18n`：`useI18n`

### 已自动扫描的目录

- `src/api`

也就是说，`src/api` 中导出的函数可以在组件或 TS 文件中直接使用，不必手动 `import`。

### 配置位置

- [vite.config.ts](vite.config.ts)
- 生成声明文件：`auto-imports.d.ts`

### 示例

以前需要这样写：

```ts
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
```

现在可以直接写：

```ts
const { t } = useI18n()

const state = computed(() => 'ready')

onMounted(() => {
    console.log(state.value)
})
```

如果你在 `src/api/demo.ts` 中导出：

```ts
export function getFeatureList() {
    return ['vue', 'pinia', 'router']
}
```

则在组件中可直接调用：

```ts
const features = getFeatureList()
```

## 目录结构

```text
src/
 api/           # 接口请求层
 composables/   # 组合式函数
 layouts/       # 布局组件
 router/        # 路由配置
 stores/        # Pinia 状态管理
 utils/         # 通用工具函数
 views/         # 页面视图
```

## 图标使用（Iconify + Naive UI + Tailwind，支持内网）

### 1. 安装依赖

```bash
pnpm add @iconify/vue @vicons/ionicons5 @iconify-icons/mdi @iconify-icons/ph
pnpm add -D @iconify/tailwind4 @iconify-json/mdi @iconify-json/ph
```

### 2. 启用 Tailwind 类名图标插件

在 `src/style.css` 中启用插件：

```css
@import 'tailwindcss';
@plugin '@iconify/tailwind4';
```

然后可直接用类名图标（离线可用）：

```html
<span class="icon-[mdi--github] size-5 text-slate-700"></span>
<span class="icon-[ph--sparkle] size-5 text-purple-500"></span>
```

### 3. Iconify 导入图标对象写法

不要直接写字符串图标名（如 `mdi:github`），而是导入图标对象，这样图标会被打进产物，不依赖外网 API。

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import mdiGithub from '@iconify-icons/mdi/github'
</script>

<template>
 <Icon :icon="mdiGithub" class="text-xl text-slate-700 dark:text-slate-200" />
</template>
```

### 4. Naive UI 离散 API 图标注入（Iconify）

```ts
import { Icon } from '@iconify/vue'
import phInfo from '@iconify-icons/ph/info'

icons: {
 info: () => h(Icon, { icon: phInfo, class: 'size-full' })
}
```

### 5. 在 Naive UI 中使用图标集合（@vicons）

```vue
<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { LogoGithub } from '@vicons/ionicons5'
</script>

<template>
 <n-button secondary>
  <template #icon>
   <n-icon :component="LogoGithub" class="text-base" />
  </template>
  GitHub
 </n-button>
</template>
```

### 6. 与 Tailwind 联合使用建议

- 尺寸：`text-sm` `text-base` `text-lg` `text-xl`
- 颜色：`text-slate-600` `text-blue-500` `text-purple-500`
- 间距布局：`flex items-center gap-2`

当前项目示例位置：

- [Home 示例](src/views/HomeView.vue)
- [离散 API 图标注入](src/composables/useDiscreteApi.ts)
