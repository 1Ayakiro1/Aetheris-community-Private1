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
        <h2 class="comments-title">Comments ({{ comments.length }})</h2>
        
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
              :comment="comment"
              @like="handleCommentLike"
              @reply="handleCommentReply"
              @user-click="handleUserClick"
            />
            
            <!-- Regular Comment -->
            <CommentBlock
              v-else
              :comment="comment"
              @like="handleCommentLike"
              @reply="handleCommentReply"
              @user-click="handleUserClick"
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
                :comment="reply"
                @like="handleCommentLike"
                @reply="handleCommentReply"
                @user-click="handleUserClick"
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
import { ref, onMounted } from 'vue'
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
const { getArticle } = useArticles()

// Состояния
const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const newComment = ref('')
const replyingTo = ref<{ id: number, username: string } | null>(null)

// Temporary comment data (TODO: replace with real data from backend)
const comments = ref([
  {
    id: 1,
    author: {
      id: 1,
      username: 'Gesnhin player',
      avatar: ''
    },
    text: 'Today i have been a beautiful day, becaus i did create this article and my friends have liked it lol xddddd \n im just need to kill my friends, im need to kill all of our eternal calamity',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 5,
    userLiked: false
  },
  {
    id: 2,
    author: {
      id: 2,
      username: 'Maria',
      avatar: ''
    },
    text: 'Interesting approach to solving the problem. Will try to apply it in practice.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 3,
    userLiked: false
  },
  {
    id: 3,
    author: {
      id: 999,
      username: 'ArticleAuthor',
      avatar: '',
      isAuthor: true
    },
    text: 'Thank you all for your feedback!\nI\'m glad you found this article helpful. If you have any questions, feel free to ask!',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    userLiked: false
  },
  {
    id: 4,
    author: {
      id: 3,
      username: 'Dmitry',
      avatar: ''
    },
    text: 'Can you tell me where I can find more information on this topic?',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 1,
    userLiked: false
  }
])

// Temporary reply comments data (TODO: replace with real data from backend)
const replyComments = ref([
  {
    id: 101,
    parentId: 1,
    author: {
      id: 4,
      username: 'Лютi Анонимус',
      avatar: ''
    },
    text: 'Я вас взломал,господа,кланяйтесь мне и молите о пощаде,иначе мой коварный план по захвату мира будет приведен в исполнение!!! УХХУХААХХАХУХАУАХУАХУХАУХАУХАУХАХУАХУХАУХАУХУХАУХА \n Как говорится,один раз,хороший человек,а вот второй раз...уже хацкер жоски \n\n Мы будем сопротивлятся всем,ВСЕМ,УХАХУАХУАХХАУХА ',
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    likes: 2,
    userLiked: false
  },
  {
    id: 102,
    parentId: 1,
    author: {
      id: 5,
      username: 'Viktor',
      avatar: ''
    },
    text: 'Thanks for sharing your experience!',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes: 1,
    userLiked: false
  },
  {
    id: 103,
    parentId: 3,
    author: {
      id: 1,
      username: 'Alexander',
      avatar: ''
    },
    text: 'Check out the official documentation, there is a lot of useful information there.',
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    likes: 3,
    userLiked: false
  }
])

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
const addComment = () => {
  if (!newComment.value.trim()) return
  
  const comment = {
    id: comments.value.length + 1,
    author: {
      id: 999,
      username: 'Guest',
      avatar: ''
    },
    text: newComment.value.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
    userLiked: false
  }
  
  comments.value.unshift(comment)
  newComment.value = ''
}

const handleCommentLike = (commentId: number) => {
  console.log('Like comment:', commentId)
  // TODO: Implement comment like functionality
}

const handleCommentReply = (commentId: number) => {
  const comment = comments.value.find(c => c.id === commentId) || 
                  replyComments.value.find(c => c.id === commentId)
  
  if (comment) {
    replyingTo.value = {
      id: commentId,
      username: comment.author.username
    }
  }
}

const handleReplySubmit = (data: { text: string, replyToId?: number, replyToUser?: string }) => {
  const newReply = {
    id: replyComments.value.length + 1000,
    parentId: data.replyToId || 0,
    author: {
      id: 999,
      username: 'Guest',
      avatar: ''
    },
    text: data.text,
    createdAt: new Date().toISOString(),
    likes: 0,
    userLiked: false
  }
  
  replyComments.value.push(newReply)
  replyingTo.value = null
}

const cancelReply = () => {
  replyingTo.value = null
}

const handleUserClick = (userId: number) => {
  console.log('User clicked:', userId)
  // TODO: Navigate to user profile
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
  margin-top: 40px;
  padding: 0;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
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
  