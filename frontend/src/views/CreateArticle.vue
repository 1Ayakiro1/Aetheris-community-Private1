<template>
  <div class="create-article-container">
    <!-- Body -->
    <div class="content-wrapper">
      <!-- Path block -->
      <div class="path-block">
        <h2 class="path-title">Create theme in: <a href="#" class="path-link">path</a></h2>
      </div>
      
      <!-- Warning block -->
      <div class="warning-block">
        <h2 class="warning-title">Before making an article, read the section rules</h2>
        <h2 class="warning-subtitle">For violation of the rules your article may be restricted or deleted.</h2>
        <button class="read-rules-button">Read the rules</button>
      </div>
      
      <!-- Edit block -->
      <div class="edit-block">
        <h2 class="edit-title">Article title</h2>
        <h2 class="edit-subtitle">Give a brief description of the article</h2>
        <input type="text" placeholder="Enter title..." class="title-input" v-model="articleTitle">
        
        <!-- Article editor block -->
        <div class="article-editor-container">
          <Editor 
            v-model="articleContent" 
            editorStyle="height: 500px"
            class="custom-editor"
          />
        </div>
        
        <h2 class="tags-title">Tags</h2>
        <h2 class="tags-subtitle">Add a tag for better promotion of the article</h2>
        <input type="text" placeholder="Enter tags (separated by commas)..." class="tags-input" v-model="articleTags">
        
        <!-- Action buttons -->
        <div class="action-buttons">
          <button class="create-button" @click="handleCreateArticle" :disabled="loading">
            <i v-if="!loading" class="pi pi-send button-icon"></i>
            <i v-else class="pi pi-spin pi-spinner button-icon"></i>
            <p class="button-text">{{ isEditing ? 'Update' : 'Create' }}</p>
          </button>
          <button class="preview-button" @click="previewArticle" :disabled="loading">
            <i class="pi pi-eye button-icon"></i>
            <p class="button-text">Preview</p>
          </button>
          <button class="draft-button" @click="saveDraft" :disabled="loading">
            <i class="pi pi-save button-icon"></i>
            <p class="button-text">Save in draft</p>
          </button>
        </div>
        
        <!-- Error Display -->
        <div v-if="error" class="api-error">
          <p class="api-error-message">{{ error }}</p>
        </div>
        
        <!-- Publication time -->
        <div class="publication-time-section">
          <div class="publication-time-header">
            <div class="checkbox-item">
              <div class="checkbox" :class="{ checked: publicationTimeEnabled }" @click="publicationTimeEnabled = !publicationTimeEnabled">
                <i v-if="publicationTimeEnabled" class="pi pi-check checkmark-icon"></i>
              </div>
              <p class="checkbox-label">Publication time</p>
            </div>
          </div>
          <h2 class="publication-subtitle">Add a tag for better promotion of the article</h2>
          <div class="time-inputs">
            <input type="text" placeholder="ddmmyy" class="date-input" />
            <input type="text" placeholder="00:00 am/pm" class="time-input" />
          </div>
          <p class="publication-label">Publication time</p>
        </div>
        
        <!-- Ranks section -->
        <div class="ranks-section">
          <div class="checkbox-item">
            <div class="checkbox" :class="{ checked: rank1Enabled }" @click="rank1Enabled = !rank1Enabled">
              <i v-if="rank1Enabled" class="pi pi-check checkmark-icon"></i>
            </div>
            <p class="checkbox-label">rank</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox" :class="{ checked: rank2Enabled }" @click="rank2Enabled = !rank2Enabled">
              <i v-if="rank2Enabled" class="pi pi-check checkmark-icon"></i>
            </div>
            <p class="checkbox-label">rank</p>
          </div>
        </div>
        
        <!-- Additional settings -->
        <p class="additional-settings-title">Additional settings</p>
        <div class="additional-settings">
          <div class="checkbox-item">
            <div class="checkbox" :class="{ checked: disableCommenting }" @click="disableCommenting = !disableCommenting">
              <i v-if="disableCommenting" class="pi pi-check checkmark-icon"></i>
            </div>
            <p class="checkbox-label">Disable commenting</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox" :class="{ checked: doNotNotify }" @click="doNotNotify = !doNotNotify">
              <i v-if="doNotNotify" class="pi pi-check checkmark-icon"></i>
            </div>
            <p class="checkbox-label">Do not notify about article release</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox" :class="{ checked: hideContacts }" @click="hideContacts = !hideContacts">
              <i v-if="hideContacts" class="pi pi-check checkmark-icon"></i>
            </div>
            <p class="checkbox-label">Hide contacts</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox" :class="{ checked: hideCommentatorsInfo }" @click="hideCommentatorsInfo = !hideCommentatorsInfo">
              <i v-if="hideCommentatorsInfo" class="pi pi-check checkmark-icon"></i>
            </div>
            <p class="checkbox-label">Hide commentators info</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox" :class="{ checked: disableReplying }" @click="disableReplying = !disableReplying">
              <i v-if="disableReplying" class="pi pi-check checkmark-icon"></i>
            </div>
            <p class="checkbox-label">Disable replying to comments</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticles } from '../composables/useArticles'
import type { CreateArticleRequest } from '../types/article'

// Article data
const articleTitle = ref('')
const articleContent = ref('')
const articleTags = ref('')
const router = useRouter()

// API integration
const { createArticle, updateArticle, loading, error } = useArticles()
const isEditing = ref(false)
const editingArticleId = ref<number | null>(null)

// Reactive variables for checkboxes
const publicationTimeEnabled = ref(false)
const rank1Enabled = ref(false)
const rank2Enabled = ref(false)
const disableCommenting = ref(false)
const doNotNotify = ref(false)
const hideContacts = ref(false)
const hideCommentatorsInfo = ref(false)
const disableReplying = ref(false)

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
    tags: articleTags.value.split(',').map(tag => tag.trim()).filter(tag => tag),
    settings: {
      publicationTime: publicationTimeEnabled.value,
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
    const articleData: CreateArticleRequest = {
      title: articleTitle.value.trim(),
      content: articleContent.value,
      excerpt: generateExcerpt(articleContent.value),
      tags: articleTags.value.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: 'published',
      category: 'General' // Можно добавить выбор категории
    }

    let result
    if (isEditing.value && editingArticleId.value) {
      result = await updateArticle(editingArticleId.value, articleData)
    } else {
      result = await createArticle(articleData)
    }

    if (result) {
      // Очищаем форму
      articleTitle.value = ''
      articleContent.value = ''
      articleTags.value = ''
      
      // Очищаем черновик
      localStorage.removeItem('article_draft')
      
      // Перенаправляем на страницу статьи или список статей
      await router.push('/articles')
      
      alert(isEditing.value ? 'Статья успешно обновлена!' : 'Статья успешно создана!')
    }
  } catch (err) {
    console.error('Error creating/updating article:', err)
    alert('Произошла ошибка при сохранении статьи. Попробуйте еще раз.')
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

const saveDraft = () => {
  const articleData = exportToJSON()
  localStorage.setItem('article_draft', JSON.stringify(articleData))
  alert('Черновик сохранен!')
}

onMounted(() => {
  // Load draft if exists
  const draft = localStorage.getItem('article_draft')
  if (draft) {
    try {
      const draftData = JSON.parse(draft)
      articleTitle.value = draftData.title || ''
      articleTags.value = draftData.tags?.join(', ') || ''
      articleContent.value = draftData.content?.html || ''
      
      if (draftData.settings) {
        publicationTimeEnabled.value = draftData.settings.publicationTime || false
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
</script>

<style lang="scss" scoped>
.create-article-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;
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
  height: 101px;
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
  height: 2000px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
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

// Article editor container
.article-editor-container {
  width: 1300px;
  margin-top: 56px;
  margin-left: 48px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

// Custom PrimeVue Editor styling
.custom-editor {
  :deep(.p-editor-toolbar) {
    background: var(--btn-primary);
    border: none;
    border-radius: 20px 20px 0 0;
    padding: 16px 20px;
    border-bottom: 2px solid var(--bg-primary);
    
    .ql-formats {
      margin-right: 16px;
    }
    
    button, select {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: var(--text-primary) !important;
      padding: 8px;
      margin: 0 2px;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: var(--primary-violet) !important;
        transform: translateY(-1px);
      }
      
      &.ql-active {
        background: linear-gradient(135deg, var(--primary-violet), var(--primary-pink)) !important;
        border-color: transparent !important;
        color: white !important;
      }
    }
    
    select {
      background: var(--bg-secondary) !important;
      color: var(--text-primary) !important;
      
      option {
        background: var(--bg-secondary) !important;
        color: var(--text-primary) !important;
      }
    }
    
    .ql-stroke {
      stroke: var(--text-primary) !important;
    }
    
    .ql-fill {
      fill: var(--text-primary) !important;
    }
  }
  
  :deep(.p-editor-content) {
    background: var(--btn-primary);
    border: none;
    border-radius: 0 0 20px 20px;
    
    .ql-editor {
      min-height: 500px;
      padding: 24px;
      font-family: var(--font-sans);
      font-size: 16px;
      line-height: 1.6;
      color: var(--text-primary) !important;
      background: transparent;
      
      &::before {
        color: var(--text-third) !important;
        font-style: italic;
        left: 24px;
        right: 24px;
      }
      
      &:focus {
        outline: none;
      }
      
      // Стилизация содержимого редактора
      h1, h2, h3, h4, h5, h6 {
        color: var(--text-primary) !important;
        margin: 20px 0 10px 0;
        font-weight: 700;
      }
      
      h1 { 
        font-size: 2.2em; 
        color: var(--primary-violet) !important;
        border-bottom: 2px solid var(--primary-violet);
        padding-bottom: 8px;
      }
      
      h2 { 
        font-size: 1.8em; 
        color: var(--primary-violet) !important;
      }
      
      h3 { 
        font-size: 1.5em;
      }
      
      strong, b {
        color: var(--text-primary) !important;
        font-weight: 700;
      }
      
      em, i {
        color: var(--text-secondary) !important;
        font-style: italic;
      }
      
      code {
        background: var(--bg-secondary) !important;
        color: var(--primary-violet) !important;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
      }
      
      blockquote {
        border-left: 4px solid var(--primary-violet) !important;
        background: var(--bg-secondary) !important;
        padding: 16px 20px;
        margin: 16px 0;
        border-radius: 0 8px 8px 0;
        
        p {
          margin: 0;
          color: var(--text-secondary) !important;
          font-style: italic;
        }
      }
      
      ul, ol {
        padding-left: 20px;
        
        li {
          margin: 8px 0;
          color: var(--text-primary) !important;
        }
      }
      
      a {
        color: var(--primary-violet) !important;
        text-decoration: none;
        border-bottom: 1px solid var(--primary-violet);
        transition: all 0.3s ease;
        
        &:hover {
          color: var(--primary-pink) !important;
          border-bottom-color: var(--primary-pink);
        }
      }
      
      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 16px 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

// Tags section
.tags-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 24px;
  margin-left: 48px;
}

.tags-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 48px;
  width: 460px;
  margin-top: 10px;
}

.tags-input {
  width: 1300px;
  height: 68px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  margin-top: 16px;
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

// Action buttons
.action-buttons {
  width: 100%;
  display: flex;
  gap: 4px;
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
.publication-time-section {
  width: 100%;
  margin-top: 48px;
}

.publication-time-header {
  display: flex;
  align-items: center;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
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

.publication-subtitle {
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
}

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
</style>