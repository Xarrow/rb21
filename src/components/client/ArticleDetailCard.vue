<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="relative max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <!-- Movie Card Style Container -->
      <div class="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
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

        <!-- Close Button -->
        <button
            @click="$emit('close')"
            class="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-all duration-200 transform hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center h-96 text-white">
          <div class="text-center">
            <div class="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-white/80 font-serif">加载中...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex items-center justify-center h-96 text-white">
          <div class="text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-400 mb-4 font-serif">{{ error }}</p>
            <button @click="loadArticle" class="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200 font-serif">
              重新加载
            </button>
          </div>
        </div>

        <!-- Article Content -->
        <div v-else-if="article" class="relative">
          <!-- Header Section -->
          <div class="relative p-8 pb-6">
            <!-- Decorative Elements -->
            <div class="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"></div>
            <div class="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-2xl"></div>

            <div class="relative z-10">
              <!-- Category Badge -->
              <div v-if="article.article_source" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6 border border-primary-500/30">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                {{ article.article_source }}
              </div>

              <!-- Title -->
              <h1 class="text-4xl font-bold text-white mb-6 leading-tight font-serif">
                {{ article.article_title }}
              </h1>

              <!-- Meta Info -->
              <div class="flex items-center space-x-6 text-white/70">
                <div v-if="article.article_author" class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center ring-2 ring-white/20">
                    <span class="text-white font-semibold text-sm">
                      {{ article.article_author?.charAt(0) || 'A' }}
                    </span>
                  </div>
                  <div>
                    <div class="font-medium text-white font-serif">{{ article.article_author }}</div>
                    <div class="text-sm text-white/60">作者</div>
                  </div>
                </div>

                <div v-if="article.create_time" class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="font-serif">{{ formatDate(article.create_time) }}</span>
                </div>

                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span class="font-serif">{{ getReadingTime(article.article_content) }} 分钟阅读</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <!-- Head Image -->
<!--            <div v-if="article.article_head_image" class="px-8 mb-8">-->
<!--              <div class="relative rounded-2xl overflow-hidden shadow-2xl">-->
<!--                <img-->
<!--                    :src="article.article_head_image"-->
<!--                    :alt="article.article_title"-->
<!--                    class="w-full max-h-80 object-cover"-->
<!--                />-->
<!--                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>-->
<!--              </div>-->
<!--            </div>-->

            <!-- Article Content -->
            <div class="px-8 pb-8">
              <div class="prose prose-lg prose-invert max-w-none font-serif">
                <div class="text-white/90 leading-relaxed text-lg" v-html="parsedContent"></div>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-8 py-6 border-t border-white/10 bg-gradient-to-r from-black/20 to-transparent">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <button
                    @click="toggleBookmark"
                    class="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span class="font-serif">收藏</span>
                </button>

                <button
                    @click="shareArticle"
                    class="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                  <span class="font-serif">分享</span>
                </button>
              </div>

              <!-- Status Badge -->
              <span
                  class="px-3 py-1 text-xs font-medium rounded-full font-serif"
                  :class="getStatusClass(article.status)"
              >
                {{ getStatusText(article.status) }}
              </span>
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
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  font-family: "Noto Serif SC", serif;
  color: rgba(255, 255, 255, 0.95);
}

.prose p {
  font-family: "Noto Serif SC", serif;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
}

.prose code {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.prose pre {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  color: rgba(255, 255, 255, 0.9);
}

.prose a {
  color: rgba(96, 165, 250, 1);
  text-decoration: underline;
}

.prose a:hover {
  color: rgba(147, 197, 253, 1);
}
</style>