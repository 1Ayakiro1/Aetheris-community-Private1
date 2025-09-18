<template>
  <div class="settings-privacy-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <SettingsSidebar />
      
      <!-- Content -->
      <div class="content">
        <!-- Account Security Section -->
        <div class="security-section">
          <h1 class="section-title">Account security</h1>
          <h2 class="section-subtitle">settings to enhance the security of your account</h2>
          
          <div class="security-options">
            <!-- Email -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">Email</h1>
                <h2 class="option-subtitle">change your account email to receive confirmation code and announcements</h2>
              </div>
              <button class="option-button" @click="openEmailModal">Change email</button>
            </div>
            
            <!-- Password -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">Password</h1>
                <h2 class="option-subtitle">create a new password for account security</h2>
              </div>
              <button class="option-button" @click="openPasswordModal">Change password</button>
            </div>
            
            <!-- 2FA -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">2FA</h1>
                <h2 class="option-subtitle">set up a second layer of protection for your account(recommended)</h2>
              </div>
              <button class="option-button" @click="open2FAModal">add 2FA</button>
            </div>
            
            <!-- Download Data -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">Download data</h1>
                <h2 class="option-subtitle">Download the data we store</h2>
              </div>
              <button class="option-button" @click="downloadData">Download</button>
            </div>
          </div>
        </div>
        
        <!-- Data Management Section -->
        <div class="data-section">
          <h1 class="section-title">Deleting and hiding data</h1>
          <h2 class="section-subtitle">section for completely deleting all information from our community</h2>
          
          <div class="data-options">
            <!-- Delete Account -->
            <div class="data-option">
              <div class="option-info">
                <h1 class="option-title danger">Delete account</h1>
                <h2 class="option-subtitle">deleting account and information about it</h2>
              </div>
              <button class="option-button danger" @click="openDeleteAccountModal">Delete</button>
            </div>
            
            <!-- Hide Profile -->
            <div class="data-option">
              <div class="option-info">
                <h1 class="option-title danger">Hide profile</h1>
                <h2 class="option-subtitle">hide profile and all info about it</h2>
              </div>
              <button class="option-button danger" @click="openHideProfileModal">Hide</button>
            </div>
            
            <!-- Extra Lock -->
            <div class="data-option">
              <div class="option-info">
                <h1 class="option-title danger">Extra lock</h1>
                <h2 class="option-subtitle">Have you been hacked? Isolate your profile completely for a while</h2>
              </div>
              <button class="option-button danger" @click="openExtraLockModal">Lock</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
    
    <!-- Email Change Modal -->
    <div v-if="isEmailModalOpen" class="modal-overlay" @click="closeEmailModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h1 class="modal-title">Change Email</h1>
          <button class="modal-close" @click="closeEmailModal">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Current Email</label>
            <input 
              type="email" 
              class="form-input" 
              :class="{ 'error': currentEmailError }"
              v-model="currentEmail"
              placeholder="Enter current email"
            />
            <p v-if="currentEmailError" class="error-message">{{ currentEmailError }}</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">New Email</label>
            <input 
              type="email" 
              class="form-input" 
              :class="{ 'error': newEmailError }"
              v-model="newEmail"
              placeholder="Enter new email"
            />
            <p v-if="newEmailError" class="error-message">{{ newEmailError }}</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              type="password" 
              class="form-input" 
              :class="{ 'error': passwordError }"
              v-model="emailPassword"
              placeholder="Enter your password"
            />
            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-button secondary" @click="closeEmailModal">Cancel</button>
          <button class="modal-button primary" @click="changeEmail" :disabled="!isEmailFormValid">Change Email</button>
        </div>
      </div>
    </div>
    
    <!-- Password Change Modal -->
    <div v-if="isPasswordModalOpen" class="modal-overlay" @click="closePasswordModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h1 class="modal-title">Change Password</h1>
          <button class="modal-close" @click="closePasswordModal">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Current Password</label>
            <input 
              type="password" 
              class="form-input" 
              :class="{ 'error': currentPasswordError }"
              v-model="currentPassword"
              placeholder="Enter current password"
            />
            <p v-if="currentPasswordError" class="error-message">{{ currentPasswordError }}</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">New Password</label>
            <input 
              type="password" 
              class="form-input" 
              :class="{ 'error': newPasswordError }"
              v-model="newPassword"
              placeholder="Enter new password"
            />
            <p v-if="newPasswordError" class="error-message">{{ newPasswordError }}</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Confirm New Password</label>
            <input 
              type="password" 
              class="form-input" 
              :class="{ 'error': confirmPasswordError }"
              v-model="confirmPassword"
              placeholder="Confirm new password"
            />
            <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-button secondary" @click="closePasswordModal">Cancel</button>
          <button class="modal-button primary" @click="changePassword" :disabled="!isPasswordFormValid">Change Password</button>
        </div>
      </div>
    </div>
    
    <!-- 2FA Setup Modal -->
    <div v-if="is2FAModalOpen" class="modal-overlay" @click="close2FAModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h1 class="modal-title">Setup 2FA</h1>
          <button class="modal-close" @click="close2FAModal">×</button>
        </div>
        
        <div class="modal-body">
          <div class="twofa-info">
            <p class="info-text">Scan this QR code with your authenticator app:</p>
            <div class="qr-code-placeholder">
              <div class="qr-code">QR CODE</div>
            </div>
            <p class="info-text">Or enter this code manually:</p>
            <div class="manual-code">{{ twoFASecret }}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Verification Code</label>
            <input 
              type="text" 
              class="form-input" 
              :class="{ 'error': twoFACodeError }"
              v-model="twoFACode"
              placeholder="Enter 6-digit code"
              maxlength="6"
            />
            <p v-if="twoFACodeError" class="error-message">{{ twoFACodeError }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-button secondary" @click="close2FAModal">Cancel</button>
          <button class="modal-button primary" @click="setup2FA" :disabled="!is2FAFormValid">Enable 2FA</button>
        </div>
      </div>
    </div>
    
    <!-- Delete Account Modal -->
    <div v-if="isDeleteAccountModalOpen" class="modal-overlay" @click="closeDeleteAccountModal">
      <div class="modal-content danger-modal" @click.stop>
        <div class="modal-header">
          <h1 class="modal-title danger">Delete Account</h1>
          <button class="modal-close" @click="closeDeleteAccountModal">×</button>
        </div>
        
        <div class="modal-body">
          <div class="warning-section">
            <p class="warning-text">⚠️ This action cannot be undone!</p>
            <p class="warning-description">All your data, articles, and account information will be permanently deleted.</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Type "DELETE" to confirm</label>
            <input 
              type="text" 
              class="form-input" 
              :class="{ 'error': deleteConfirmError }"
              v-model="deleteConfirm"
              placeholder="Type DELETE"
            />
            <p v-if="deleteConfirmError" class="error-message">{{ deleteConfirmError }}</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              type="password" 
              class="form-input" 
              :class="{ 'error': deletePasswordError }"
              v-model="deletePassword"
              placeholder="Enter your password"
            />
            <p v-if="deletePasswordError" class="error-message">{{ deletePasswordError }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-button secondary" @click="closeDeleteAccountModal">Cancel</button>
          <button class="modal-button danger" @click="deleteAccount" :disabled="!isDeleteFormValid">Delete Account</button>
        </div>
      </div>
    </div>
    
    <!-- Hide Profile Modal -->
    <div v-if="isHideProfileModalOpen" class="modal-overlay" @click="closeHideProfileModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h1 class="modal-title">Hide Profile</h1>
          <button class="modal-close" @click="closeHideProfileModal">×</button>
        </div>
        
        <div class="modal-body">
          <div class="warning-section">
            <p class="warning-text">Your profile will be hidden from other users</p>
            <p class="warning-description">You can unhide it anytime from settings</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              type="password" 
              class="form-input" 
              :class="{ 'error': hidePasswordError }"
              v-model="hidePassword"
              placeholder="Enter your password"
            />
            <p v-if="hidePasswordError" class="error-message">{{ hidePasswordError }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-button secondary" @click="closeHideProfileModal">Cancel</button>
          <button class="modal-button primary" @click="hideProfile" :disabled="!isHideFormValid">Hide Profile</button>
        </div>
      </div>
    </div>
    
    <!-- Extra Lock Modal -->
    <div v-if="isExtraLockModalOpen" class="modal-overlay" @click="closeExtraLockModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h1 class="modal-title">Extra Lock</h1>
          <button class="modal-close" @click="closeExtraLockModal">×</button>
        </div>
        
        <div class="modal-body">
          <div class="warning-section">
            <p class="warning-text">🔒 Your profile will be completely locked</p>
            <p class="warning-description">No one will be able to access your profile or data for the selected period</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Lock Duration</label>
            <select class="form-select" v-model="lockDuration">
              <option value="1">1 hour</option>
              <option value="24">24 hours</option>
              <option value="168">1 week</option>
              <option value="720">1 month</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              type="password" 
              class="form-input" 
              :class="{ 'error': lockPasswordError }"
              v-model="lockPassword"
              placeholder="Enter your password"
            />
            <p v-if="lockPasswordError" class="error-message">{{ lockPasswordError }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-button secondary" @click="closeExtraLockModal">Cancel</button>
          <button class="modal-button primary" @click="lockProfile" :disabled="!isLockFormValid">Lock Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import { useValidation } from '@/composables/useValidation'

const { validateEmail, validatePassword } = useValidation()

// Modal states
const isEmailModalOpen = ref(false)
const isPasswordModalOpen = ref(false)
const is2FAModalOpen = ref(false)
const isDeleteAccountModalOpen = ref(false)
const isHideProfileModalOpen = ref(false)
const isExtraLockModalOpen = ref(false)

// Email change form
const currentEmail = ref('')
const newEmail = ref('')
const emailPassword = ref('')
const currentEmailError = ref('')
const newEmailError = ref('')
const passwordError = ref('')

// Password change form
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const currentPasswordError = ref('')
const newPasswordError = ref('')
const confirmPasswordError = ref('')

// 2FA form
const twoFACode = ref('')
const twoFACodeError = ref('')
const twoFASecret = ref('ABCD EFGH IJKL MNOP QRST UVWX YZ12 3456')

// Delete account form
const deleteConfirm = ref('')
const deletePassword = ref('')
const deleteConfirmError = ref('')
const deletePasswordError = ref('')

// Hide profile form
const hidePassword = ref('')
const hidePasswordError = ref('')

// Extra lock form
const lockDuration = ref('24')
const lockPassword = ref('')
const lockPasswordError = ref('')

// Validation computed properties
const isEmailFormValid = computed(() => {
  return currentEmail.value && 
         newEmail.value && 
         emailPassword.value && 
         !currentEmailError.value && 
         !newEmailError.value && 
         !passwordError.value
})

const isPasswordFormValid = computed(() => {
  return currentPassword.value && 
         newPassword.value && 
         confirmPassword.value && 
         !currentPasswordError.value && 
         !newPasswordError.value && 
         !confirmPasswordError.value
})

const is2FAFormValid = computed(() => {
  return twoFACode.value.length === 6 && !twoFACodeError.value
})

const isDeleteFormValid = computed(() => {
  return deleteConfirm.value === 'DELETE' && 
         deletePassword.value && 
         !deleteConfirmError.value && 
         !deletePasswordError.value
})

const isHideFormValid = computed(() => {
  return hidePassword.value && !hidePasswordError.value
})

const isLockFormValid = computed(() => {
  return lockPassword.value && !lockPasswordError.value
})

// Email validation
watch(currentEmail, (newValue) => {
  if (newValue) {
    currentEmailError.value = validateEmail(newValue).isValid ? '' : validateEmail(newValue).message
  } else {
    currentEmailError.value = ''
  }
})

watch(newEmail, (newValue) => {
  if (newValue) {
    newEmailError.value = validateEmail(newValue).isValid ? '' : validateEmail(newValue).message
  } else {
    newEmailError.value = ''
  }
})

watch(emailPassword, (newValue) => {
  if (newValue) {
    passwordError.value = validatePassword(newValue).isValid ? '' : validatePassword(newValue).message
  } else {
    passwordError.value = ''
  }
})

// Password validation
watch(currentPassword, (newValue) => {
  if (newValue) {
    currentPasswordError.value = validatePassword(newValue).isValid ? '' : validatePassword(newValue).message
  } else {
    currentPasswordError.value = ''
  }
})

watch(newPassword, (newValue) => {
  if (newValue) {
    newPasswordError.value = validatePassword(newValue).isValid ? '' : validatePassword(newValue).message
  } else {
    newPasswordError.value = ''
  }
})

watch(confirmPassword, (newValue) => {
  if (newValue) {
    if (newValue !== newPassword.value) {
      confirmPasswordError.value = 'Passwords do not match'
    } else {
      confirmPasswordError.value = ''
    }
  } else {
    confirmPasswordError.value = ''
  }
})

// 2FA validation
watch(twoFACode, (newValue) => {
  if (newValue) {
    if (!/^\d{6}$/.test(newValue)) {
      twoFACodeError.value = 'Code must be 6 digits'
    } else {
      twoFACodeError.value = ''
    }
  } else {
    twoFACodeError.value = ''
  }
})

// Delete account validation
watch(deleteConfirm, (newValue) => {
  if (newValue && newValue !== 'DELETE') {
    deleteConfirmError.value = 'Please type "DELETE" exactly'
  } else {
    deleteConfirmError.value = ''
  }
})

watch(deletePassword, (newValue) => {
  if (newValue) {
    deletePasswordError.value = validatePassword(newValue).isValid ? '' : validatePassword(newValue).message
  } else {
    deletePasswordError.value = ''
  }
})

// Hide profile validation
watch(hidePassword, (newValue) => {
  if (newValue) {
    hidePasswordError.value = validatePassword(newValue).isValid ? '' : validatePassword(newValue).message
  } else {
    hidePasswordError.value = ''
  }
})

// Lock profile validation
watch(lockPassword, (newValue) => {
  if (newValue) {
    lockPasswordError.value = validatePassword(newValue).isValid ? '' : validatePassword(newValue).message
  } else {
    lockPasswordError.value = ''
  }
})

// Modal functions
const openEmailModal = () => {
  isEmailModalOpen.value = true
  resetEmailForm()
}

const closeEmailModal = () => {
  isEmailModalOpen.value = false
  resetEmailForm()
}

const openPasswordModal = () => {
  isPasswordModalOpen.value = true
  resetPasswordForm()
}

const closePasswordModal = () => {
  isPasswordModalOpen.value = false
  resetPasswordForm()
}

const open2FAModal = () => {
  is2FAModalOpen.value = true
  reset2FAForm()
}

const close2FAModal = () => {
  is2FAModalOpen.value = false
  reset2FAForm()
}

const openDeleteAccountModal = () => {
  isDeleteAccountModalOpen.value = true
  resetDeleteForm()
}

const closeDeleteAccountModal = () => {
  isDeleteAccountModalOpen.value = false
  resetDeleteForm()
}

const openHideProfileModal = () => {
  isHideProfileModalOpen.value = true
  resetHideForm()
}

const closeHideProfileModal = () => {
  isHideProfileModalOpen.value = false
  resetHideForm()
}

const openExtraLockModal = () => {
  isExtraLockModalOpen.value = true
  resetLockForm()
}

const closeExtraLockModal = () => {
  isExtraLockModalOpen.value = false
  resetLockForm()
}

// Reset functions
const resetEmailForm = () => {
  currentEmail.value = ''
  newEmail.value = ''
  emailPassword.value = ''
  currentEmailError.value = ''
  newEmailError.value = ''
  passwordError.value = ''
}

const resetPasswordForm = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  currentPasswordError.value = ''
  newPasswordError.value = ''
  confirmPasswordError.value = ''
}

const reset2FAForm = () => {
  twoFACode.value = ''
  twoFACodeError.value = ''
}

const resetDeleteForm = () => {
  deleteConfirm.value = ''
  deletePassword.value = ''
  deleteConfirmError.value = ''
  deletePasswordError.value = ''
}

const resetHideForm = () => {
  hidePassword.value = ''
  hidePasswordError.value = ''
}

const resetLockForm = () => {
  lockPassword.value = ''
  lockPasswordError.value = ''
  lockDuration.value = '24'
}

// Action functions
const changeEmail = async () => {
  if (!isEmailFormValid.value) return
  
  try {
    console.log('Changing email:', { currentEmail: currentEmail.value, newEmail: newEmail.value })
    alert('Email change request sent! Check your new email for confirmation.')
    closeEmailModal()
  } catch (error) {
    console.error('Error changing email:', error)
    alert('Error changing email. Please try again.')
  }
}

const changePassword = async () => {
  if (!isPasswordFormValid.value) return
  
  try {
    console.log('Changing password')
    alert('Password changed successfully!')
    closePasswordModal()
  } catch (error) {
    console.error('Error changing password:', error)
    alert('Error changing password. Please try again.')
  }
}

const setup2FA = async () => {
  if (!is2FAFormValid.value) return
  
  try {
    console.log('Setting up 2FA with code:', twoFACode.value)
    alert('2FA enabled successfully!')
    close2FAModal()
  } catch (error) {
    console.error('Error setting up 2FA:', error)
    alert('Error setting up 2FA. Please try again.')
  }
}

const downloadData = async () => {
  try {
    console.log('Downloading user data')
    alert('Data download started! You will receive an email with the download link.')
  } catch (error) {
    console.error('Error downloading data:', error)
    alert('Error downloading data. Please try again.')
  }
}

const deleteAccount = async () => {
  if (!isDeleteFormValid.value) return
  
  try {
    console.log('Deleting account')
    alert('Account deletion request submitted. You will receive a confirmation email.')
    closeDeleteAccountModal()
  } catch (error) {
    console.error('Error deleting account:', error)
    alert('Error deleting account. Please try again.')
  }
}

const hideProfile = async () => {
  if (!isHideFormValid.value) return
  
  try {
    console.log('Hiding profile')
    alert('Profile hidden successfully!')
    closeHideProfileModal()
  } catch (error) {
    console.error('Error hiding profile:', error)
    alert('Error hiding profile. Please try again.')
  }
}

const lockProfile = async () => {
  if (!isLockFormValid.value) return
  
  try {
    console.log('Locking profile for', lockDuration.value, 'hours')
    alert(`Profile locked for ${lockDuration.value} hours!`)
    closeExtraLockModal()
  } catch (error) {
    console.error('Error locking profile:', error)
    alert('Error locking profile. Please try again.')
  }
}
</script>

<style scoped lang="scss">
.settings-privacy-container {
  max-width: 120rem;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.main-body {
  display: flex;
  margin-top: 3rem; // mt-12
}


// Content Styles
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 12px;
}

.security-section {
  background-color: var(--bg-secondary);
  width: 95rem;
  height: 37.5rem;
  border-radius: 1.5625rem;
  display: flex;
  flex-direction: column;
}

.data-section {
  background-color: var(--bg-secondary);
  width: 95rem;
  height: 41.875rem;
  border-radius: 1.5625rem;
  margin-top: 12px;
  margin-bottom: 12.5rem;
  display: flex;
  flex-direction: column;
}

.section-title {
  margin-top: 2.5rem; // mt-10
  margin-left: 3rem; // ml-12
  color: var(--text-primary);
  font-size: 1.5625rem;
  font-family: var(--font-sans);
  font-weight: bold;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.25rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 0.5rem;
  margin-left: 3rem;
  width: 700px;
}

// Security Options
.security-options {
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  margin-top: 2rem;
  gap: 1rem;
}

.security-option {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.option-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.option-title {
  color: var(--text-primary);
  font-size: 1.5625rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;

  &.danger {
    color: var(--text-red);
  }
}

.option-subtitle {
  color: var(--text-secondary);
  font-size: 1.25rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 0.25rem;
  width: 660px;
}

.option-button {
  width: 18.75rem;
  height: 59px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 0.9375rem;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-family: var(--font-sans);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  margin-right: 3rem;
  margin-top: 24px;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }

  &.danger {
    background-color: rgba(255, 59, 59, 0);
    color: var(--text-red);

    &:hover {
      background-color: rgba(255, 59, 59, 1);
      color: var(--text-primary);
    }
  }
}

// Data Options
.data-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 3rem;
  margin-top: 1rem;
}

.data-option {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

// Modal Styles
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
  z-index: 10000;
}

.modal-content {
  background-color: var(--bg-secondary);
  border-radius: 1.875rem;
  width: 37.5rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.3);
  
  &.danger-modal {
    border: 2px solid var(--text-red);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 29px 38px;
  border-bottom: 1px solid var(--text-secondary);
}

.modal-title {
  color: var(--text-primary);
  font-size: 29px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;
  
  &.danger {
    color: var(--text-red);
  }
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 38px;
  cursor: pointer;
  padding: 0;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(67, 73, 86, 1);
    color: var(--text-primary);
  }
}

.modal-body {
  padding: 38px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 19px;
  padding: 29px 38px;
  border-top: 1px solid var(--text-secondary);
}

.modal-button {
  padding: 0.875rem 29px;
  border-radius: 1.125rem;
  font-size: 19px;
  font-family: var(--font-sans);
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.secondary {
    background-color: rgba(67, 73, 86, 0);
    color: var(--text-primary);
    
    &:hover {
      background-color: rgba(67, 73, 86, 1);
    }
  }
  
  &.primary {
    background-color: var(--primary-violet);
    color: white;
    
    &:hover {
      background-color: #7c3aed;
    }
    
    &:disabled {
      background-color: var(--text-secondary);
      cursor: not-allowed;
    }
  }
  
  &.danger {
    background-color: var(--text-red);
    color: white;
    
    &:hover {
      background-color: #dc2626;
    }
    
    &:disabled {
      background-color: var(--text-secondary);
      cursor: not-allowed;
    }
  }
}

// Form Styles
.form-group {
  margin-bottom: 29px;
}

.form-label {
  display: block;
  color: var(--text-primary);
  font-size: 19px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 0.625rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem 19px;
  border: 2px solid var(--text-secondary);
  border-radius: 1.125rem;
  background-color: var(--btn-primary);
  color: #ffffff;
  font-size: 19px;
  font-family: var(--font-sans);
  font-weight: 600;
  transition: all 0.3s ease;
  opacity: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-violet);
    color: #ffffff;
    opacity: 1;
  }
  
  &.error {
    border-color: var(--text-red);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.8;
  }
}

.form-select {
  width: 100%;
  padding: 0.875rem 19px;
  border: 2px solid var(--text-secondary);
  border-radius: 1.125rem;
  background-color: var(--btn-primary);
  color: #ffffff;
  font-size: 19px;
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-violet);
    color: #ffffff;
    opacity: 1;
  }
}

.error-message {
  color: var(--text-red);
  font-size: 17px;
  font-family: var(--font-sans);
  margin-top: 0.3125rem;
  margin-bottom: 0;
}

// Special sections
.warning-section {
  background-color: rgba(255, 59, 59, 0.1);
  border: 1px solid var(--text-red);
  border-radius: 1.125rem;
  padding: 19px;
  margin-bottom: 29px;
}

.warning-text {
  color: var(--text-red);
  font-size: 19px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0 0 0.625rem 0;
}

.warning-description {
  color: var(--text-secondary);
  font-size: 17px;
  font-family: var(--font-sans);
  margin: 0;
}

.twofa-info {
  text-align: center;
  margin-bottom: 29px;
}

.info-text {
  color: var(--text-primary);
  font-size: 19px;
  font-family: var(--font-sans);
  margin-bottom: 19px;
}

.qr-code-placeholder {
  display: flex;
  justify-content: center;
  margin: 19px 0;
}

.qr-code {
  width: 15rem;
  height: 15rem;
  background-color: var(--btn-primary);
  border: 2px solid var(--text-secondary);
  border-radius: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 17px;
  font-family: var(--font-sans);
  font-weight: bold;
}

.manual-code {
  background-color: var(--btn-primary);
  border: 1px solid var(--text-secondary);
  border-radius: 12px;
  padding: 0.875rem;
  color: var(--text-primary);
  font-size: 19px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 19px auto;
  max-width: 360px;
  word-break: break-all;
}
</style>