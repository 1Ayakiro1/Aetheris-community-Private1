<template>
  <div class="test-container">
    <h1>Простой тест эффекта тегов</h1>
    
    <div class="test-section">
      <h2>Тестируем:</h2>
      <div class="tags-container">
        <button class="tag">
          <span>Vue.js</span>
        </button>
        <button class="tag">
          <span>TypeScript</span>
        </button>
        <button class="tag">
          <span>Frontend</span>
        </button>
      </div>
    </div>

    <div class="test-section">
      <h2>Что должно происходить:</h2>
      <div class="instructions">
        <p>1. Наведите курсор - фон заполнится слева направо</p>
        <p>2. Отведите курсор - фон уйдет вправо</p>
        <p>3. Если не работает - значит проблема в CSS</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Тестовый компонент
</script>

<style scoped>
.test-container {
  padding: 1.25rem;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

h1 {
  color: var(--text-primary);
  margin-bottom: 1.875rem;
  text-align: center;
}

h2 {
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  margin-top: 2.5rem;
}

.test-section {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tags-container {
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  flex-wrap: wrap;
  justify-content: center;
}

.instructions {
  background-color: var(--bg-secondary);
  padding: 1.25rem;
  border-radius: 0.625rem;
  max-width: 37.5rem;
  text-align: left;
}

.instructions p {
  color: var(--text-secondary);
  margin: 0.625rem 0;
  font-size: 1rem;
}

/* Копируем стили из ArticleCard */
.tag {
  position: relative;
  border: 2px solid #FFFFFF;
  background-color: transparent;
  width: 10rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  font-size: 1.25rem;
  font-family: var(--font-sans);
  font-weight: 700;
  color: var(--text-primary);
  cursor: pointer;
  overflow: hidden;

  /* Псевдоэлемент для эффекта */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  /* Текст поверх псевдоэлемента */
  span {
    position: relative;
    z-index: 2;
    transition: color 0.3s ease;
  }

  /* Эффект при наведении */
  &:hover {
    color: #000000;
    
    &::before {
      left: 0;
    }
  }

  /* Эффект при отведении курсора */
  &:not(:hover) {
    &::before {
      left: 100%;
    }
  }

  /* Эффект при клике */
  &:active {
    &::before {
      background-color: var(--btn-primary);
    }
    color: var(--text-primary);
  }

  /* Фокус */
  &:focus {
    outline: none;
    border: 2px solid var(--btn-primary);
  }

  /* Отключенное состояние */
  &:disabled {
    background-color: var(--btn-primary);
    color: var(--text-primary);
    cursor: not-allowed;
    
    &::before {
      display: none;
    }
  }
}
</style>
