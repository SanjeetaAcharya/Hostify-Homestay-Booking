import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
  initTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false, // DEFAULT IS LIGHT
      
      toggleTheme: () => {
        const newTheme = !get().isDark
        
        if (typeof window !== 'undefined') {
          if (newTheme) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
        
        set({ isDark: newTheme })
      },
      
      initTheme: () => {
        const currentTheme = get().isDark
        if (typeof window !== 'undefined' && currentTheme) {
          document.documentElement.classList.add('dark')
        } else if (typeof window !== 'undefined') {
          document.documentElement.classList.remove('dark')
        }
      }
    }),
    {
      name: 'theme-storage',
    }
  )
)