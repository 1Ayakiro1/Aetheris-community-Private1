<template>
  <div class="full-article-page">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">{{ $t('common.loading') }}</p>
    </div>
    
    <div v-else-if="error" class="error-container">
      <h1 class="error-text">{{ $t('common.error') }}</h1>
      <p class="error-message">{{ error }}</p>
      <button @click="goBack" class="back-button">{{ $t('common.go_back') }}</button>
    </div>
    
    <div v-else-if="article" class="article-container">
      <FullArticleCard :article="article" />
      
      <!-- Comments Section -->
      <div class="comments-section">
        <h2 class="comments-title">Comments ({{ totalCommentsCount }})</h2>
        
        <!-- Comment Input -->
        <div class="comment-input-container">
          <div class="user-avatar-small">
            <svg
              class="question-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 17H12.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <textarea
            v-model="newComment"
            class="comment-input"
            placeholder="Write a comment..."
            rows="3"
            @keydown.ctrl.enter="addComment"
          ></textarea>
          <button class="submit-comment-btn" @click="addComment" :disabled="!newComment.trim()">
            Submit
          </button>
        </div>
        
        <!-- Comments List -->
        <div class="comments-list">
          <template v-for="comment in comments" :key="comment.id">
            <!-- Author Comment -->
            <AuthorCommentBlock
              v-if="comment.author.isAuthor"
              :id="`comment-${comment.id}`"
              :comment="comment"
              :highlighted="highlightedCommentId === comment.id"
              @like="handleCommentLike"
              @react="handleCommentReact"
              @reply="handleCommentReply"
              @user-click="handleUserClick"
              @mention-click="handleMentionClick"
            />
            
            <!-- Regular Comment -->
            <CommentBlock
              v-else
              :id="`comment-${comment.id}`"
              :comment="comment"
              :highlighted="highlightedCommentId === comment.id"
              @like="handleCommentLike"
              @react="handleCommentReact"
              @reply="handleCommentReply"
              @user-click="handleUserClick"
              @mention-click="handleMentionClick"
            />
            
            <!-- Reply Input for this comment -->
            <CommentInput
              v-if="replyingTo && replyingTo.id === comment.id"
              :is-reply="true"
              :reply-to-user="replyingTo.username"
              :reply-to-id="replyingTo.id"
              placeholder="Write your reply..."
              submit-button-text="Reply"
              @submit="handleReplySubmit"
              @cancel="cancelReply"
            />
            
            <!-- Replies to this comment -->
            <template v-for="reply in getReplies(comment.id)" :key="reply.id">
              <ReplyCommentBlock
                :id="`comment-${reply.id}`"
                :comment="reply"
                :parent-comment-id="reply.parentId"
                :reply-to-comment-id="reply.replyToCommentId"
                :highlighted="highlightedCommentId === reply.id"
                @like="handleCommentLike"
                @react="handleCommentReact"
                @reply="handleCommentReply"
                @user-click="handleUserClick"
                @mention-click="handleMentionClick"
              />
              
              <!-- Reply Input for this reply -->
              <CommentInput
                v-if="replyingTo && replyingTo.id === reply.id"
                :is-reply="true"
                :reply-to-user="replyingTo.username"
                :reply-to-id="comment.id"
                placeholder="Write your reply..."
                submit-button-text="Reply"
                @submit="handleReplySubmit"
                @cancel="cancelReply"
              />
            </template>
          </template>
          
          <div v-if="comments.length === 0" class="no-comments">
            <p>Be the first to leave a comment!</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="not-found-container">
      <h1 class="not-found-text">{{ $t('common.article_not_found') }}</h1>
      <button @click="goBack" class="back-button">{{ $t('common.go_back') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import FullArticleCard from '@/components/FullArticleCard.vue'
import CommentBlock from '@/components/CommentBlock.vue'
import ReplyCommentBlock from '@/components/ReplyCommentBlock.vue'
import AuthorCommentBlock from '@/components/AuthorCommentBlock.vue'
import CommentInput from '@/components/CommentInput.vue'
import { useArticles } from '@/composables/useArticles'
import type { Article } from '@/types/article'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { getArticle, fetchComments, addComment: addCommentApi, reactCommentFn } = useArticles()

// Состояния
const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const newComment = ref('')
const replyingTo = ref<{ id: number, parentId: number, username: string } | null>(null)
const highlightedCommentId = ref<number | null>(null)

// Backend-powered comments
type UiComment = {
  id: number
  author: { id: number, username: string, avatar?: string, isAuthor?: boolean }
  text: string
  createdAt: string
  likes: number
  dislikes: number
  userLiked: boolean
  userReaction?: string | null
  parentId?: number | null
  replyToCommentId?: number | null
}

const comments = ref<UiComment[]>([])
const replyComments = ref<UiComment[]>([])

// Total comments count (main comments + reply comments)
const totalCommentsCount = computed(() => comments.value.length + replyComments.value.length)

// Get article ID from route
const articleId = ref<number>(parseInt(route.params.id as string))

// Load article
const loadArticle = async () => {
  try {
    loading.value = true
    error.value = null
    
    if (isNaN(articleId.value)) {
      throw new Error('Invalid article ID')
    }
    
    const fetchedArticle = await getArticle(articleId.value)
    article.value = fetchedArticle

    // load comments from backend
    const list = await fetchComments(articleId.value)
    const mapped: UiComment[] = list.map(c => ({
      id: c.id,
      author: { id: c.author_id ?? 0, username: c.author_name || 'Guest', avatar: '' },
      text: c.text,
      createdAt: c.created_at,
      likes: c.likes ?? 0,
      dislikes: c.dislikes ?? 0,
      userLiked: c.user_reaction === 'like',
      userReaction: c.user_reaction ?? null,
      parentId: c.parent_id ?? null,
      replyToCommentId: c.parent_id ?? null,
    }))
    comments.value = mapped.filter(m => !m.parentId)
    replyComments.value = mapped.filter(m => !!m.parentId)
  } catch (err) {
    console.error('Error loading article:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  } finally {
    loading.value = false
  }
}

// Go back
const goBack = () => {
  router.go(-1)
}

// Comment handlers
const addComment = async () => {
  if (!newComment.value.trim()) return
  const created = await addCommentToBackend(newComment.value)
  comments.value.unshift(created)
  newComment.value = ''
}

async function addCommentToBackend(text: string, parentId?: number) {
  const c = await addCommentApi(articleId.value, text, parentId ?? null)
  const mapped: UiComment = {
    id: c.id,
    author: { id: c.author_id ?? 0, username: c.author_name || 'Guest', avatar: '' },
    text: c.text,
    createdAt: c.created_at,
    likes: c.likes ?? 0,
    dislikes: c.dislikes ?? 0,
    userLiked: false,
    parentId: c.parent_id ?? null,
    replyToCommentId: c.parent_id ?? null,
  }
  return mapped
}

const handleCommentLike = (commentId: number) => {
  console.log('Like comment:', commentId)
  // TODO: Implement comment like functionality
}

const handleCommentReact = async (commentId: number, reaction: 'like' | 'dislike') => {
  try {
    const updated = await reactCommentFn(commentId, reaction)
    // Update local comment state with API response
    const updateComment = (c: UiComment) => {
      if (c.id === commentId) {
        c.likes = updated.likes ?? 0
        c.dislikes = updated.dislikes ?? 0
        c.userReaction = updated.user_reaction ?? null
        c.userLiked = updated.user_reaction === 'like'
      }
    }
    comments.value.forEach(updateComment)
    replyComments.value.forEach(updateComment)
  } catch (err) {
    console.error('Error reacting to comment:', err)
  }
}

const handleCommentReply = (commentId: number) => {
  const comment = comments.value.find(c => c.id === commentId) || 
                  replyComments.value.find(c => c.id === commentId)
  
  if (comment) {
    // Determine the parent comment ID
    // If replying to a main comment, use its ID
    // If replying to a reply, use its parentId
    const parentId = 'parentId' in comment ? comment.parentId : commentId
    
    replyingTo.value = {
      id: commentId, // The comment being replied to
      parentId: parentId, // The main comment thread
      username: comment.author.username
    }
  }
}

const handleReplySubmit = async (data: { text: string, replyToId?: number, replyToUser?: string }) => {
  if (!replyingTo.value) return
  const created = await addCommentToBackend(data.text, replyingTo.value.parentId)
  replyComments.value.push(created)
  replyingTo.value = null
}

const cancelReply = () => {
  replyingTo.value = null
}

const handleUserClick = (userId: number) => {
  console.log('User clicked:', userId)
  // TODO: Navigate to user profile
}

const handleMentionClick = (commentId: number) => {
  // Highlight the mentioned comment
  highlightedCommentId.value = commentId
  
  // Scroll to the comment
  nextTick(() => {
    const element = document.getElementById(`comment-${commentId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      
      // Wait for scroll to complete before starting the highlight timer
      // Smooth scroll usually takes about 500-1000ms, so we add extra delay
      setTimeout(() => {
        // Remove highlight after 3 seconds from when element is visible
        setTimeout(() => {
          highlightedCommentId.value = null
        }, 3000)
      }, 800) // Wait for scroll animation to complete
    } else {
      // If element not found, remove highlight after standard delay
      setTimeout(() => {
        highlightedCommentId.value = null
      }, 3000)
    }
  })
}

// Get replies for a specific comment
const getReplies = (commentId: number) => {
  return replyComments.value.filter(reply => reply.parentId === commentId)
}

// Load on mount
onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.full-article-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-container,
.error-container,
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--bg-secondary);
  border-top: 4px solid var(--btn-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text,
.error-text,
.not-found-text {
  color: var(--text-primary);
  font-size: 24px;
  font-family: var(--font-sans);
  font-weight: 600;
  margin-bottom: 10px;
}

.error-message {
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
  margin-bottom: 20px;
}

.back-button {
  background-color: var(--btn-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--btn-primary-hover, #2563eb);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

/* Comments Section */
.comments-section {
  margin: 40px auto 0;
  padding: 0;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 100%;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    width: 1055px;
  }
}

.comments-title {
  color: var(--text-primary);
  font-size: 28px;
  font-family: var(--font-sans);
  font-weight: 700;
  margin-bottom: 24px;
}

.comment-input-container {
  background-color: var(--bg-secondary);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--btn-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  flex-shrink: 0;
}

.comment-input {
  width: 100%;
  background-color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-sans);
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: 2px solid var(--btn-primary);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
}

.submit-comment-btn {
  background-color: var(--btn-primary);
  color: var(--text-primary);
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  
  &:hover:not(:disabled) {
    background-color: var(--btn-primary-hover, #2563eb);
  }
  
  &:active:not(:disabled) {
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.comments-list {
  margin-top: 24px;
}

.no-comments {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .full-article-page {
    padding: 10px;
  }
  
  .loading-text,
  .error-text,
  .not-found-text {
    font-size: 20px;
  }
  
  .comments-section {
    margin-top: 30px;
    padding: 0;
  }
  
  .comments-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .comment-input-container {
    padding: 16px;
    border-radius: 16px;
  }
  
  .comment-input {
    font-size: 14px;
    min-height: 70px;
  }
  
  .submit-comment-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* Планшеты */
@media (min-width: 769px) and (max-width: 1024px) {
  .comments-section {
    padding: 0;
  }
  
  .comments-title {
    font-size: 26px;
  }
}
</style>
  