<template>
  <div class="create-article-container">
    <!-- Body -->
    <div class="content-wrapper">

      <!-- Warning block -->
      <div class="warning-block">
        <h2 class="warning-title">{{ $t('create-article.h1') }}</h2>
        <h2 class="warning-subtitle">{{ $t('create-article.h2') }}</h2>
        <button class="read-rules-button">{{ $t('create-article.button1') }}</button>
      </div>

        <!--Потом поработаем над оформлением этого блока, пока так. А лучше вообще взять из prime vue решение где можно разворачивать картинку, обрезать ее итд сразу-->
        <input type="file" @change="onFileSelected" accept="image/*" />
        <div v-if="localPreview" class="image-preview">
            <h3 class="preview-title">Предпросмотр превью:</h3>
            <img :src="localPreview" alt="Local preview" class="preview-img" />
        </div>
        <p v-if="uploadingImage" class="uploading-note">Загружается превью... Пожалуйста, подождите</p>


        <!-- Path block -->
      <div class="path-block">
        <h2 class="edit-title">{{ $t('create-article.h4') }}</h2>
        <h2 class="edit-subtitle">{{ $t('create-article.h5') }}</h2>
        <input type="text" placeholder="Enter title..." class="title-input" v-model="articleTitle">

      </div>

      <!-- Edit block -->
      <div class="edit-block">

        <!-- Article editor block -->
        <Editor
          v-model="articleContent"
          editorStyle="height: 500px;"
        />

        <!-- Tags Section -->
        <div class="tags-section">
          <h2 class="tags-title">{{ $t('create-article.h6') || 'Теги статьи' }}</h2>
          <h2 class="tags-subtitle">{{ $t('create-article.h7') || 'Выберите до 5 тегов для вашей статьи' }}</h2>
          
          <!-- Selected Tags Display -->
          <div v-if="selectedTags.length > 0" class="selected-tags">
            <div 
              v-for="tag in selectedTags" 
              :key="tag" 
              :class="['custom-tag-wrapper', `tag-${getTagSeverity(tag)}`]"
            >
              <span class="tag-text">{{ tag }}</span>
              <button 
                @click="removeTag(tag)" 
                class="tag-remove-btn"
                type="button"
                :aria-label="`Удалить тег ${tag}`"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
          </div>

          <!-- Tag Input with Autocomplete -->
          <div class="tag-input-wrapper">
            <input 
              type="text" 
              v-model="tagInput"
              @input="onTagInput"
              @focus="showSuggestions = true"
              @keydown.enter.prevent="addTagFromInput"
              :placeholder="selectedTags.length >= 5 ? 'Максимум 5 тегов' : 'Введите тег...'"
              :disabled="selectedTags.length >= 5"
              class="tags-input-field"
            />
            
            <!-- Suggestions Dropdown -->
            <div 
              v-if="showSuggestions && filteredTags.length > 0 && selectedTags.length < 5" 
              class="tags-suggestions"
            >
              <div 
                v-for="tag in filteredTags" 
                :key="tag"
                @click="addTag(tag)"
                class="suggestion-item"
              >
                {{ tag }}
              </div>
            </div>
          </div>

          <!-- Tags Counter -->
          <p class="tags-counter">
            {{ $t('create-article.tagsCounter', { count: selectedTags.length, max: 5 }) }}
          </p>
        </div>

        <!-- Difficulty Section -->
        <div class="difficulty-section">
          <h2 class="difficulty-title">{{ $t('create-article.h8') }}</h2>
          <h2 class="difficulty-subtitle">{{ $t('create-article.h9') }}</h2>
          
          <!-- Difficulty Circles -->
          <div class="difficulty-circles">
            <button 
              v-for="(label, level) in difficultyOptions" 
              :key="level"
              :class="['difficulty-circle', `difficulty-${level}`, { 'selected': selectedDifficulty === level }]"
              @click="selectDifficulty(level)"
              type="button"
              :title="label"
            >
              <FireIcon class="difficulty-icon" />
            </button>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="action-buttons">
          <button class="create-button" @click="handleCreateArticle" :disabled="loading || uploadingImage">
            <i v-if="!loading" class="pi pi-send button-icon"></i>
            <i v-else class="pi pi-spin pi-spinner button-icon"></i>
            <p class="button-text">{{ isEditing ? $t('create-article.button5') : $t('create-article.button2') }}</p>
          </button>
          <button class="preview-button" @click="previewArticle" :disabled="loading || uploadingImage">
            <i class="pi pi-eye button-icon"></i>
            <p class="button-text">{{ $t('create-article.button3') }}</p>
          </button>
          <button class="draft-button" @click="saveDraft" :disabled="loading || uploadingImage">
            <i class="pi pi-save button-icon"></i>
            <p class="button-text">{{ $t('create-article.button4') }}</p>
          </button>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="api-error">
          <p class="api-error-message">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Editor from 'primevue/editor'
import Tag from 'primevue/tag'
import FireIcon from '@/assets/svgs/fire_ico.svg'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toast = useToast()

import { useArticles } from '@/composables/useArticles'
import { useAuthStore } from '@/stores/auth'
import type { CreateArticleRequest } from '@/types/article'

// Article data
const articleTitle = ref('')
const articleContent = ref('')
const router = useRouter()
const selectedFile = ref<File | null>(null)
const localPreview = ref<string | null>(null) //URL.createObjectURL
const uploadingImage = ref(false) //это для индикации загрузки изображения на imgBB. Надо потом накидать стилей под это

// Tags grouped by colors for scalability
// ============================================
// КАК ДОБАВИТЬ НОВЫЙ ТЕГ:
// 1. Добавьте новый тег в нужную цветовую группу ниже
// 2. Тег автоматически появится в автодополнении
// 3. Тег будет иметь цвет своей группы
// 
// ГРУППЫ ЦВЕТОВ:
// - success (зеленый): Frontend технологии, обучение
// - info (синий): Backend технологии, базы данных
// - warning (желтый): Дизайн, игры, креатив
// - danger (красный): Безопасность, тестирование, DevOps
// - secondary (серый): Инструменты, платформы, прочее
// ============================================
const tagColorGroups: Record<'success' | 'info' | 'warning' | 'danger' | 'secondary', string[]> = {
  success: [
    'javaScript',
    'vue.js',
    'react',
    'node.js',
    'web development',
    'frontend',
    'tutorial',
    'guide'
  ],
  info: [
    'python',
    'typescript',
    'angular',
    'programming',
    'backend',
    'database',
    'sql',
    'api',
    'rest'
  ],
  warning: [
    'design',
    'ui/ux',
    'mobile development',
    'game development',
    'unity',
    'unreal engine',
    'review',
    'interview'
  ],
  danger: [
    'security',
    'testing',
    'cryptography',
    'devops',
    'docker',
    'kubernetes',
    'blockchain'
  ],
  secondary: [
    'tools',
    'git',
    'nosql',
    'fullstack',
    'artificial intelligence',
    'machine learning',
    'graphql',
    'microservices',
    'cloud',
    'aws',
    'azure',
    'google cloud',
    'linux',
    'windows',
    'macos',
    'news',
    'case study',
    'architecture',
    'algorithms',
    'design patterns'
  ]
}

// Flatten all tags for autocomplete
const availableTags = ref([
  ...tagColorGroups.success,
  ...tagColorGroups.info,
  ...tagColorGroups.warning,
  ...tagColorGroups.danger,
  ...tagColorGroups.secondary
])

const selectedTags = ref<string[]>([])
const tagInput = ref('')
const showSuggestions = ref(false)

// Difficulty selection
const selectedDifficulty = ref<string>('medium') // Default to medium
const difficultyOptions = computed(() => ({
  easy: t('create-article.difficulty.easy'),
  medium: t('create-article.difficulty.medium'),
  hard: t('create-article.difficulty.hard')
} as Record<string, string>))

const filteredTags = computed(() => {
  if (!tagInput.value.trim()) {
    return availableTags.value.filter(tag => !selectedTags.value.includes(tag)).slice(0, 10)
  }
  
  const searchTerm = tagInput.value.toLowerCase()
  return availableTags.value
    .filter(tag => 
      tag.toLowerCase().includes(searchTerm) && 
      !selectedTags.value.includes(tag)
    )
    .slice(0, 10)
})

// API integration
const { createArticle, updateArticle, loading, error } = useArticles()
const auth = useAuthStore()
const isEditing = ref(false)
const editingArticleId = ref<number | null>(null)

// Reactive variables for checkboxes
// const publicationTimeEnabled = ref(false)
const rank1Enabled = ref(false)
const rank2Enabled = ref(false)
const disableCommenting = ref(false)
const doNotNotify = ref(false)
const hideContacts = ref(false)
const hideCommentatorsInfo = ref(false)
const disableReplying = ref(false)

//debug
console.log('VITE_IMGBB_API_KEY =', import.meta.env.VITE_IMGBB_API_KEY)

// Tags functions
const tagColors = ['success', 'info', 'warning', 'danger', 'secondary'] as const

// Функция для получения цвета тега на основе его группы
const getTagSeverity = (tagOrIndex: string | number): typeof tagColors[number] => {
  // Если передан индекс (для обратной совместимости)
  if (typeof tagOrIndex === 'number') {
    return tagColors[tagOrIndex % tagColors.length]
  }
  
  // Ищем тег в группах
  const tag = tagOrIndex as string
  
  if (tagColorGroups.success.includes(tag)) return 'success'
  if (tagColorGroups.info.includes(tag)) return 'info'
  if (tagColorGroups.warning.includes(tag)) return 'warning'
  if (tagColorGroups.danger.includes(tag)) return 'danger'
  if (tagColorGroups.secondary.includes(tag)) return 'secondary'
  
  // Fallback: если тег не найден в группах, используем хеш
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % tagColors.length
  return tagColors[index]
}

const addTag = (tag: string) => {
  if (selectedTags.value.length >= 5) {
    alert('Максимум 5 тегов')
    return
  }
  
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag)
    tagInput.value = ''
    showSuggestions.value = false
  }
}

const removeTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  }
}

const onTagInput = () => {
  showSuggestions.value = true
}

const addTagFromInput = () => {
  const inputValue = tagInput.value.trim()
  
  if (!inputValue) return
  
  if (selectedTags.value.length >= 5) {
    alert('Максимум 5 тегов')
    return
  }
  
  // Проверяем, есть ли точное совпадение в отфильтрованных тегах
  const exactMatch = filteredTags.value.find(
    tag => tag.toLowerCase() === inputValue.toLowerCase()
  )
  
  if (exactMatch) {
    addTag(exactMatch)
  } else if (filteredTags.value.length > 0) {
    // Если есть предложения, берём первое
    addTag(filteredTags.value[0])
  }
  // Кастомные теги больше не создаются
}

// Difficulty selection function
const selectDifficulty = (level: string) => {
  selectedDifficulty.value = level
}

// Закрытие предложений при клике вне компонента
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.tag-input-wrapper')) {
    showSuggestions.value = false
  }
}

// Functions
const exportToJSON = () => {
  // Parse HTML content to extract formatted text
  const parser = new DOMParser()
  const doc = parser.parseFromString(articleContent.value, 'text/html')

  const extractFormattedContent = (element: Element): any[] => {
    const result: any[] = []

    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent?.trim()) {
          result.push({
            type: 'text',
            content: node.textContent
          })
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element
        const tagName = el.tagName.toLowerCase()
        const textContent = el.textContent || ''

        switch (tagName) {
          case 'strong':
          case 'b':
            result.push({ type: 'bold', content: textContent })
            break
          case 'em':
          case 'i':
            result.push({ type: 'italic', content: textContent })
            break
          case 'u':
            result.push({ type: 'underline', content: textContent })
            break
          case 'code':
            result.push({ type: 'code', content: textContent })
            break
          case 'a':
            result.push({
              type: 'link',
              content: textContent,
              href: el.getAttribute('href') || ''
            })
            break
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            result.push({
              type: 'heading',
              content: textContent,
              level: parseInt(tagName.charAt(1))
            })
            break
          case 'blockquote':
            result.push({ type: 'quote', content: textContent })
            break
          case 'ul':
          case 'ol':
            result.push({
              type: 'list',
              ordered: tagName === 'ol',
              items: Array.from(el.querySelectorAll('li')).map(li => li.textContent || '')
            })
            break
          default:
            result.push(...extractFormattedContent(el))
            break
        }
      }
    })

    return result
  }

  const formattedContent = extractFormattedContent(doc.body)

  const articleData = {
    title: articleTitle.value,
    content: {
      html: articleContent.value,
      formatted: formattedContent
    },
      tags: selectedTags.value, // используем selectedTags
      difficulty: selectedDifficulty.value,
      settings: {
        // publicationTime: publicationTimeEnabled.value,
        ranks: {
        rank1: rank1Enabled.value,
        rank2: rank2Enabled.value
      },
      disableCommenting: disableCommenting.value,
      doNotNotify: doNotNotify.value,
      hideContacts: hideContacts.value,
      hideCommentatorsInfo: hideCommentatorsInfo.value,
      disableReplying: disableReplying.value
    },
    createdAt: new Date().toISOString()
  }

  return articleData
}

const handleCreateArticle = async () => {
    if (!articleTitle.value.trim()) {
        alert('Пожалуйста, введите заголовок статьи')
        return
    }
    if (!articleContent.value.trim()) {
        alert('Пожалуйста, добавьте содержание статьи')
        return
    }

    try {
        let previewUrl: string | undefined = undefined
        if (selectedFile.value) {
            uploadingImage.value = true
            try {
                previewUrl = await uploadToImgBB(selectedFile.value)
            } catch (err) {
                console.error(err)
                const keep = confirm('Не удалось загрузить превью. Продолжить без него?')
                if (!keep) return
            } finally {
                uploadingImage.value = false
            }
        }

        const articleData: CreateArticleRequest = {
            title: articleTitle.value.trim(),
            content: articleContent.value,
            excerpt: generateExcerpt(articleContent.value),
            tags: selectedTags.value, // используем selectedTags вместо articleTags
            status: 'published',
            preview_image: previewUrl, // <--- вместо previewImage
            difficulty: selectedDifficulty.value,
            author: auth.user?.username || 'Anonymous'
        }

        const result = isEditing.value && editingArticleId.value
            ? await updateArticle(editingArticleId.value, articleData)
            : await createArticle(articleData)

        console.log('ArticleData перед API:', articleData)
        console.log('Созданная статья:', result)
        toast.add({
          severity: 'success',
          summary: 'Статья опубликована',
          detail: 'Ваша статья успешно опубликована и доступна на главной странице',
          life: 4000
        })
        await router.push('/')
    } catch (err) {
        console.error(err)
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось создать статью. Попробуйте ещё раз',
          life: 5000
        })
    }

}

// Генерация краткого описания из контента
const generateExcerpt = (content: string): string => {
  // Удаляем HTML теги
  const textContent = content.replace(/<[^>]*>/g, '')
  // Берем первые 200 символов
  return textContent.length > 200
    ? textContent.substring(0, 200) + '...'
    : textContent
}

const previewArticle = () => {
  const articleData = exportToJSON()
  console.log('Preview data:', JSON.stringify(articleData, null, 2))
  alert('Предпросмотр статьи (данные в консоли)')
}

const saveDraft = async () => {
  if (!articleTitle.value.trim()) {
    alert('Пожалуйста, введите заголовок статьи')
    return
  }

  try {
    let previewUrl: string | undefined = undefined
    if (selectedFile.value) {
      uploadingImage.value = true
      try {
        previewUrl = await uploadToImgBB(selectedFile.value)
      } catch (err) {
        console.error(err)
        // Продолжаем без превью для черновика
      } finally {
        uploadingImage.value = false
      }
    }

    const articleData: CreateArticleRequest = {
      title: articleTitle.value.trim(),
      content: articleContent.value,
      excerpt: generateExcerpt(articleContent.value),
      tags: selectedTags.value,
      status: 'draft',
      preview_image: previewUrl,
      difficulty: selectedDifficulty.value,
      author: auth.user?.username || 'Anonymous'
    }

    const result = isEditing.value && editingArticleId.value
      ? await updateArticle(editingArticleId.value, articleData)
      : await createArticle(articleData)

    console.log('Черновик сохранен:', result)
    toast.add({
      severity: 'success',
      summary: 'Черновик сохранен',
      detail: 'Статья сохранена как черновик на вашей странице статей',
      life: 4000
    })
    await router.push('/your-articles')
  } catch (err) {
    console.error(err)
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось сохранить черновик. Попробуйте ещё раз',
      life: 5000
    })
  }
}

onMounted(() => {
  // Add click outside handler
  document.addEventListener('click', handleClickOutside)
  
  // Load draft if exists
  const draft = localStorage.getItem('article_draft')
  if (draft) {
    try {
      const draftData = JSON.parse(draft)
      articleTitle.value = draftData.title || ''
      selectedTags.value = draftData.tags || [] // загружаем теги в selectedTags
      selectedDifficulty.value = draftData.difficulty || 'medium' // загружаем сложность
      articleContent.value = draftData.content?.html || ''

        if (draftData.settings) {
          // publicationTimeEnabled.value = draftData.settings.publicationTime || false
          rank1Enabled.value = draftData.settings.ranks?.rank1 || false
        rank2Enabled.value = draftData.settings.ranks?.rank2 || false
        disableCommenting.value = draftData.settings.disableCommenting || false
        doNotNotify.value = draftData.settings.doNotNotify || false
        hideContacts.value = draftData.settings.hideContacts || false
        hideCommentatorsInfo.value = draftData.settings.hideCommentatorsInfo || false
        disableReplying.value = draftData.settings.disableReplying || false
      }
    } catch (error) {
      console.warn('Не удалось загрузить черновик:', error)
    }
  }
})

function onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]
        //Если была другая локал ссылка то удаляем ее, нужно на этом стили завязать потом
        if (localPreview.value) {
            URL.revokeObjectURL(localPreview.value)
            localPreview.value = null
        }
        selectedFile.value = file
        localPreview.value = URL.createObjectURL(file)
    } else {
        if (localPreview.value) {
            URL.revokeObjectURL(localPreview.value)
            localPreview.value = null
        }
        selectedFile.value = null
    }
}

async function uploadToImgBB(file: File): Promise<string> {
    const apiKey = "58df18c9866715b1c55a851ab1130bc4"
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`

    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })

    const result = await response.json()
    if (!result.success) throw new Error('Ошибка загрузки превью на ресурс')
    return result.data.url
}

</script>

<style lang="scss" scoped>
.create-article-container {
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding: 100px 16px;
  box-sizing: border-box;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 60px 12px 100px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 80px 20px 100px;
    max-width: 1000px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    padding: 100px 24px 100px;
    max-width: 1400px;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

// Path block
.path-block {
  background-color: var(--bg-secondary);
  width: 1400px;
  height: 190px;
  border-radius: 25px;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.path-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 35px;
  margin-left: 48px;
  align-items: center;
}

.path-link {
  color: var(--primary-violet);
  text-decoration: none;
}

// Warning block
.warning-block {
  background-color: var(--bg-secondary);
  width: 1400px;
  height: 209px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.warning-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 24px;
  margin-left: 48px;
}

.warning-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 4px;
  margin-left: 48px;
  width: 440px;
}

.read-rules-button {
  width: 269px;
  height: 56px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 48px;
  margin-top: 15px;
  cursor: pointer;
  transition: all 0s ease-in-out;

}

// Edit block
.edit-block {
  background-color: var(--bg-secondary);
  width: 1400px;
  min-height: auto;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  padding-bottom: 48px;
}

.edit-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 24px;
  margin-left: 48px;
}

.edit-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 48px;
  width: 400px;
}

.title-input {
  width: 1300px;
  height: 68px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  margin-top: 8px;
  margin-left: 48px;
  font-weight: bold;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 22px;
  color: var(--text-primary);
  transition: all 0s ease-in-out;

  &::placeholder {
    color: var(--text-third);
  }

  &:focus {
    outline: none;
    border: 2px solid white;
    border-radius: 20px;
  }
}

:deep(.ql-toolbar) {
  background: var(--bg-primary) !important;
  border-radius: 25px !important;
  padding: 24px 20px;
  width: 1300px;
  margin-left: 48px;
  margin-top: 56px;
  min-height: 80px;
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
}

  :deep(.ql-toolbar button) {
    width: 50px !important;
    height: 46px !important;
    padding: 10px !important;
    margin: 4px !important;
    border-radius: 18px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: var(--primary-violet) !important;
  }

  &.ql-active {
    background: var(--btn-primary) !important;
    border-color: var(--text-primary) !important;
    color: var(--text-primary) !important;
  }
}

:deep(.ql-toolbar button svg) {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;
  max-width: 28px !important;
  max-height: 28px !important;
  color: var(--text-primary);
  object-fit: contain;
}

:deep(.ql-toolbar button.ql-active svg) {
  color: var(--text-primary) !important;
}

:deep(.ql-toolbar button.ql-active .ql-fill) {
  fill: var(--text-primary) !important;
}

:deep(.ql-toolbar button.ql-active .ql-stroke) {
  stroke: var(--text-primary) !important;
}

:deep(.ql-toolbar .ql-formats) {
  display: flex !important;
  align-items: center !important;
  margin-right: 15px !important;
}

:deep(.ql-toolbar .ql-picker) {
  height: 46px !important;
  font-size: 18px !important;
  margin: 4px !important;
  display: flex !important;
  align-items: center !important;
}

:deep(.ql-toolbar .ql-picker-label) {
  height: 46px !important;
  line-height: 44px !important;
  padding: 0 16px !important;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: var(--text-primary);
  display: flex !important;
  align-items: center !important;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: var(--primary-violet) !important;
  }
}


:deep(.ql-toolbar .ql-color-picker) {
  width: 50px !important;
  height: 46px !important;
  margin: 4px !important;
}

:deep(.ql-toolbar .ql-color-picker .ql-picker-label) {
  width: 50px !important;
  height: 46px !important;
  padding: 10px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.ql-toolbar .ql-color-picker .ql-picker-label svg) {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;
}

:deep(.ql-toolbar .ql-icon-picker) {
  width: 50px !important;
  height: 46px !important;
  margin: 4px !important;
}

:deep(.ql-toolbar .ql-icon-picker .ql-picker-label) {
  width: 50px !important;
  height: 46px !important;
  padding: 10px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.ql-toolbar .ql-icon-picker .ql-picker-label svg) {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;
}

:deep(.ql-toolbar .ql-header.ql-picker .ql-picker-label svg) {
  width: 20px !important;
  height: 20px !important;
  position: absolute !important;
  right: 15px !important;
  top: 70% !important;
  transform: translateY(-50%) !important;
  color: var(--text-primary) !important;
}

// Элементы в выпадающих меню
:deep(.ql-toolbar .ql-picker-options .ql-picker-item) {
  padding: 12px 16px !important;
  min-height: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  font-size: 15px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}

:deep(.ql-toolbar .ql-color-picker .ql-picker-item) {
  width: 20px !important;
  height: 20px !important;
  margin: 4px !important;
}

:deep(.ql-toolbar .ql-icon-picker .ql-picker-item) {
  width: 32px !important;
  height: 32px !important;
  padding: 4px !important;
}




:deep(.ql-toolbar .ql-header.ql-picker) {
  width: 160px !important;
}

:deep(.ql-toolbar .ql-font.ql-picker) {
  width: 160px !important;
}

:deep(.ql-toolbar .ql-header.ql-picker .ql-picker-label) {
  width: 160px !important;
  padding: 0 45px 0 20px !important;
  font-size: 16px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  position: relative !important;
  justify-content: flex-start !important;
}

:deep(.ql-toolbar .ql-font.ql-picker .ql-picker-label) {
  width: 160px !important;
  padding: 0 20px !important;
  font-size: 16px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

// Выпадающие меню
:deep(.ql-toolbar .ql-header.ql-picker .ql-picker-options) {
  width: 180px !important;
  min-width: 180px !important;
  max-width: 200px !important;
}

:deep(.ql-toolbar .ql-font.ql-picker .ql-picker-options) {
  width: 180px !important;
  min-width: 180px !important;
  max-width: 200px !important;
}


:deep(.ql-snow .ql-picker.ql-expanded .ql-picker-options) {
  left: 0px !important;
  top: 70px !important;
}

:deep(.ql-container) {
  background: var(--bg-primary) !important;  // Меняем на bg-primary (было btn-primary)
  background-color: var(--bg-primary) !important;  // Дублируем для надежности
  border: none;
  border-radius: 0 0 50px 50px;
  width: 1300px;
  margin-left: 48px;
}

:deep(.ql-editor) {
  min-height: 500px;
  padding: 24px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}

:deep(.ql-container.ql-snow) {
  margin-top: 20px;
  border-radius: 25px !important;
  background: var(--bg-primary) !important;
}

:deep(.p-editor-content.ql-container.ql-snow) {
  border-radius: 25px !important;
  overflow: hidden !important;
  border-color: none !important;
  background-color: var(--bg-primary) !important;
}

:deep(.ql-container.ql-snow) {
  background-color: var(--bg-primary) !important;
}

:deep(.p-editor .ql-container) {
  background-color: var(--bg-primary) !important;
}

:deep(.p-editor-content) {
  background-color: var(--bg-primary) !important;
}

// Tags Section
.tags-section {
  width: 100%;
  margin-top: 48px;
  padding: 0 48px;
}

// Difficulty Section
.difficulty-section {
  width: 100%;
  margin-top: 48px;
  padding: 0 48px;
}

.difficulty-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;
}

.difficulty-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  width: 460px;
  margin-top: 8px;
  margin-bottom: 24px;
}

.difficulty-circles {
  display: flex;
  gap: 16px;
  align-items: center;
}

.difficulty-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-violet);
  }
  
  // Color variants for different difficulties
  &.difficulty-easy {
    &:hover {
      border-color: rgba(34, 197, 94, 0.7);
      background-color: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    
    &.selected {
      border-color: #22c55e;
      background-color: rgba(34, 197, 94, 0.2);
      color: #22c55e;
    }
  }
  
  &.difficulty-medium {
    &:hover {
      border-color: rgba(245, 158, 11, 1);
      background-color: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
    }
    
    &.selected {
      border-color: #f59e0b;
      background-color: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
    }
  }
  
  &.difficulty-hard {
    &:hover {
      border-color: rgba(239, 68, 68, 1);
      background-color: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
    
    &.selected {
      border-color: #ef4444;
      background-color: rgba(239, 68, 68, 0.2);
      color: #ef4444;
    }
  }
}

.difficulty-icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  fill: currentColor;
  
  .difficulty-circle:hover & {
    transform: scale(1.1);
  }
  
  .difficulty-circle.selected & {
    transform: scale(1.1);
  }
}

/* Цвета для иконок в зависимости от сложности */
.difficulty-circle.difficulty-easy .difficulty-icon {
  fill: #22c55e !important;
}

.difficulty-circle.difficulty-medium .difficulty-icon {
  fill: #f59e0b !important;
}

.difficulty-circle.difficulty-hard .difficulty-icon {
  fill: #ef4444 !important;
}

/* Hover эффекты для иконок */
.difficulty-circle:hover .difficulty-icon {
  transform: scale(1.1);
}

/* ЗАПОЛНЕНИЕ иконки цветом при выборе */
.difficulty-circle.selected.difficulty-easy .difficulty-icon {
  fill: #16a34a !important; /* Полное заполнение зеленым */
}

.difficulty-circle.selected.difficulty-medium .difficulty-icon {
  fill: #d97706 !important; /* Полное заполнение оранжевым */
}

.difficulty-circle.selected.difficulty-hard .difficulty-icon {
  fill: #dc2626 !important; /* Полное заполнение красным */
}

.tags-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;
}

.tags-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  width: 460px;
  margin-top: 8px;
  margin-bottom: 16px;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

// Wrapper для тега с кнопкой удаления
.custom-tag-wrapper {
  display: inline-flex;
  align-items: center;
  padding: 13px 20px;
  font-size: 20.8px;
  font-family: var(--font-sans);
  font-weight: bold;
  border-radius: 15.6px;
  transition: all 0.3s ease;
  gap: 12px;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  // Цвета для разных типов тегов с повышенной прозрачностью (70%)
  &.tag-success {
    background-color: rgba(34, 197, 94, 0.3);
  }
  
  &.tag-info {
    background-color: rgba(59, 130, 246, 0.3);
  }
  
  &.tag-warning {
    background-color: rgba(245, 158, 11, 0.3);
  }
  
  &.tag-danger {
    background-color: rgba(239, 68, 68, 0.3);
  }
  
  &.tag-secondary {
    background-color: rgba(100, 116, 139, 0.3);
  }
}

.tag-text {
  font-weight: bold;
  color: white;
}

// Кнопка удаления тега (крестик внутри тега)
.tag-remove-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  flex-shrink: 0;
  
  &:hover {
    transform: scale(1.2);
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.9);
  }
  
  i {
    font-size: 11px;
    font-weight: bold;
  }
}

.tag-input-wrapper {
  position: relative;
  width: 100%;
}

.tags-input-field {
  width: 100%;
  height: 68px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-weight: bold;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 22px;
  color: var(--text-primary);
  transition: all 0.3s ease;

  &::placeholder {
    color: var(--text-third);
  }

  &:focus {
    outline: none;
    border: 2px solid var(--primary-violet);
    border-radius: 20px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.tags-suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: var(--btn-primary);
  border-radius: 20px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary-violet);
    border-radius: 4px;
  }
}

.suggestion-item {
  padding: 14px 20px;
  color: var(--text-primary);
  font-size: 18px;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:first-child {
    border-radius: 20px 20px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 20px 20px;
  }
  
  &:only-child {
    border-radius: 20px;
  }
  
  &:hover {
    background: rgba(139, 92, 246, 0.3);
  }
}

.tags-counter {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  margin-top: 12px;
  font-weight: bold;
  margin-bottom: 0;
}

.action-buttons {
  width: 100%;
  display: flex;
  gap: 4px;
  margin-top: 25px;
}

.create-button {
  width: 269px;
  height: 56px;
  background: linear-gradient(to right, var(--primary-violet) 0%, var(--primary-pink) 100%);
  border: none;
  border-radius: 20px;
  font-size: 25px;
  display: flex;
  margin-left: 48px;
  margin-top: 16px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding-left: 32px;

  &:hover {
    opacity: 0.8;
  }
}

.preview-button {
  width: 280px;
  height: 56px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-size: 25px;
  display: flex;
  margin-left: 16px;
  margin-top: 16px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding-left: 32px;

  &:hover {
    opacity: 0.8;
  }
}

.draft-button {
  width: 290px;
  height: 56px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-size: 25px;
  display: flex;
  margin-left: 16px;
  margin-top: 16px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding-left: 32px;

  &:hover {
    opacity: 0.8;
  }
}

.button-icon {
  font-size: 24px;
  margin-right: 12px;

  .preview-button & {
    font-size: 26px;
  }

  .draft-button & {
    font-size: 24px;
  }
}

.button-text {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 20px;
}

// Publication time section
/* .publication-time-section {
  width: 100%;
  margin-top: 48px;
}

.publication-time-header {
  display: flex;
  align-items: center;
} */

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

:deep(.p-editor .p-editor-content .ql-editor) {
  background-color: var(--bg-primary) !important;
}

// Custom checkbox styling
.checkbox {
  width: 40px;
  height: 40px;
  border: 2px solid #6b7280;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 48px;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #9CA3AF;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &.checked {
    background-color: #8B5CF6;
    border: 2px solid white;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ripple 0.6s ease-out;
    }

  }
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 60px;
    height: 60px;
    opacity: 0;
  }
}

@keyframes checkmark {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.checkmark-icon {
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: checkmark 0.4s ease-out 0.1s both;
  color: white;
  font-weight: bold;
}

.checkbox-label {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 8px;
}

/* .publication-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 10px;
  margin-left: 48px;
  width: 460px;
}

.time-inputs {
  display: flex;
  margin-top: 16px;
  margin-left: 48px;
  gap: 24px;
}

.date-input {
  width: 400px;
  height: 65px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: var(--text-primary);
  cursor: text;
  transition: all 0s ease-in-out;
  padding: 0 20px;

  &::placeholder {
    color: var(--text-third);
  }

  &:focus {
    outline: none;
    border: 2px solid white;
    border-radius: 20px;
  }

}

.time-input {
  width: 300px;
  height: 65px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: var(--text-primary);
  cursor: text;
  transition: all 0s ease-in-out;
  padding: 0 20px;

  &::placeholder {
    color: var(--text-third);
  }

  &:focus {
    outline: none;
    border: 2px solid white;
    border-radius: 20px;
  }

}

.publication-label {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 32px;
  margin-left: 48px;
} */

// Ranks section
.ranks-section {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}

// Additional settings
.additional-settings-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 32px;
  margin-left: 48px;
}

.additional-settings {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}

// API Error styles
.api-error {
  margin: 16px 48px;
  padding: 12px;
  background-color: rgba(255, 59, 59, 0.1);
  border: 1px solid #FF3B3B;
  border-radius: 8px;
}

.api-error-message {
  color: #FF3B3B;
  font-size: 16px;
  font-family: var(--font-sans);
  margin: 0;
  text-align: center;
}

// Disabled button states
.create-button:disabled,
.preview-button:disabled,
.draft-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.create-button:hover:not(:disabled) {
  opacity: 0.8;
}

.preview-button:hover:not(:disabled) {
  opacity: 0.8;
}

.draft-button:hover:not(:disabled) {
  opacity: 0.8;
}

.image-preview {
    margin-top: 12px;
}
.preview-img {
    width: 100%;
    max-width: 420px;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 6px 18px rgba(0,0,0,0.2);
}
.uploading-note {
    margin-top: 8px;
    color: var(--text-secondary);
    font-style: italic;
}
.preview-title {
    margin: 8px 0;
    color: var(--text-primary);
    font-size: 14px;
}

</style>
