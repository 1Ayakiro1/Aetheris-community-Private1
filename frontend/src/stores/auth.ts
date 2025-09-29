import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { id?: number; username?: string },
        token: null as string | null,
        loading: false as boolean,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token: string | null) {
            this.token = token
            if (token) localStorage.setItem('auth.token', token)
            else localStorage.removeItem('auth.token')
        },
        setUser(user: any | null) {
            this.user = user
            if (user) localStorage.setItem('auth.user', JSON.stringify(user))
            else localStorage.removeItem('auth.user')
        },
        logout() {
            this.setToken(null)
            this.setUser(null)
            router.push('/login')
        },
        tryRestoreFromStorage() {
            const token = localStorage.getItem('auth.token')
            const userRaw = localStorage.getItem('auth.user')
            if (token) this.token = token
            if (userRaw) {
                try { this.user = JSON.parse(userRaw) } catch { this.user = null }
            }
        }
    }
})
