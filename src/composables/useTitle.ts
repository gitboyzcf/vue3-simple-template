import { onMounted } from 'vue'

export function useTitle(title: string) {
  onMounted(() => {
    document.title = title
  })
}
