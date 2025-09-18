"""
ДОКУМЕНТАЦИЯ СИСТЕМЫ РЕГИСТРАЦИИ И АУТЕНТИФИКАЦИИ
===============================================

Автор: Ayakiro
Версия: 1.0
Дата создания: 18.09.2025

Этот документ описывает систему регистрации, авторизации и управления
пользователями в проекте Aetheris Community.

ОБЗОР СИСТЕМЫ АУТЕНТИФИКАЦИИ
============================

Система включает в себя:
1. Регистрацию новых пользователей (Sign In)
2. Авторизацию существующих пользователей (Login)
3. Валидацию пользовательских данных
4. Управление сессиями (планируется)
5. Восстановление паролей (планируется)

КОМПОНЕНТЫ СИСТЕМЫ
==================

1. СТРАНИЦЫ
   - SignIn.vue (/signin) - регистрация новых пользователей
   - Login.vue (/login) - авторизация существующих пользователей
   - Profile.vue (/profile) - профиль пользователя
   - Settings* - страницы настроек пользователя

2. COMPOSABLES
   - useValidation.ts - валидация форм и данных
   - useAuth.ts - управление аутентификацией (планируется)

3. TYPES
   - Типы валидации в useValidation
   - Типы пользователей (планируется в user.ts)

ДЕТАЛЬНОЕ ОПИСАНИЕ КОМПОНЕНТОВ
==============================

1. СТРАНИЦА РЕГИСТРАЦИИ (SignIn.vue)
=====================================

Расположение: /frontend/src/views/SignIn.vue
Маршрут: /signin

ФУНКЦИОНАЛ:
- Форма регистрации с тремя полями:
  * Nickname (никнейм пользователя)
  * Email (электронная почта)  
  * Password (пароль)
- Валидация в реальном времени
- Санитизация пользовательского ввода
- Переход на страницу входа

СТРУКТУРА КОМПОНЕНТА:
```vue
<template>
  <div class="signin-container">
    <div class="main-body">
      <div class="signin-content">
        <h2 class="signin-title">Sign in</h2>
        <div class="signin-form">
          <!-- Поля формы с валидацией -->
        </div>
      </div>
    </div>
  </div>
</template>
```

РЕАКТИВНЫЕ ДАННЫЕ:
- nickname: ref('') - значение поля никнейма
- email: ref('') - значение поля email
- password: ref('') - значение поля пароля
- nicknameError: ref<ValidationResult> - ошибки валидации никнейма
- emailError: ref<ValidationResult> - ошибки валидации email
- passwordError: ref<ValidationResult> - ошибки валидации пароля

ВАЛИДАЦИЯ:
- watch() для каждого поля с автоматической валидацией
- sanitizeNickname() для очистки никнейма
- sanitizePassword() для очистки пароля
- validateNickname(), validateEmail(), validatePassword()

ОБРАБОТКА ОТПРАВКИ:
```typescript
const handleSignIn = () => {
  // Финальная валидация всех полей
  const nicknameValidation = validateNickname(nickname.value)
  const emailValidation = validateEmail(email.value)
  const passwordValidation = validatePassword(password.value)
  
  // Обновление состояний ошибок
  nicknameError.value = nicknameValidation
  emailError.value = emailValidation
  passwordError.value = passwordValidation
  
  // Проверка валидности формы
  const isFormValid = nicknameValidation.isValid && 
                     emailValidation.isValid && 
                     passwordValidation.isValid
  
  if (isFormValid) {
    // Отправка данных на backend
    console.log('Sign up payload', {
      nickname: nickname.value,
      email: email.value,
      password: '[REDACTED]'
    })
    // TODO: Реальный API вызов
  }
}
```

СТИЛИЗАЦИЯ:
- Responsive дизайн с центрированием
- Форма размером 600x583px
- Поля ввода с закругленными углами
- Цветовая схема через CSS переменные
- Состояния ошибок с красной обводкой

2. СТРАНИЦА АВТОРИЗАЦИИ (Login.vue)
==================================

Расположение: /frontend/src/views/Login.vue
Маршрут: /login

ФУНКЦИОНАЛ:
- Форма авторизации с двумя полями:
  * Nickname/Email (никнейм или почта)
  * Password (пароль)
- Базовая валидация
- Ссылка на регистрацию
- Восстановление пароля (UI ready)

СТРУКТУРА КОМПОНЕНТА:
```vue
<template>
  <div class="login-container">
    <div class="main-body">
      <div class="login-content">
        <h2 class="login-title">Log in</h2>
        <div class="login-form">
          <!-- Упрощенная форма авторизации -->
        </div>
      </div>
    </div>
  </div>
</template>
```

РЕАКТИВНЫЕ ДАННЫЕ:
- nickname: ref('') - никнейм или email
- password: ref('') - пароль
- nicknameError: ref(false) - состояние ошибки никнейма
- passwordError: ref(false) - состояние ошибки пароля

ВАЛИДАЦИЯ (упрощенная):
```typescript
const validateNickname = (value: string): boolean => {
  return value.length >= 3 && value.length <= 20
}

const validatePassword = (value: string): boolean => {
  return value.length >= 6
}
```

ОБРАБОТКА ОТПРАВКИ:
```typescript
const handleLogin = () => {
  const nicknameValid = validateNickname(nickname.value)
  const passwordValid = validatePassword(password.value)
  
  nicknameError.value = !nicknameValid
  passwordError.value = !passwordValid
  
  if (nicknameValid && passwordValid) {
    // Отправка данных на backend
    console.log('Login payload', {
      nickname: nickname.value,
      password: '[REDACTED]'
    })
    // TODO: Реальный API вызов
  }
}
```

3. СИСТЕМА ВАЛИДАЦИИ (useValidation.ts)
======================================

Расположение: /frontend/src/composables/useValidation.ts

ТИПЫ ВАЛИДАЦИИ:
```typescript
export interface ValidationResult {
  isValid: boolean
  message: string
}
```

ФУНКЦИИ ВАЛИДАЦИИ:

validateNickname(nickname: string): ValidationResult
- Проверка длины (3-24 символа)
- Проверка разрешенных символов (буквы, цифры, _, -)
- Проверка, что не начинается с цифры
- Фильтрация запрещенных слов

validateEmail(email: string): ValidationResult  
- Проверка формата через регулярное выражение
- Проверка длины (до 254 символов)
- Базовая проверка структуры email

validatePassword(password: string): ValidationResult
- Минимальная длина 8 символов
- Максимальная длина 48 символов
- Наличие заглавной буквы
- Наличие строчной буквы
- Наличие цифры
- Наличие специального символа

ФУНКЦИИ САНИТИЗАЦИИ:

sanitizeNickname(nickname: string): string
- Удаление недопустимых символов
- Приведение к нижнему регистру
- Обрезка лишних пробелов

sanitizePassword(password: string): string
- Удаление управляющих символов
- Обрезка пробелов в начале и конце

BACKEND ИНТЕГРАЦИЯ
==================

ПЛАНИРУЕМАЯ API СТРУКТУРА:

1. РЕГИСТРАЦИЯ
Endpoint: POST /api/auth/register
Request Body:
```json
{
  "nickname": "string (3-24 chars)",
  "email": "string (valid email)",
  "password": "string (8-48 chars)"
}
```

Response (Success - 201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "number",
    "nickname": "string",
    "email": "string",
    "createdAt": "datetime"
  },
  "token": "jwt_token"
}
```

Response (Error - 400):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "nickname": "Nickname already exists",
    "email": "Invalid email format"
  }
}
```

2. АВТОРИЗАЦИЯ
Endpoint: POST /api/auth/login
Request Body:
```json
{
  "login": "string (nickname or email)",
  "password": "string"
}
```

Response (Success - 200):
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "number",
    "nickname": "string",
    "email": "string",
    "lastLoginAt": "datetime"
  },
  "token": "jwt_token"
}
```

Response (Error - 401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

3. ПРОВЕРКА ТОКЕНА
Endpoint: GET /api/auth/me
Headers: Authorization: Bearer <token>

Response (Success - 200):
```json
{
  "success": true,
  "user": {
    "id": "number",
    "nickname": "string", 
    "email": "string",
    "avatar": "string|null",
    "createdAt": "datetime",
    "lastLoginAt": "datetime"
  }
}
```

4. ВЫХОД
Endpoint: POST /api/auth/logout
Headers: Authorization: Bearer <token>

Response (Success - 200):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

ИНТЕГРАЦИЯ С FRONTEND
====================

ПЛАНИРУЕМЫЕ ИЗМЕНЕНИЯ ДЛЯ API ИНТЕГРАЦИИ:

1. Создание useAuth.ts composable:
```typescript
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const user = ref<User | null>(null)
const token = ref<string | null>(localStorage.getItem('auth_token'))
const loading = ref(false)

export function useAuth() {
  const router = useRouter()
  
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    try {
      const response = await api.post('/auth/login', credentials)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      router.push('/')
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  
  const register = async (userData: RegisterData) => {
    loading.value = true
    try {
      const response = await api.post('/auth/register', userData)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      router.push('/')
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  
  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('auth_token')
      router.push('/login')
    }
  }
  
  return {
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    isAuthenticated,
    login,
    register,
    logout
  }
}
```

2. Обновление компонентов SignIn.vue и Login.vue:
- Замена console.log на реальные API вызовы
- Обработка ошибок сервера
- Показ loading состояний
- Редирект после успешной авторизации

3. Защита роутов:
```typescript
// В router/index.ts
const router = createRouter({
  // ...routes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/signin') && isAuthenticated.value) {
    next('/')
  } else {
    next()
  }
})
```

БЕЗОПАСНОСТЬ
============

FRONTEND БЕЗОПАСНОСТЬ:
1. Валидация всех пользовательских данных
2. Санитизация ввода против XSS
3. Ограничения на длину полей
4. Маскировка паролей в логах
5. Безопасное хранение токенов

BACKEND БЕЗОПАСНОСТЬ (планируется):
1. Хеширование паролей (bcrypt)
2. JWT токены с коротким временем жизни
3. Rate limiting для регистрации/авторизации
4. Проверка уникальности nickname/email
5. Защита от SQL injection
6. HTTPS обязательно для продакшена
7. Валидация данных на сервере
8. Логирование попыток входа

ПОЛЬЗОВАТЕЛЬСКИЙ ОПЫТ
====================

ТЕКУЩИЕ ВОЗМОЖНОСТИ:
1. Интуитивные формы регистрации и входа
2. Валидация в реальном времени
3. Понятные сообщения об ошибках
4. Адаптивный дизайн
5. Переходы между страницами входа и регистрации

ПЛАНИРУЕМЫЕ УЛУЧШЕНИЯ:
1. Показ силы пароля
2. Автодополнение форм
3. Вход через социальные сети
4. Двухфакторная аутентификация
5. Remember me функция
6. Восстановление пароля по email
7. Подтверждение email при регистрации

ТЕСТИРОВАНИЕ
============

UNIT ТЕСТЫ (планируется):
1. Тестирование функций валидации
2. Тестирование composables
3. Тестирование компонентов форм

ИНТЕГРАЦИОННЫЕ ТЕСТЫ (планируется):
1. Тестирование регистрации end-to-end
2. Тестирование авторизации
3. Тестирование защищенных роутов

E2E ТЕСТЫ (планируется):
1. Полный флоу регистрации
2. Полный флоу авторизации
3. Тестирование валидации форм

МОНИТОРИНГ И АНАЛИТИКА
=====================

МЕТРИКИ (планируется):
1. Количество регистраций
2. Успешность авторизации
3. Ошибки валидации
4. Время отклика API
5. Конверсия регистрации

ЛОГИРОВАНИЕ (планируется):
1. Попытки авторизации
2. Регистрации новых пользователей
3. Ошибки валидации
4. Подозрительная активность

ПЛАНЫ РАЗВИТИЯ
==============

БЛИЖАЙШИЕ ЗАДАЧИ:
1. Реализация backend API для аутентификации
2. Создание useAuth composable
3. Интеграция с реальным API
4. Обработка ошибок сервера

СРЕДНЕСРОЧНЫЕ ПЛАНЫ:
1. Восстановление паролей
2. Подтверждение email
3. Профиль пользователя
4. Настройки безопасности

ДОЛГОСРОЧНЫЕ ПЛАНЫ:
1. OAuth интеграция
2. Двухфакторная аутентификация
3. SSO (Single Sign-On)
4. Детальные права доступа

ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
====================

РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ:
1. Пользователь заходит на /signin
2. Заполняет форму (nickname, email, password)
3. Система валидирует данные в реальном времени
4. При отправке происходит финальная валидация
5. Данные отправляются на backend (пока stub)
6. При успехе пользователь авторизуется

АВТОРИЗАЦИЯ СУЩЕСТВУЮЩЕГО ПОЛЬЗОВАТЕЛЯ:
1. Пользователь заходит на /login
2. Вводит nickname/email и пароль
3. Система проверяет базовую валидацию
4. Данные отправляются на backend (пока stub)
5. При успехе пользователь получает доступ

ОБРАБОТКА ОШИБОК:
1. Ошибки валидации показываются под полями
2. Неверные поля подсвечиваются красным
3. Сообщения об ошибках понятны пользователю

===============================================
Конец документации системы регистрации
===============================================
"""