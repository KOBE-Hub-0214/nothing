import { ref, watchEffect } from 'vue'

const isDark = ref(true)

// Init from localStorage or system preference
const saved = localStorage.getItem('nothing-theme')
if (saved) {
  isDark.value = saved === 'dark'
} else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
  isDark.value = false
}

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
})

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem('nothing-theme', isDark.value ? 'dark' : 'light')
  }

  function colors() {
    const d = isDark.value
    return {
      text: d ? '#888' : '#666', grid: d ? '#222' : '#e5e5e5',
      primary: d ? '#fff' : '#1a1a1a', secondary: d ? '#1890ff' : '#0969da',
      green: d ? '#52c41a' : '#389e0d', orange: d ? '#fa8c16' : '#d46b08',
      purple: d ? '#722ed1' : '#531dab', cyan: d ? '#13c2c2' : '#08979c',
      pink: d ? '#eb2f96' : '#c41d7f', yellow: d ? '#fadb14' : '#d4b106',
      red: d ? '#ff4d4f' : '#e8453c', funnelLight: d ? '#d9d9d9' : '#bbb',
      tooltipBg: d ? '#1a1a1a' : '#fff', tooltipBorder: d ? '#333' : '#e5e5e5',
      tooltipText: d ? '#e0e0e0' : '#1a1a1a',
      areaStart: d ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.08)',
      areaEnd: d ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0)',
    }
  }

  return { isDark, toggle, colors }
}
