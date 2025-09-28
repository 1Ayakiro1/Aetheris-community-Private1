import { ref } from 'vue'
import apiClient from '@/api/axios'

interface LoginData {
    username: string
    password: string
}

export function useAuth() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    const clearError = () => {
        error.value = null
    }

    const register = async (data: LoginData) => {
        loading.value = true
        clearError()

        try {
            // Обрезаем пароль до 72 символов перед отправкой
            const payload = {
                username: data.username,
                password: data.password.slice(0, 72),
            }
            const response = await apiClient.post('/register', payload)
            loading.value = false
            return response.data
        } catch (err: any) {
            loading.value = false
            error.value = err.response?.data?.detail || 'Registration failed'
            throw err
        }
    }

    const login = async (data: LoginData) => {
        loading.value = true
        clearError()

        try {
            const payload = {
                username: data.username,
                password: data.password.slice(0, 72),
            }
            const response = await apiClient.post('/login', payload)
            loading.value = false
            // Сохраняем токен или user id, если нужно
            localStorage.setItem('token', response.data.access_token || '')
            return response.data
        } catch (err: any) {
            loading.value = false
            error.value = err.response?.data?.detail || 'Login failed'
            throw err
        }
    }

    return { register, login, loading, error, clearError }
}
