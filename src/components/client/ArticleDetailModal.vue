<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">文章详情</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Article Details</p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Share Button -->
          <button
            @click="shareArticle"
            class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors duration-200"
            title="分享文章"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
            </svg>
          </button>

          <!-- Bookmark Button -->
          <button
            @click="toggleBookmark"
            class="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors duration-200"
            title="收藏文章"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          <!-- Close Button -->
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

      <!-- Loading State -->
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
          <button @click="loadArticle" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            重新加载
          </button>
        </div>
      </div>

      <!-- Article Content -->
      <div v-else-if="article" class="flex-1 overflow-y-auto">
        <!-- Article Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <!-- Category Badge -->
          <div class="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-4">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            {{ article.article_source || '未分类' }}
          </div>

          <!-- Title -->
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {{ article.article_title }}
          </h1>

          <!-- Summary -->
          <p v-if="article.article_summary" class="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {{ article.article_summary }}
          </p>

          <!-- Meta Info -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                  <span class="text-white font-semibold">
                    {{ article.article_author?.charAt(0) || 'A' }}
                  </span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-gray-100">
                    {{ article.article_author || '匿名作者' }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(article.create_time) }}
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span>{{ Math.floor(Math.random() * 1000) + 100 }} 阅读</span>
                </div>
                <div class="flex items-center space-x-1">
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
        </div>

        <!-- Head Image -->
        <div v-if="article.article_head_image" class="px-6 py-4">
          <img
            :src="article.article_head_image"
            :alt="article.article_title"
            class="w-full max-h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        <!-- Article Content -->
        <div class="px-6 py-8">
          <div class="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <div class="markdown-preview" v-html="parsedContent"></div>
          </div>
        </div>

        <!-- Related Articles -->
        <div class="px-6 py-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">相关文章</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="relatedArticle in relatedArticles"
              :key="relatedArticle.article_id"
              class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              @click="loadRelatedArticle(relatedArticle.article_id)"
            >
              <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                {{ relatedArticle.article_title }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ relatedArticle.article_summary }}
              </p>
              <div class="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                <span>{{ relatedArticle.article_author }}</span>
                <span>{{ formatDate(relatedArticle.create_time) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="px-6 py-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">评论区</h3>
          
          <!-- Comment Form -->
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
            <textarea
              v-model="newComment"
              placeholder="写下你的想法..."
              class="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="4"
            ></textarea>
            <div class="flex items-center justify-between mt-4">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                支持 Markdown 语法
              </div>
              <button
                @click="submitComment"
                :disabled="!newComment.trim()"
                class="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
              >
                发表评论
              </button>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-6">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="flex space-x-4"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-semibold text-sm">
                  {{ comment.author.charAt(0) }}
                </span>
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="font-semibold text-gray-900 dark:text-gray-100">{{ comment.author }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ comment.time }}</span>
                </div>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ comment.content }}</p>
                <div class="flex items-center space-x-4 mt-3">
                  <button class="text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200">
                    回复
                  </button>
                  <button class="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200">
                    点赞 ({{ comment.likes }})
                  </button>
                </div>
              </div>
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
const relatedArticles = ref([]);
const comments = ref([]);
const newComment = ref('');

// Mock comments data
const mockComments = [
  {
    id: 1,
    author: '张三',
    content: '这篇文章写得很好，学到了很多东西！',
    time: '2小时前',
    likes: 5
  },
  {
    id: 2,
    author: '李四',
    content: '作者的观点很有见地，期待更多这样的内容。',
    time: '5小时前',
    likes: 3
  },
  {
    id: 3,
    author: '王五',
    content: '感谢分享，对我的工作很有帮助。',
    time: '1天前',
    likes: 8
  }
];

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
      loadRelatedArticles();
      comments.value = mockComments;
    } else {
      error.value = response.message || '加载文章失败';
    }
  } catch (err) {
    error.value = '网络错误，请重试';
  } finally {
    loading.value = false;
  }
};

const loadRelatedArticles = async () => {
  try {
    const response = await articleApi.queryListBySelective({
      page: 1,
      per_page: 4,
      order_by: 'create_time',
      desc_order: true
    });

    if (response.success) {
      relatedArticles.value = (response.data.items || [])
        .filter(item => item.article_id !== props.articleId)
        .slice(0, 4);
    }
  } catch (err) {
    console.error('Failed to load related articles:', err);
  }
};

const loadRelatedArticle = (articleId) => {
  // Emit event to parent to load new article
  emit('close');
  // In a real app, you would navigate to the new article
  console.log('Load related article:', articleId);
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
  // Implement bookmark functionality
  console.log('Toggle bookmark for article:', props.articleId);
};

const submitComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      id: Date.now(),
      author: '当前用户',
      content: newComment.value.trim(),
      time: '刚刚',
      likes: 0
    };
    comments.value.unshift(comment);
    newComment.value = '';
  }
};

onMounted(() => {
  loadArticle();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>