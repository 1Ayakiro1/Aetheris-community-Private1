/**
 * USE AUTH COMPOSABLE
 * Композиционная функция для управления аутентификацией
 * 
 * Автор: Ayakiro
 * Версия: 1.0
 * Дата создания: 18.09.2025
 */

import { ref, computed, readonly } from 'vue'
import { useRouter } from 'vue-router'
import { authApi, errorUtils, type ApiError } from '../services/api'
import type { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  ChangePasswordData,
  ForgotPasswordData,
  ResetPasswordData
} from '../types/user'

// Глобальное состояние аутентификации
const user = ref<User | null>(null)
const token = ref<string | null>(localStorage.getItem('auth_token'))
const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))
const loading = ref(false)
const error = ref<string | null>(null)
const initialized = ref(false)

export function useAuth() {
  const router = useRouter()

  // Вычисляемые свойства
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => !!error.value)
  const currentUser = computed(() => user.value)

  // Утилиты для работы с токенами
  const setTokens = (authToken: string, authRefreshToken?: string) => {
    token.value = authToken
    localStorage.setItem('auth_token', authToken)
    
    if (authRefreshToken) {
      refreshToken.value = authRefreshToken
      localStorage.setItem('refresh_token', authRefreshToken)
    }
  }

  const clearTokens = () => {
    token.value = null
    refreshToken.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
  }

  const clearError = () => {
    error.value = null
  }

  // Обработка ошибок аутентификации
  const handleAuthError = (apiError: ApiError) => {
    const message = errorUtils.getErrorMessage(apiError)
    
    // Если токен недействителен, очищаем сессию
    if (errorUtils.isAuthError(apiError)) {
      logout()
    }
    
    error.value = message
    throw apiError
  }

  /**
   * Инициализация аутентификации
   * Проверяет валидность токена и загружает данные пользователя
   */
  const initialize = async (): Promise<void> => {
    if (initialized.value) return

    const savedToken = localStorage.getItem('auth_token')
    if (!savedToken) {
      initialized.value = true
      return
    }

    try {
      loading.value = true
      error.value = null
      
      const response = await authApi.me()
      
      if (response.success && response.data) {
        user.value = response.data.user
        token.value = savedToken
        
        // Если есть новый токен в ответе, обновляем
        if (response.data.token) {
          setTokens(response.data.token, response.data.refreshToken)
        }
      } else {
        clearTokens()
      }
      
    } catch (apiError) {
      console.warn('Auth initialization failed:', apiError)
      clearTokens()
      user.value = null
    } finally {
      loading.value = false
      initialized.value = true
    }
  }

  /**
   * Вход в систему
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await authApi.login(credentials)
      
      if (response.success && response.data) {
        const authData = response.data as AuthResponse
        
        user.value = authData.user
        setTokens(authData.token, authData.refreshToken)
        
        // Перенаправляем пользователя
        const redirectTo = sessionStorage.getItem('redirect_after_login') || '/'
        sessionStorage.removeItem('redirect_after_login')
        await router.push(redirectTo)
        
      } else {
        throw new Error(response.message || 'Login failed')
      }
      
    } catch (apiError) {
      handleAuthError(apiError as ApiError)
    } finally {
      loading.value = false
    }
  }

  /**
   * Регистрация нового пользователя
   */
  const register = async (userData: RegisterData): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await authApi.register(userData)
      
      if (response.success && response.data) {
        const authData = response.data as AuthResponse
        
        user.value = authData.user
        setTokens(authData.token, authData.refreshToken)
        
        // Перенаправляем на главную страницу
        await router.push('/')
        
      } else {
        throw new Error(response.message || 'Registration failed')
      }
      
    } catch (apiError) {
      handleAuthError(apiError as ApiError)
    } finally {
      loading.value = false
    }
  }

  /**
   * Выход из системы
   */
  const logout = async (navigateToLogin: boolean = true): Promise<void> => {
    try {
      loading.value = true
      
      // Пытаемся уведомить сервер о выходе
      if (token.value) {
        try {
          await authApi.logout()
        } catch {
          // Игнорируем ошибки при выходе
        }
      }
      
    } finally {
      // Очищаем локальное состояние в любом случае
      user.value = null
      clearTokens()
      error.value = null
      loading.value = false
      
      if (navigateToLogin && router.currentRoute.value.meta.requiresAuth) {
        await router.push('/login')
      }
    }
  }

  /**
   * Обновление токена
   */
  const refresh = async (): Promise<boolean> => {
    if (!refreshToken.value) {
      return false
    }

    try {
      const response = await authApi.refreshToken()
      
      if (response.success && response.data) {
        setTokens(response.data.token, response.data.refreshToken)
        return true
      }
      
      return false
      
    } catch (apiError) {
      console.warn('Token refresh failed:', apiError)
      clearTokens()
      user.value = null
      return false
    }
  }

  /**
   * Изменение пароля
   */
  const changePassword = async (passwordData: ChangePasswordData): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await authApi.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      )
      
      if (!response.success) {
        throw new Error(response.message || 'Password change failed')
      }
      
    } catch (apiError) {
      handleAuthError(apiError as ApiError)
    } finally {
      loading.value = false
    }
  }

  /**
   * Запрос на восстановление пароля
   */
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await authApi.forgotPassword(email)
      
      if (!response.success) {
        throw new Error(response.message || 'Password reset request failed')
      }
      
    } catch (apiError) {
      handleAuthError(apiError as ApiError)
    } finally {
      loading.value = false
    }
  }

  /**
   * Сброс пароля по токену
   */
  const resetPassword = async (resetData: ResetPasswordData): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await authApi.resetPassword(resetData.token, resetData.password)
      
      if (response.success && response.data) {
        const authData = response.data as AuthResponse
        
        user.value = authData.user
        setTokens(authData.token, authData.refreshToken)
        
        await router.push('/')
        
      } else {
        throw new Error(response.message || 'Password reset failed')
      }
      
    } catch (apiError) {
      handleAuthError(apiError as ApiError)
    } finally {
      loading.value = false
    }
  }

  /**
   * Обновление данных текущего пользователя
   */
  const updateUser = (updatedUser: Partial<User>): void => {
    if (user.value) {
      user.value = { ...user.value, ...updatedUser }
    }
  }

  /**
   * Проверка роли пользователя
   */
  const hasRole = (role: string): boolean => {
    if (!user.value) return false
    return user.value.role === role
  }

  /**
   * Проверка прав доступа
   */
  const hasPermission = (permission: string): boolean => {
    if (!user.value) return false
    
    // Админы имеют все права
    if (user.value.role === 'admin' || user.value.role === 'super_admin') {
      return true
    }
    
    // Проверяем права в ранге пользователя
    if (user.value.rank?.permissions) {
      return user.value.rank.permissions.includes(permission)
    }
    
    return false
  }

  /**
   * Проверка, может ли пользователь выполнить действие
   */
  const canPerformAction = (action: string, resourceOwnerId?: number): boolean => {
    if (!user.value) return false
    
    // Владелец ресурса может выполнять действия над своим контентом
    if (resourceOwnerId && user.value.id === resourceOwnerId) {
      return true
    }
    
    // Проверяем права доступа
    return hasPermission(action)
  }

  /**
   * Получение статуса верификации
   */
  const isVerified = computed(() => user.value?.isVerified || false)

  /**
   * Получение роли пользователя
   */
  const userRole = computed(() => user.value?.role || 'user')

  /**
   * Проверка, является ли пользователь администратором
   */
  const isAdmin = computed(() => {
    const role = userRole.value
    return role === 'admin' || role === 'super_admin'
  })

  /**
   * Проверка, является ли пользователь модератором
   */
  const isModerator = computed(() => {
    const role = userRole.value
    return role === 'moderator' || role === 'admin' || role === 'super_admin'
  })

  // Автоматическая инициализация при первом использовании
  if (!initialized.value && typeof window !== 'undefined') {
    initialize()
  }

  return {
    // Состояние (только для чтения)
    user: readonly(user),
    token: readonly(token),
    loading: isLoading,
    error: readonly(error),
    initialized: readonly(initialized),

    // Вычисляемые свойства
    isAuthenticated,
    hasError,
    currentUser,
    isVerified,
    userRole,
    isAdmin,
    isModerator,

    // Методы аутентификации
    initialize,
    login,
    register,
    logout,
    refresh,
    changePassword,
    forgotPassword,
    resetPassword,

    // Утилиты
    updateUser,
    hasRole,
    hasPermission,
    canPerformAction,
    clearError,
    clearTokens
  }
}
