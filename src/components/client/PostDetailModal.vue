<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      <!-- Header -->
      <div class="relative z-10 flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100" style="font-family: 'Noto Serif SC', serif;">文章详情</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Article Details</p>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <!-- Share Button -->
          <button
              @click="shareArticle"
              class="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-all duration-200 transform hover:scale-110"
              title="分享文章"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
            </svg>
          </button>

          <!-- Bookmark Button -->
          <button
              @click="toggleBookmark"
              class="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-all duration-200 transform hover:scale-110"
              title="收藏文章"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          <!-- Close Button -->
          <button
              @click="$emit('close')"
              class="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
          >
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex-1 flex items-center justify-center relative z-10">
        <div class="text-center">
          <div class="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p class="text-gray-500 dark:text-gray-400 text-lg" style="font-family: 'Noto Serif SC', serif;">加载中...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex-1 flex items-center justify-center relative z-10">
        <div class="text-center">
          <svg class="w-20 h-20 mx-auto mb-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-red-600 dark:text-red-400 mb-6 text-lg" style="font-family: 'Noto Serif SC', serif;">{{ error }}</p>
          <button @click="loadArticle" class="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 font-medium">
            重新加载
          </button>
        </div>
      </div>

      <!-- Article Content -->
      <div v-else-if="article" class="flex-1 overflow-y-auto relative z-10">
        <!-- Article Header -->
        <div class="p-8 border-b border-gray-200 dark:border-gray-700">
          <!-- Source Badge -->
          <div v-if="article.article_source" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-6 shadow-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <a
                v-if="article.article_source_link"
                :href="article.article_source_link"
                target="_blank"
                class="hover:underline"
            >
              {{ article.article_source }}
            </a>
            <span v-else>{{ article.article_source }}</span>
          </div>

          <!-- Title -->
          <h1 v-if="article.article_title" class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight" style="font-family: 'Noto Serif SC', serif;">
            {{ article.article_title }}
          </h1>

          <!-- Summary -->
          <p v-if="article.article_summary" class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed" style="font-family: 'Noto Serif SC', serif;">
            {{ article.article_summary }}
          </p>

          <!-- Meta Info -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <div v-if="article.article_author" class="flex items-center space-x-3">
                <div class="w-14 h-14 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-white font-bold text-lg">
                    {{ article.article_author?.charAt(0) || 'A' }}
                  </span>
                </div>
                <div>
                  <div class="font-bold text-gray-900 dark:text-gray-100 text-lg" style="font-family: 'Noto Serif SC', serif;">
                    {{ article.article_author }}
                  </div>
                  <div v-if="article.update_time" class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(article.update_time) }}
                  </div>
                </div>
              </div>
              <div v-else-if="article.update_time" class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(article.update_time) }}
              </div>
            </div>

            <!-- Status Badge -->
            <span
                class="px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
                :class="getStatusClass(article.status)"
            >
              {{ getStatusText(article.status) }}
            </span>
          </div>
        </div>

        <!-- Head Image -->
        <div v-if="article.article_head_image" class="px-8 py-6">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
                :src="article.article_head_image"
                :alt="article.article_title"
                class="w-full max-h-96 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        <!-- Article Content -->
        <div class="px-8 py-8">
          <div class="prose prose-xl prose-gray dark:prose-invert max-w-none" style="font-family: 'Noto Serif SC', serif;">
            <div class="markdown-preview leading-relaxed" v-html="parsedContent"></div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-8 py-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <button class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors duration-200 transform hover:scale-105">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span class="font-medium">{{ Math.floor(Math.random() * 200) + 50 }}</span>
              </button>
              <button class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200 transform hover:scale-105">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span class="font-medium">{{ Math.floor(Math.random() * 100) + 10 }}</span>
              </button>
              <button class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors duration-200 transform hover:scale-105">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                <span class="font-medium">分享</span>
              </button>
            </div>

            <div class="flex items-center space-x-3">
              <button class="p-3 rounded-xl bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 transform hover:scale-105">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
              <button class="p-3 rounded-xl bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 transform hover:scale-105">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { articleApi } from '../../services/api';
import { parseMarkdown } from '../../utils/markdown';

const props = defineProps({
  articleId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);

const article = ref(null);
const loading = ref(false);
const error = ref('');

const parsedContent = computed(() => {
  return article.value ? parseMarkdown(article.value.article_content) : '';
});

const loadArticle = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await articleApi.getArticleDetail(props.articleId);

    if (response.success) {
      article.value = response.data;
    } else {
      error.value = response.message || '加载文章失败';
    }
  } catch (err) {
    error.value = '网络错误，请重试';
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusClass = (status) => {
  const classes = {
    0: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
    1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
    2: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
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

const shareArticle = () => {
  if (navigator.share) {
    navigator.share({
      title: article.value.article_title,
      text: article.value.article_summary,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
  }
};

const toggleBookmark = () => {
  console.log('Toggle bookmark for article:', props.articleId);
};

onMounted(() => {
  loadArticle();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap');

.markdown-preview {
  font-family: 'Noto Serif SC', serif;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  font-family: 'Noto Serif SC', serif;
  font-weight: 600;
}

.markdown-preview p {
  font-family: 'Noto Serif SC', serif;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.markdown-preview blockquote {
  font-family: 'Noto Serif SC', serif;
  font-style: italic;
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
}

.markdown-preview code {
  font-family: 'JetBrains Mono', monospace;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.markdown-preview pre {
  font-family: 'JetBrains Mono', monospace;
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
</style>