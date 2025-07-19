<template>
  <Transition name="modal">
    <div class="fixed inset-0 flex items-center justify-center z-50 p-4 font-serif">
      <div class="relative max-w-3xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
        <!-- Movie Card Style Container -->
        <div class="relative bg-gradient-to-br from-pink-100/30 via-purple-100/30 to-teal-100/30 dark:from-pink-900/60 dark:via-purple-900/60 dark:to-teal-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <!-- Full Page Background Image -->
          <div
              v-if="article && article.article_head_image"
              class="absolute inset-0 z-0 bg-cover bg-center blur-2xl opacity-60"
              :style="{ backgroundImage: `url(${article.article_head_image})` }"
          ></div>

          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>

          <!-- Close Button -->
          <button
              @click="$emit('close')"
              class="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-gray-800 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-all duration-200 transform hover:scale-110"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center h-96 text-gray-800 dark:text-white">
            <div class="text-center">
              <div class="w-16 h-16 border-4 border-gray-200/20 dark:border-white/20 border-t-gray-800/80 dark:border-t-white/80 rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-800/80 dark:text-white/80 font-serif">加载中...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="flex items-center justify-center h-96 text-gray-800 dark:text-white">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-red-600 dark:text-red-400 mb-4 font-serif">{{ error }}</p>
              <button @click="loadArticle" class="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 rounded-lg transition-colors duration-200 font-serif">
                重新加载
              </button>
            </div>
          </div>

          <!-- Article Content -->
          <div v-else-if="article" class="relative z-10">
            <!-- Header Section -->
            <div class="relative p-5 pb-3 min-h-[200px] bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-t-2xl">

              <!-- Decorative Elements -->
              <div class="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"></div>
              <div class="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-2xl"></div>

              <div class="relative z-10">
                <!-- Category Badge -->
                <div v-if="article.article_source" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-full text-primary-600 dark:text-primary-300 text-sm font-medium mb-3 border border-primary-500/30">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  {{ article.article_source }}
                </div>

                <!-- Title -->
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight font-serif">
                  {{ article.article_title }}
                </h1>

                <!-- Meta Info -->
                <div class="flex items-center space-x-3 text-gray-700 dark:text-white/70 text-sm">
                  <div v-if="article.article_author" class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center ring-1 ring-gray-200/20 dark:ring-white/20">
                      <span class="text-white font-semibold text-xs">
                        {{ article.article_author?.charAt(0) || 'A' }}
                      </span>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white font-serif">{{ article.article_author }}</div>
                    </div>
                  </div>

                  <div v-if="article.create_time" class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-gray-600 dark:text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="font-serif">{{ formatDate(article.create_time) }}</span>
                  </div>

                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-gray-600 dark:text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <span class="font-serif">{{ getReadingTime(article.article_content) }} 分钟阅读</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content Section -->
            <div class="max-h-[60vh] overflow-y-auto custom-scrollbar bg-white/70 dark:bg-black/70 p-6 pb-6 rounded-b-2xl">
              <!-- Article Content -->
              <div class="prose prose-lg dark:prose-invert max-w-none font-serif">
                <div class="text-gray-900/90 dark:text-white/90 leading-relaxed text-lg" v-html="parsedContent"></div>
              </div>
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
      console.log('Article head image:', article.value.article_head_image);
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

const getStatusClass = (status) => {
  const classes = {
    0: 'bg-red-500/20 text-red-300 border border-red-500/30',
    1: 'bg-green-500/20 text-green-300 border border-green-500/30',
    2: 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
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

.font-serif {
  font-family: "Noto Serif SC", serif;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Light mode scrollbar */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  .custom-scrollbar {
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}

/* Modal Transition Styles */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Markdown Image Styles */
.markdown-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  object-fit: contain; /* Ensure full image is visible */
  margin-top: 1.5rem; /* Added margin for spacing */
  margin-bottom: 1.5rem; /* Added margin for spacing */
}

.markdown-image:hover {
  transform: scale(1.02); /* Slight scale for visual difference */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* Larger shadow on hover */
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  font-family: "Noto Serif SC", serif;
  color: rgba(0, 0, 0, 0.95); /* Light mode */
}

.prose p {
  font-family: "Noto Serif SC", serif;
  color: rgba(0, 0, 0, 0.9); /* Light mode */
  line-height: 1.8;
}

.prose code {
  background: rgba(0, 0, 0, 0.1); /* Light mode */
  color: rgba(0, 0, 0, 0.9); /* Light mode */
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.prose pre {
  background: rgba(255, 255, 255, 0.3); /* Light mode */
  border: 1px solid rgba(0, 0, 0, 0.1); /* Light mode */
  border-radius: 0.75rem;
  padding: 1rem;
}

.prose blockquote {
  border-left: 4px solid rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.prose ul, .prose ol {
  color: rgba(0, 0, 0, 0.9); /* Light mode */
}

.prose a {
  color: rgba(59, 130, 246, 1); /* Light mode */
  text-decoration: underline;
}

.prose a:hover {
  color: rgba(29, 78, 216, 1); /* Light mode */
}

/* Dark mode for prose */
.dark .prose h1, .dark .prose h2, .dark .prose h3, .dark .prose h4, .dark .prose h5, .dark .prose h6 {
  color: rgba(255, 255, 255, 0.95);
}

.dark .prose p {
  color: rgba(255, 255, 255, 0.9);
}

.dark .prose code {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

.dark .prose pre {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .prose blockquote {
  border-left: 4px solid rgba(147, 197, 253, 0.5);
  background: rgba(147, 197, 253, 0.1);
}

.dark .prose ul, .dark .prose ol {
  color: rgba(255, 255, 255, 0.9);
}

.dark .prose a {
  color: rgba(147, 197, 253, 1);
}

.dark .prose a:hover {
  color: rgba(96, 165, 250, 1);
}
</style>