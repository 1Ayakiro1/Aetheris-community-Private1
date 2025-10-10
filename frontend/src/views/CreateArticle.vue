<template>
  <div class="create-article-container">
    <!-- Body -->
    <div class="content-wrapper">
      <!-- Path block -->
      <div class="path-block">
        <h2 class="path-title">{{ $t('create-article.path') }} <a href="#" class="path-link">path</a></h2>
      </div>
      
      <!-- Warning block -->
      <div class="warning-block">
        <h2 class="warning-title">{{ $t('create-article.h1') }}</h2>
        <h2 class="warning-subtitle">{{ $t('create-article.h2') }}</h2>
        <button class="read-rules-button">{{ $t('create-article.button1') }}</button>
      </div>
      
      <!-- Edit block -->
      <div class="edit-block">
        <h2 class="edit-title">{{ $t('create-article.h4') }}</h2>
        <h2 class="edit-subtitle">{{ $t('create-article.h5') }}</h2>
        <input type="text" placeholder="Enter title..." class="title-input" v-model="articleTitle">
        
        <!-- Article editor block -->
        <Editor 
          v-model="articleContent" 
          editorStyle="height: 500px;"
        />
        
        <h2 class="tags-title">{{ $t('create-article.h6') }}</h2>
        <h2 class="tags-subtitle">{{ $t('create-article.h7') }}</h2>
        <input type="text" placeholder="Enter tags (separated by commas)..." class="tags-input" v-model="articleTags">
        
        <!-- Action buttons -->
        <div class="action-buttons">
          <button class="create-button" @click="handleCreateArticle" :disabled="loading">
            <i v-if="!loading" class="pi pi-send button-icon"></i>
            <i v-else class="pi pi-spin pi-spinner button-icon"></i>
            <p class="button-text">{{ isEditing ? $t('create-article.button5') : $t('create-article.button2') }}</p>
          </button>
          <button class="preview-button" @click="previewArticle" :disabled="loading">
            <i class="pi pi-eye button-icon"></i>
            <p class="button-text">{{ $t('create-article.button3') }}</p>
          </button>
          <button class="draft-button" @click="saveDraft" :disabled="loading">
            <i class="pi pi-save button-icon"></i>
            <p class="button-text">{{ $t('create-article.button4') }}</p>
          </button>
        </div>
        
        <!-- Error Display -->
        <div v-if="error" class="api-error">
          <p class="api-error-message">{{ error }}</p>
        </div>
        
        <!-- Publication time -->
        <!-- <div class="publication-time-section">
          <div class="publication-time-header">
            <div class="checkbox-item">
              <div class="checkbox" :class="{ checked: publicationTimeEnabled }" @click="publicationTimeEnabled = !publicationTimeEnabled">
                <i v-if="publicationTimeEnabled" class="pi pi-check checkmark-icon"></i>
              </div>
              <p class="checkbox-label">{{ $t('create-article.h6') }}</p>
            </div>
          </div>
          <h2 class="publication-subtitle">{{ $t('create-article.h7') }}</h2>
          <div class="time-inputs">
            <input type="text" placeholder="ddmmyy" class="date-input" />
            <input type="text" placeholder="00:00 am/pm" class="time-input" />
          </div>
          <p class="publication-label">{{ $t('create-article.h6') }}</p>
        </div> -->
        
        <!-- Ranks section 
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
        </div> -->
        
        <!-- Additional settings
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
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Editor from 'primevue/editor'

const { t } = useI18n()

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
// const publicationTimeEnabled = ref(false)
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
      
        // Перенаправляем на главную страницу со статьями
        await router.push('/')
      
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
</script>

<style lang="scss" scoped>
.create-article-container {
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding: 100px 16px 200px;
  box-sizing: border-box;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 60px 12px 120px;
  }
  
  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 80px 20px 160px;
    max-width: 1000px;
  }
  
  /* Десктоп */
  @media (min-width: 1025px) {
    padding: 100px 24px 200px;
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
</style>