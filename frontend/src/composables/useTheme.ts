import { ref, watch } from 'vue'

const themes = {
  light: {
    '--bg-primary': '#E5E7EB',
    '--bg-secondary': '#FFFFFF',
    '--btn-primary': '#E5E7EB',
    '--text-primary': '#111827',
    '--text-secondary': '#1A202C',
    '--primary-violet': '#8C00FF',
    '--primary-pink': '#EE00FF',
    '--primary-blue': '#505BE5',
    '--white': '#FFFFFF'
  },
  dark: {
    '--bg-primary': '#000000',
    '--bg-secondary': '#101013',
    '--btn-primary': '#222329',
    '--text-primary': '#ECF9FB',
    '--text-secondary': '#B0BAC5',
    '--primary-violet': '#8C00FF',
    '--primary-pink': '#EE00FF',
    '--primary-blue': '#505BE5',
    '--white': '#FFFFFF'
  },
  pastel_aquamarine: {
    '--bg-primary': '#16181C',
    '--bg-secondary': '#26292F',
    '--btn-primary': '#434956',
    '--text-primary': '#ECF9FB',
    '--text-secondary': '#5A6272',
    '--primary-violet': '#8C00FF',
    '--primary-pink': '#EE00FF',
    '--primary-blue': '#505BE5',
    '--white': '#FFFFFF'
  }
}

const currentTheme = ref(localStorage.getItem('theme') || 'light')

export function useTheme() {
  const setTheme = (themeName: string) => {
    if (!themes[themeName]) return
    
    currentTheme.value = themeName
    localStorage.setItem('theme', themeName)
    
    const root = document.documentElement
    const theme = themes[themeName]
    
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
  }

  const getAvailableThemes = () => Object.keys(themes)
  
  const getCurrentTheme = () => currentTheme.value

  // Инициализация темы при загрузке
  watch(currentTheme, (newTheme) => {
    setTheme(newTheme)
  }, { immediate: true })

  return {
    setTheme,
    getAvailableThemes,
    getCurrentTheme,
    currentTheme
  }
}
