<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="handleBackdropClick">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col m-4" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ article.article_title }}
          </h2>
          <span
              class="px-2 py-1 text-xs font-medium rounded-full"
              :class="getStatusClass(article.status)"
          >
            {{ getStatusText(article.status) }}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <button
              @click="$emit('edit', article)"
              class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors duration-200"
              title="编辑"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button
              @click="$emit('delete', article)"
              class="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors duration-200"
              title="删除"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
          <button
              @click="$emit('close')"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Meta Info -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div v-if="article.article_author">
            <span class="text-gray-500 dark:text-gray-400">作者:</span>
            <span class="ml-2 text-gray-900 dark:text-gray-100">{{ article.article_author }}</span>
          </div>
          <div v-if="article.article_source">
            <span class="text-gray-500 dark:text-gray-400">来源:</span>
            <span class="ml-2 text-gray-900 dark:text-gray-100">{{ article.article_source }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">创建时间:</span>
            <span class="ml-2 text-gray-900 dark:text-gray-100">{{ formatDate(article.create_time) }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">更新时间:</span>
            <span class="ml-2 text-gray-900 dark:text-gray-100">{{ formatDate(article.update_time) }}</span>
          </div>
        </div>

        <!-- Summary -->
        <div v-if="article.article_summary" class="mt-4">
          <span class="text-gray-500 dark:text-gray-400">摘要:</span>
          <p class="mt-1 text-gray-900 dark:text-gray-100">{{ article.article_summary }}</p>
        </div>

        <!-- Head Image -->
        <div v-if="article.article_head_image" class="mt-4">
          <span class="text-gray-500 dark:text-gray-400">头图:</span>
          <div class="mt-2">
            <img
                :src="article.article_head_image"
                :alt="article.article_title"
                class="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="markdown-preview" v-html="parsedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { parseMarkdown } from '../utils/markdown';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'edit', 'delete']);

const parsedContent = computed(() => {
  return parseMarkdown(props.article.article_content);
});

const getStatusClass = (status) => {
  const classes = {
    0: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    1: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    2: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };
  return classes[status] || classes[0];
};

const getStatusText = (status) => {
  const texts = {
    0: '已下线',
    1: '已发布',
    2: '草稿'
  };
  return texts[status] || '未知';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};
</script>