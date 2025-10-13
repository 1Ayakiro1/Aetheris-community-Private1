<template>
  <div class="comment-thread">
    <CommentBlock
      :comment="comment"
      :depth="comment.depth || 0"
      :highlighted="comment.id === highlightedCommentId"
      @like="forward('like', $event)"
      @react="forward('react', $event)"
      @reply="forward('reply', $event)"
      @user-click="forward('user-click', $event)"
      @mention-click="forward('mention-click', $event)"
      @submit-reply="forward('submit-reply', $event)"
      @cancel-reply="forward('cancel-reply', $event)"
    />

    <div v-if="comment.children && comment.children.length" class="comment-children">
      <CommentThread
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        :highlighted-comment-id="highlightedCommentId"
        :replying-to="replyingTo"
        @like="forward('like', $event)"
        @react="forward('react', $event)"
        @reply="forward('reply', $event)"
        @user-click="forward('user-click', $event)"
        @mention-click="forward('mention-click', $event)"
        @submit-reply="forward('submit-reply', $event)"
        @cancel-reply="forward('cancel-reply', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentBlock from '@/components/CommentBlock.vue'

// Give the component a name to allow recursive self-reference
// @ts-ignore
defineOptions({ name: 'CommentThread' })

type UiComment = {
  id: number
  author: { id: number; username: string; avatar?: string; isAuthor?: boolean }
  text: string
  createdAt: string
  likes?: number
  dislikes?: number
  userLiked?: boolean
  userReaction?: string | null
  parentId?: number | null
  replyToCommentId?: number | null
  depth?: number
  children?: UiComment[]
}

const props = defineProps<{
  comment: UiComment
  highlightedCommentId: number | null
  replyingTo: { id: number; parentId: number; username: string } | null
}>()

const emit = defineEmits<{
  (e: 'like', payload: any): void
  (e: 'react', payload: any): void
  (e: 'reply', payload: any): void
  (e: 'user-click', payload: any): void
  (e: 'mention-click', payload: any): void
  (e: 'submit-reply', payload: any): void
  (e: 'cancel-reply', payload: any): void
}>()

function forward(eventName: Parameters<typeof emit>[0], payload: any) {
  emit(eventName as any, payload)
}
</script>

<style scoped>
.comment-children {
  margin-left: 40px;
}
</style>


