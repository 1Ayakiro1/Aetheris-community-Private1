import { defineStore } from 'pinia'
import router from '@/router'
import apiClient from '@/api/axios'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | User,
        token: null as string | null,
        loading: false as boolean,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdminLike: (state) => {
            const role = state.user?.role
            return role === 'moderator' || role === 'admin' || role === 'super_admin'
        },
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
        async fetchMe() {
            try {
                const resp = await apiClient.get('/auth/me')
                this.setUser(resp.data)
                return resp.data
            } catch (e) {
                // token invalid
                this.logout()
                throw e
            }
        },
        logout() {
            this.setToken(null)
            this.setUser(null)
            router.push('/login')
            try {
                document.dispatchEvent(new CustomEvent('app-toast', { detail: {
                    severity: 'info',
                    summaryKey: 'notifications.logout.success.summary',
                    detailKey: 'notifications.logout.success.detail',
                    life: 3500
                }}))
            } catch {}
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
