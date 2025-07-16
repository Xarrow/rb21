<template>
  <div class="h-full p-6">
    <!-- Success/Error Messages -->
    <div v-if="message" class="mb-6">
      <div
          class="px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3"
          :class="message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'"
      >
        <svg v-if="message.type === 'success'" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <p class="font-medium">{{ message.text }}</p>
        <button
            @click="clearMessage"
            class="ml-2 text-current opacity-70 hover:opacity-100"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Split Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
      <!-- Left: Form -->
      <div class="card relative">
        <!-- Image Manager Button -->
        <button
            @click="showImageManager = true"
            class="absolute top-4 right-4 z-10 p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400 transition-colors duration-200"
            title="图片管理"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </button>

        <PostForm
            :on-submit="handleSubmit"
            @update:content="handleContentUpdate"
        />
      </div>

      <!-- Right: Preview -->
      <div class="card">
        <MarkdownPreview :content="previewContent" />
      </div>
    </div>

    <!-- Image Manager Modal -->
    <ImageManager
        v-if="showImageManager"
        @close="showImageManager = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PostForm from './PostForm.vue';
import MarkdownPreview from './MarkdownPreview.vue';
import ImageManager from './ImageManager.vue';
import { articleApi } from '../services/api';

const previewContent = ref('');
const message = ref(null);
const showImageManager = ref(false);

const handleContentUpdate = (content) => {
  previewContent.value = content;
};

const handleSubmit = async (data) => {
  try {
    const response = await articleApi.createArticle(data);

    if (response.success) {
      showMessage('success', '文章发布成功！🎉');
      // Clear form after successful submission
      previewContent.value = '';
    } else {
      showMessage('error', response.message || '发布文章失败，请重试。');
    }
  } catch (error) {
    console.error('Submission error:', error);
    showMessage('error', error.message || '网络错误，请检查连接后重试。');
  }
};

const showMessage = (type, text) => {
  message.value = { type, text };
  // Auto-hide message after 5 seconds
  setTimeout(() => {
    message.value = null;
  }, 5000);
};

const clearMessage = () => {
  message.value = null;
};
</script>