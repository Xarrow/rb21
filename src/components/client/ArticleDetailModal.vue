<template>
  <Transition name="modal">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
      
      <!-- Modal Container -->
      <div class="relative w-full max-w-6xl h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl">
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-gray-800 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-all duration-200 transform hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center h-full">
          <div class="text-center">
            <div class="w-16 h-16 border-4 border-gray-200/20 dark:border-white/20 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-600 dark:text-gray-300 font-medium">加载中...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex items-center justify-center h-full">
          <div class="text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-600 dark:text-red-400 mb-4 font-medium">{{ error }}</p>
            <button @click="loadArticle" class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
              重新加载
            </button>
          </div>
        </div>

        <!-- Article Content -->
        <div v-else-if="article" class="h-full flex flex-col">
          <!-- Hero Section -->
          <div v-if="article.article_head_image" class="relative h-80 overflow-hidden">
            <img
              :src="article.article_head_image"
              :alt="article.article_title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            <!-- Floating Header -->
            <div class="absolute top-6 left-6 right-6 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MediaIcon 
                    v-if="article.article_source" 
                    :source="article.article_source" 
                    icon-size="sm"
                    class="text-white"
                  />
                </div>
                <span class="text-white/90 font-medium">{{ article.article_source }}</span>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center space-x-2">
                <button
                  @click="shareArticle"
                  class="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors duration-200"
                  title="分享文章"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                </button>
                
                <button
                  @click="toggleBookmark"
                  class="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors duration-200"
                  title="收藏文章"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Content Container -->
          <div class="flex-1 overflow-y-auto">
            <!-- Article Header -->
            <div class="px-8 pt-8 pb-6">
              <!-- Title -->
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {{ article.article_title }}
              </h1>

              <!-- Meta Information -->
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center space-x-4">
                  <!-- Author -->
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">
                        {{ article.article_author?.charAt(0)?.toUpperCase() || 'A' }}
                      </span>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900 dark:text-white">
                        {{ article.article_author || '匿名作者' }}
                      </div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">
                        {{ formatDate(article.create_time) }}
                      </div>
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      <span>{{ getRandomViews() }} 阅读</span>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{{ getReadingTime(article.article_content) }} 分钟阅读</span>
                    </div>
                  </div>
                </div>

                <!-- Status Badge -->
                <span
                  class="px-3 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(article.status)"
                >
                  {{ getStatusText(article.status) }}
                </span>
              </div>

              <!-- Summary -->
              <p v-if="article.article_summary" class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-l-4 border-primary-500">
                {{ article.article_summary }}
              </p>
            </div>

            <!-- Article Content -->
            <div class="px-8 pb-12">
              <div class="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <div class="markdown-content" v-html="parsedContent"></div>
              </div>
            </div>

            <!-- Tags Section -->
            <div v-if="article.current_tags && article.current_tags.length > 0" class="px-8 pb-8">
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">标签:</span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in article.current_tags"
                    :key="tag.tag_id"
                    class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    #{{ tag.tag_name }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Source Link -->
            <div v-if="article.article_source_link" class="px-8 pb-8">
              <a
                :href="article.article_source_link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                <span>查看原文</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { articleApi } from '../../services/api';
import { parseMarkdown } from '../../utils/markdown';
import MediaIcon from '../MediaIcon.vue';

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

const getReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content?.length || 0;
  return Math.ceil(wordCount / wordsPerMinute) || 1;
};

const getRandomViews = () => {
  return Math.floor(Math.random() * 1000) + 100;
};

const getStatusClass = (status) => {
  const classes = {
    0: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    2: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
}

.markdown-content :deep(p) {
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid rgb(59 130 246);
  background: rgba(59, 130, 246, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.markdown-content :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.dark .markdown-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
}

.markdown-content :deep(pre) {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.dark .markdown-content :deep(pre) {
  background: rgba(255, 255, 255, 0.05);
}
</style>
