# Vue i18n - Руководство по интернационализации

## Обзор

В проекте используется стандартная библиотека Vue i18n для интернационализации. Поддерживаются 4 языка: English, Русский, Español, Français.

## Структура файлов

```
src/
├── locales/
│   ├── en.json    # Английские переводы
│   ├── ru.json    # Русские переводы
│   ├── es.json    # Испанские переводы
│   └── fr.json    # Французские переводы
├── i18n.ts        # Конфигурация Vue i18n
└── main.ts        # Подключение i18n к приложению
```

## Использование в компонентах

### Composition API (рекомендуется)

```vue
<template>
  <div>
    <h1>{{ $t('page.home.title') }}</h1>
    <p>{{ $t('page.home.subtitle') }}</p>
    <button @click="changeLanguage('ru')">
      {{ $t('nav.settings') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale, getCurrentLocale, availableLocales } from '@/i18n'

const { t } = useI18n()

// Смена языка
const changeLanguage = (locale: string) => {
  setLocale(locale)
}

// Получение текущего языка
const currentLocale = getCurrentLocale()
</script>
```

### Options API

```vue
<template>
  <div>
    <h1>{{ $t('page.home.title') }}</h1>
    <p>{{ $t('page.home.subtitle') }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale
      localStorage.setItem('preferred-language', locale)
    }
  }
}
</script>
```

## API функции

### setLocale(locale: string)
Смена языка приложения
```typescript
import { setLocale } from '@/i18n'
setLocale('ru') // Переключить на русский
```

### getCurrentLocale(): string
Получение текущего языка
```typescript
import { getCurrentLocale } from '@/i18n'
const currentLang = getCurrentLocale() // 'en' | 'ru' | 'es' | 'fr'
```

### getCurrentLocaleData()
Получение данных текущего языка (название, флаг)
```typescript
import { getCurrentLocaleData } from '@/i18n'
const localeData = getCurrentLocaleData()
// { code: 'ru', name: 'Русский', flag: '🇷🇺' }
```

### availableLocales
Массив доступных языков
```typescript
import { availableLocales } from '@/i18n'
// [
//   { code: 'en', name: 'English', flag: '🇺🇸' },
//   { code: 'ru', name: 'Русский', flag: '🇷🇺' },
//   // ...
// ]
```

## Структура переводов

Переводы организованы в иерархическую структуру:

```json
{
  "nav": {
    "home": "Главная",
    "articles": "Статьи"
  },
  "page": {
    "home": {
      "title": "Aetheris",
      "subtitle": "Сообщество разработчиков"
    }
  },
  "form": {
    "signin": {
      "title": "Вход",
      "nickname": "Никнейм"
    }
  }
}
```

## Использование в шаблонах

### Базовое использование
```vue
<template>
  <h1>{{ $t('page.home.title') }}</h1>
</template>
```

### Вложенные ключи
```vue
<template>
  <h1>{{ $t('page.home.title') }}</h1>
  <p>{{ $t('page.home.subtitle') }}</p>
</template>
```

### С параметрами (если нужно)
```vue
<template>
  <p>{{ $t('welcome.message', { name: userName }) }}</p>
</template>
```

## Добавление новых переводов

1. Откройте файл локализации (например, `ru.json`)
2. Добавьте новый ключ в соответствующую секцию
3. Добавьте переводы во все языковые файлы
4. Используйте в компонентах: `{{ $t('your.new.key') }}`

### Пример добавления перевода

**ru.json:**
```json
{
  "new": {
    "section": {
      "title": "Новый заголовок",
      "description": "Новое описание"
    }
  }
}
```

**en.json:**
```json
{
  "new": {
    "section": {
      "title": "New Title",
      "description": "New Description"
    }
  }
}
```

**Использование:**
```vue
<template>
  <h2>{{ $t('new.section.title') }}</h2>
  <p>{{ $t('new.section.description') }}</p>
</template>
```

## Автоматическое определение языка

Система автоматически:
1. Проверяет сохраненный язык в `localStorage`
2. Если не найден, определяет язык браузера
3. Если язык браузера не поддерживается, использует английский по умолчанию

## Сохранение предпочтений

Язык пользователя автоматически сохраняется в `localStorage` при смене и восстанавливается при следующем посещении.

## Лучшие практики

1. **Используйте иерархическую структуру** ключей для лучшей организации
2. **Группируйте переводы** по функциональности (nav, page, form, etc.)
3. **Используйте осмысленные ключи** вместо сокращений
4. **Добавляйте переводы во все языки** одновременно
5. **Тестируйте** смену языков в интерфейсе

## Отладка

Для отладки переводов можно использовать:
```typescript
// Проверить текущий язык
console.log(getCurrentLocale())

// Проверить доступные языки
console.log(availableLocales)

// Проверить конкретный перевод
console.log(t('your.key'))
```

## Миграция с кастомной системы

Если у вас есть компоненты, использующие старую кастомную систему:

**Было:**
```typescript
import { useI18n } from '@/composables/useI18n'
const { t } = useI18n()
```

**Стало:**
```typescript
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```

Ключи переводов остаются теми же, только изменился способ импорта.
