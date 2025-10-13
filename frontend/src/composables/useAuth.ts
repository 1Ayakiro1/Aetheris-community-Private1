import { ref } from 'vue'
import apiClient from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
    const store = useAuthStore()
    const loading = ref(false)
    const error = ref<string | null>(null)

    const clearError = () => { error.value = null }

    const register = async (username: string, password: string) => {
        loading.value = true
        clearError()
        try {
            const payload = { username, password: password.slice(0, 72) }
            const res = await apiClient.post('/register', payload)
            return res.data
        } catch (err: any) {
            error.value = err.response?.data?.detail || err.message || 'Registration failed'
            throw err
        } finally {
            loading.value = false
        }
    }

    const login = async (username: string, password: string) => {
        loading.value = true
        clearError()
        try {
            const payload = { username, password: password.slice(0, 72) }
            const res = await apiClient.post('/login', payload)
            const token = res.data?.access_token ?? res.data?.token ?? null
            const user = res.data?.user ?? null

            if (token) store.setToken(token)
            if (user) store.setUser(user)
            else await store.fetchMe()

            return res.data
        } catch (err: any) {
            error.value = err.response?.data?.detail || err.message || 'Login failed'
            throw err
        } finally {
            loading.value = false
        }
    }

    const me = async () => {
        loading.value = true
        clearError()
        try {
            return await store.fetchMe()
        } finally {
            loading.value = false
        }
    }

    return { register, login, me, loading, error, clearError }
}
