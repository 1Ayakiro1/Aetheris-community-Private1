<template>
  <div class="settings-profile-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <SettingsSidebar />
      
      <!-- Content -->
      <div class="content">
        <!-- Profile Information Section -->
        <div class="profile-section">
          <h1 class="section-title">Profile information</h1>
          <h2 class="section-subtitle">Menu for changing profile information that is displayed to all users</h2>
          
          <!-- Avatar Section -->
          <h1 class="section-title">Avatar</h1>
          <div class="avatar-section">
            <div class="avatar-placeholder"></div>
            <div class="avatar-buttons">
              <button class="avatar-button" @click="openUploadModal">upload image</button>
              <button class="avatar-button" @click="openDeleteModal">remove image</button>
            </div>
            <button class="reset-button" @click="openResetModal">
              <svg class="reset-icon" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.20831 3.02937V10.7742M1.20831 10.7742H8.45831M1.20831 10.7742L6.81498 5.14629C8.48358 3.36681 10.6484 2.21484 12.9831 1.86393C15.3179 1.51302 17.6962 1.98219 19.7597 3.20074C21.8231 4.4193 23.46 6.32123 24.4236 8.61996C25.3872 10.9187 25.6253 13.4897 25.1022 15.9456C24.579 18.4015 23.3228 20.6092 21.523 22.2362C19.7231 23.8631 17.477 24.8211 15.1231 24.9659C12.7693 25.1106 10.4351 24.4342 8.4724 23.0386C6.50968 21.643 5.02471 19.6038 4.24123 17.2282" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="reset-text">reset</p>
            </button>
          </div>
          
          <!-- Nickname Section -->
          <h1 class="section-title">Nickname</h1>
          <h2 class="section-subtitle">Change the name displayed on your account</h2>
          <input 
            type="text" 
            placeholder="Enter your nickname" 
            class="nickname-input"
            :class="{ 'error': nicknameError }"
            v-model="nickname"
          />
          <p v-if="nicknameError" class="error-message">{{ nicknameError }}</p>
          
          <!-- Bio Section -->
          <div class="bio-section">
            <h1 class="section-title">Bio</h1>
            <h2 class="section-subtitle">Add information about you and your hobbies and skills</h2>
            <textarea 
              placeholder="Enter your bio" 
              class="bio-input"
              :class="{ 'error': bioError }"
              v-model="bio"
            ></textarea>
            <p v-if="bioError" class="error-message">{{ bioError }}</p>
            <p class="character-count">{{ bio.length }}/300</p>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
    
    <!-- Upload Avatar Modal -->
    <Transition name="modal">
      <div v-if="isUploadModalOpen" class="modal-overlay" @click="closeUploadModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
          <h2 class="modal-title">Upload Avatar</h2>
          <button class="modal-close" @click="closeUploadModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          </div>
        
        <div class="modal-body">
          <!-- Drag & Drop Zone -->
          <div 
            class="dropzone" 
            :class="{ 'drag-over': isDragOver }"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @click="openFileExplorer"
          >
            <div class="dropzone-content">
              <svg class="upload-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h3 class="dropzone-title">Drag & Drop your image here</h3>
              <p class="dropzone-subtitle">or click to browse files</p>
              <p class="dropzone-info">Supports: JPG, PNG, GIF (max 5MB)</p>
            </div>
          </div>
          
          <!-- Preview Area -->
          <div v-if="selectedFile" class="preview-area">
            <img :src="previewUrl" alt="Preview" class="preview-image" />
            <div class="preview-info">
              <p class="file-name">{{ selectedFile.name }}</p>
              <p class="file-size">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-button secondary" @click="openFileExplorer">
            <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Browse Files
          </button>
          <button class="modal-button primary" @click="uploadAvatar" :disabled="!selectedFile">
            Upload Avatar
          </button>
        </div>
        </div>
      </div>
    </Transition>
    
    <!-- Delete Confirmation Modal -->
    <Transition name="modal">
      <div v-if="isDeleteModalOpen" class="modal-overlay" @click="closeDeleteModal">
        <div class="modal-content delete-modal" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Delete Avatar</h2>
            <button class="modal-close" @click="closeDeleteModal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="warning-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#FF6B6B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="warning-title">Are you sure you want to delete your avatar?</h3>
            <p class="warning-message">This action cannot be undone. Your profile will display the default avatar after deletion.</p>
          </div>
          
          <div class="modal-footer">
            <button class="modal-button secondary" @click="closeDeleteModal">
              Cancel
            </button>
            <button class="modal-button danger" @click="confirmDeleteAvatar">
              Delete Avatar
            </button>
          </div>
        </div>
      </div>
    </Transition>
    
    <!-- Reset Confirmation Panel -->
    <div v-if="isResetPanelOpen" class="reset-panel-overlay" @click="closeResetPanel">
      <div class="reset-panel" @click.stop>
        <div class="reset-panel-content">
          <p class="reset-panel-text">Reset profile settings?</p>
          <div class="reset-panel-buttons">
            <button class="reset-panel-button cancel" @click="closeResetPanel">Cancel</button>
            <button class="reset-panel-button confirm" @click="confirmReset">Reset</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Hidden File Input -->
    <input 
      ref="fileInput" 
      type="file" 
      accept="image/*" 
      @change="handleFileSelect" 
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'

const nickname = ref('')
const bio = ref('')

// Состояния ошибок валидации тута гыг
const nicknameError = ref('')
const bioError = ref('')

// Upload Modal States
const isUploadModalOpen = ref(false)
const isDragOver = ref(false)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

// Delete Modal States
const isDeleteModalOpen = ref(false)

// Reset Panel States
const isResetPanelOpen = ref(false)

// Валидация никнейма
const validateNickname = (value: string): string => {
  if (!value.trim()) {
    return 'Nickname is required'
  }
  
  if (value.length > 50) {
    return 'Nickname must be no more than 50 characters'
  }
  
  // Разрешение применимо только к латинице и кириллице
  const allowedPattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/
  if (!allowedPattern.test(value)) {
    return 'Nickname can only contain Latin letters, Cyrillic letters and spaces'
  }
  
  return ''
}

const validateBio = (value: string): string => {
  if (value.length > 300) {
    return 'Bio must be no more than 300 characters'
  }
  
  return ''
}


watch(nickname, (newValue) => {
  const sanitized = newValue.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
  if (sanitized !== newValue) {
    nickname.value = sanitized
  }
  nicknameError.value = validateNickname(nickname.value)
})

watch(bio, (newValue) => {
  bioError.value = validateBio(newValue)
})

// Upload Modal Functions
const openUploadModal = () => {
  isUploadModalOpen.value = true
  resetUploadState()
}

const closeUploadModal = () => {
  isUploadModalOpen.value = false
  resetUploadState()
}

const resetUploadState = () => {
  selectedFile.value = null
  previewUrl.value = ''
  isDragOver.value = false
}

const openFileExplorer = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB')
    return
  }
  
  selectedFile.value = file
  
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const uploadAvatar = () => {
  if (!selectedFile.value) return
  
  // Тут логика загрузки авы на сервера (!)
  console.log('Uploading avatar:', selectedFile.value)
  alert('Avatar uploaded successfully!')
  
  closeUploadModal()
}

// Delete Modal Functions
const openDeleteModal = () => {
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const confirmDeleteAvatar = () => {
  // Здесь будет логика удаления аватара
  console.log('Deleting avatar...')
  alert('Avatar deleted successfully!')
  
  closeDeleteModal()
}

// Reset Panel Functions
const openResetModal = () => {
  isResetPanelOpen.value = true
}

const closeResetPanel = () => {
  isResetPanelOpen.value = false
}

const confirmReset = () => {
  // Здесь будет логика сброса настроек профиля (также через бд запросы)
  console.log('Resetting profile settings...')
  alert('Profile settings reset successfully!')
  
  closeResetPanel()
}
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.settings-profile-container {
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 0 16px;
  box-sizing: border-box;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 0 12px;
  }
  
  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 20px;
    max-width: 1000px;
  }
  
  /* Десктоп */
  @media (min-width: 1025px) {
    padding: 0 24px;
    max-width: 1400px;
  }
}

.main-body {
  display: flex;
margin-top: 48px; // mt-12
}


// Content Styles
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
margin-left: 12px;
}

.profile-section {
  background-color: var(--bg-secondary);
width: 980px;
height: 949px;
border-radius: 25px;
margin-bottom: 200px;
  display: flex;
  flex-direction: column;
}

.section-title {
margin-top: 40px;
margin-left: 48px; 
  color: var(--text-primary);
font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
}

.section-subtitle {
  color: var(--text-secondary);
font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
margin-top: 4px;
margin-left: 48px;
width: 700px;
}

// Avatar Section
.avatar-section {
  display: flex;
  flex-direction: row;
gap: 16px;
margin-left: 48px;
margin-top: 16px;
}

.avatar-placeholder {
  background-color: var(--btn-primary);
  border-radius: 50%;
width: 150px;
height: 150px;
}

.avatar-buttons {
  display: flex;
  flex-direction: column;
gap: 8px;
}

.avatar-button {
width: 230px;
height: 56px;
  background-color: rgba(67, 73, 86, 0);
border-radius: 15px;
  color: var(--text-primary);
font-size: 23px;
  font-family: var(--font-sans);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }

  &:first-child {
margin-top: 16px; // mt-4
  }
}

.reset-button {
width: 200px;
height: 56px;
  background-color: rgba(67, 73, 86, 0);
border-radius: 15px;
  color: var(--text-primary);
font-size: 23px;
  font-family: var(--font-sans);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
margin-top: 48px; // mt-12

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.reset-icon {
width: 27px;
height: 26px;
}

.reset-text {
  color: var(--text-primary);
font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
margin-left: 8px;
}

// Input Fields
.nickname-input {
width: 360px;
height: 65px;
  background-color: var(--btn-primary);
border-radius: 15px;
margin-left: 48px;
margin-top: 16px;
  font-weight: bold;
  padding: 0 16px;
  
  @include responsive-2k {
    padding: 0 22.4px;
  }
  
  @include responsive-4k {
    padding: 0 28.8px;
  }
font-size: 22px;
  color: var(--text-primary);
  border: none;
  font-family: var(--font-sans);

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border: 2px solid var(--primary-blue);
  }
  
  &.error {
    border: 2px solid #FF3B3B;
  }
}

.bio-input {
width: 520px;
height: 167px;
  background-color: var(--btn-primary);
border-radius: 15px;
margin-left: 48px;
margin-top: 16px;
  font-weight: bold;
padding: 16px;
font-size: 22px;
  color: var(--text-primary);
  border: none;
  font-family: var(--font-sans);
  resize: vertical;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border: 2px solid var(--primary-blue);
  }
  
  &.error {
    border: 2px solid #FF3B3B;
  }
}

.error-message {
  color: #FF3B3B;
font-size: 14px;
  font-family: var(--font-sans);
margin-top: 4px;
margin-left: 48px;
  margin-bottom: 0;
}

.character-count {
  color: var(--text-secondary);
font-size: 14px;
  font-family: var(--font-sans);
margin-top: 4px;
margin-left: 48px;
  margin-bottom: 0;
}

// Bio section styles are inherited from parent

// Upload Modal Styles
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

// Modal Transition Animations
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-content {
  background-color: var(--bg-secondary);
border-radius: 30px;
width: 600px;
  max-height: 80vh;
  overflow: hidden;
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: modalContentAppear 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) 0.1s both;
}

@keyframes modalContentAppear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px 20px;
  border-bottom: 2px solid var(--text-secondary);
}

.modal-title {
  color: var(--text-primary);
  font-size: 28px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--btn-primary);
  }
}

.modal-body {
  padding: 40px;
}

.dropzone {
  border: 3px dashed var(--text-secondary);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: var(--btn-primary);
  animation: dropzoneAppear 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) 0.2s both;
  
  &:hover {
    border-color: var(--primary-violet);
    background-color: rgba(139, 92, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &.drag-over {
    border-color: var(--primary-violet);
    background-color: rgba(139, 92, 246, 0.2);
    transform: scale(1.02) translateY(-2px);
  }
}

@keyframes dropzoneAppear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.upload-icon {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.dropzone:hover .upload-icon {
  opacity: 1;
}

.dropzone-title {
  color: var(--text-primary);
  font-size: 24px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;
}

.dropzone-subtitle {
  color: var(--text-secondary);
  font-size: 18px;
  font-family: var(--font-sans);
  margin: 0;
}

.dropzone-info {
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
  margin: 0;
  opacity: 0.8;
}

.preview-area {
  margin-top: 30px;
  padding: 20px;
  background-color: var(--btn-primary);
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  animation: previewAppear 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s both;
}

@keyframes previewAppear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.preview-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--text-secondary);
}

.preview-info {
  flex: 1;
}

.file-name {
  color: var(--text-primary);
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0 0 5px 0;
}

.file-size {
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 30px;
  gap: 20px;
  animation: footerAppear 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) 0.3s both;
}

@keyframes footerAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 15px;
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &.secondary {
    background-color: var(--btn-primary);
    color: var(--text-primary);
    border: 2px solid var(--text-secondary);
    
    &:hover {
      background-color: var(--text-secondary);
      color: var(--bg-primary);
    }
  }
  
  &.primary {
    background-color: var(--primary-violet);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--primary-blue);
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.button-icon {
  flex-shrink: 0;
}

// Delete Modal Styles
.delete-modal {
  width: 500px;
  text-align: center;
}

.warning-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.warning-title {
  color: var(--text-primary);
  font-size: 24px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0 0 20px 0;
}

.warning-message {
  color: var(--text-secondary);
  font-size: 18px;
  font-family: var(--font-sans);
  line-height: 1.5;
  margin: 0 0 30px 0;
}

.modal-button.danger {
  background-color: #FF6B6B;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #FF5252;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Reset Panel Styles
.reset-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  animation: resetOverlayAppear 0.3s ease-out;
}

@keyframes resetOverlayAppear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.reset-panel {
  animation: resetPanelAppear 0.3s ease-out 0.1s both;
}

@keyframes resetPanelAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.reset-panel-content {
  background-color: var(--bg-secondary);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  min-width: 300px;
}

.reset-panel-text {
  color: var(--text-primary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0 0 25px 0;
}

.reset-panel-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.reset-panel-button {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &.cancel {
    background-color: var(--btn-primary);
    color: var(--text-primary);
    border: 2px solid var(--text-secondary);
    
    &:hover {
      background-color: var(--text-secondary);
      color: var(--bg-primary);
    }
  }
  
  &.confirm {
    background-color: var(--primary-violet);
    color: white;
    
    &:hover {
      background-color: var(--primary-blue);
    }
  }
}
</style>