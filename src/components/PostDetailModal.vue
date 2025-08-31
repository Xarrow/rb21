<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <span class="text-white font-semibold">
              {{ post.article_author?.charAt(0) || 'A' }}
            </span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ post.article_author }}</h3>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <MediaIcon :source="post.article_source" icon-size="sm" />
              <span>{{ post.article_source }}</span>
              <span>•</span>
              <span>{{ formatDate(post.create_time) }}</span>
            </div>
          </div>
        </div>

        <button
            @click="$emit('close')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Title for articles -->
        <h1 v-if="post.article_category === 'article'" class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ post.article_title }}
        </h1>

        <!-- Summary for articles -->
        <p v-if="post.article_category === 'article' && post.article_summary" class="text-lg text-gray-600 dark:text-gray-400 mb-6 italic">
          {{ post.article_summary }}
        </p>

        <!-- Head Image -->
        <div v-if="post.article_head_image" class="mb-6">
          <img
              :src="post.article_head_image"
              :alt="post.article_title"
              class="w-full rounded-lg object-cover"
              :class="post.article_category === 'article' ? 'max-h-96' : 'max-h-64'"
          />
        </div>

        <!-- Content -->
        <div class="prose prose-gray dark:prose-invert max-w-none">
          <div v-if="post.article_category === 'article'" class="markdown-preview" v-html="parsedContent"></div>
          <div v-else class="text-gray-900 dark:text-gray-100 leading-relaxed text-lg">
            {{ post.article_content }}
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <button class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>{{ Math.floor(Math.random() * 200) + 50 }}</span>
            </button>
            <button class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span>{{ Math.floor(Math.random() * 100) + 10 }}</span>
            </button>
            <button class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
              <span>分享</span>
            </button>
          </div>

          <div class="flex items-center space-x-2">
            <button class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </button>
            <button class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { parseMarkdown } from '../utils/markdown';
import MediaIcon from './MediaIcon.vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const parsedContent = computed(() => {
  if (props.post.article_category === 'article') {
    return parseMarkdown(props.post.article_content);
  }
  return props.post.article_content;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};
</script>