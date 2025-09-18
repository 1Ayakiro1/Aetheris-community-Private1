<template>
  <div class="example-container">
    <h1>Пример использования ArticleCard</h1>

    <!-- Пример карточки статьи -->
    <ArticleCard
      :article="sampleArticle"
      @tag-click="handleTagClick"
      @author-click="handleAuthorClick"
      @article-click="handleArticleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'

// Пример данных статьи
const sampleArticle = ref({
  id: 1,
  title: 'Как создать современное веб-приложение на Vue 3',
  content: 'Полное руководство по созданию современного веб-приложения с использованием Vue 3, TypeScript и Composition API...',
  excerpt: 'Изучите основы Vue 3 и создайте свое первое приложение с нуля',
  author: {
    id: 1,
    username: 'Аякиро',
    avatar: 'https://via.placeholder.com/85x85/434956/FFFFFF?text=A',
    email: 'pinicilin@example.com'
  },
  tags: ['Vue.js', 'TypeScript', 'Frontend', 'Tutorial'],
  createdAt: new Date('2024-01-15T10:30:00Z'),
  updatedAt: new Date('2024-01-16T14:20:00Z'),
  publishedAt: new Date('2024-01-15T10:30:00Z'),
  status: 'published' as const,
  views: 1250,
  likes: 42
})

// Обработчики событий
const handleTagClick = (tag: string) => {
  console.log('Клик по тегу:', tag)
  // Здесь можно добавить логику фильтрации по тегам
}

const handleAuthorClick = (authorId: number) => {
  console.log('Клик по автору:', authorId)
  // Здесь можно добавить переход к профилю автора
}

const handleArticleClick = (articleId: number) => {
  console.log('Клик по статье:', articleId)
  // Здесь можно добавить переход к полной статье
}
</script>

<style scoped>
.example-container {
  padding: 1.25rem;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

h1 {
  color: var(--text-primary);
  margin-bottom: 1.875rem;
  text-align: center;
}
</style>
