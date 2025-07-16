<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
<!--    <ArticleHeader />-->
    
    <main class="pt-20">
      <div class="container mx-auto px-4 py-8">
        <div v-if="isLoading" class="max-w-4xl mx-auto">
          <!-- Loading Skeleton -->
          <div class="animate-pulse space-y-6">
            <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
            <div class="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="max-w-4xl mx-auto text-center py-16">
          <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">文章加载失败</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">{{ error }}</p>
          <button @click="loadArticle" class="btn-primary">重新加载</button>
        </div>

        <article v-else-if="article" class="max-w-4xl mx-auto">
          <!-- Article Header -->
          <header class="mb-8">
            <div class="mb-6">
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                {{ article.article_title }}
              </h1>
              
              <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">
                      {{ (article.article_author || '匿名')[0] }}
                    </span>
                  </div>
                  <span>{{ article.article_author || '匿名作者' }}</span>
                </div>
                
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ formatDate(article.update_time) }}</span>
                </div>
                
                <div class="flex items-center space-x-1">
                  <MediaIcon :source="article.article_source" />
                  <span>{{ article.article_source }}</span>
                </div>
              </div>
            </div>

            <!-- Head Image -->
            <div v-if="article.article_head_image" class="mb-8">
              <img 
                :src="article.article_head_image" 
                :alt="article.article_title"
                class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                @error="onImageError"
              />
            </div>

            <!-- Summary -->
            <div v-if="article.article_summary" class="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-4 rounded-r-lg mb-8">
              <p class="text-gray-700 dark:text-gray-300 italic">{{ article.article_summary }}</p>
            </div>
          </header>

          <!-- Article Content -->
          <div class="prose prose-lg dark:prose-invert max-w-none mb-12" v-html="parsedContent"></div>

          <!-- Article Actions -->
          <div class="flex items-center justify-between py-6 border-t border-gray-200 dark:border-gray-700 mb-8">
            <div class="flex items-center space-x-4">
              <button class="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                </svg>
                <span>收藏</span>
              </button>
              
              <button class="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                <span>分享</span>
              </button>
            </div>
            
            <button @click="goBack" class="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span>返回</span>
            </button>
          </div>

          <!-- Related Articles -->
          <section class="mb-12">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">相关文章</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ArticleCard
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.article_id"
                :article="relatedArticle"
                :compact="true"
                @click="goToDetail(relatedArticle.article_id)"
              />
            </div>
          </section>

          <!-- Comments Section -->
          <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">评论区</h3>
            
            <!-- Comment Form -->
            <div class="mb-8">
              <textarea
                v-model="newComment"
                placeholder="写下你的想法..."
                class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows="4"
              ></textarea>
              <div class="flex justify-end mt-3">
                <button class="btn-primary">发表评论</button>
              </div>
            </div>

            <!-- Comments List -->
            <div class="space-y-6">
              <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <p>暂无评论，来发表第一条评论吧！</p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>

    <ArticleFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ArticleHeader from '../components/ArticleHeader.vue';
import ArticleFooter from '../components/ArticleFooter.vue';
import ArticleCard from '../components/ArticleCard.vue';
import MediaIcon from '../components/MediaIcon.vue';
import { articleApi } from '../services/api';
import { parseMarkdown } from '../utils/markdown';

const route = useRoute();
const router = useRouter();

const article = ref(null);
const relatedArticles = ref([]);
const isLoading = ref(false);
const error = ref('');
const newComment = ref('');

const parsedContent = computed(() => {
  return article.value ? parseMarkdown(article.value.article_content) : '';
});

const loadArticle = async () => {
  const articleId = route.params.id;
  if (!articleId) return;

  isLoading.value = true;
  error.value = '';

  try {
    const response = await articleApi.getArticleDetail(articleId);
    
    if (response.success) {
      article.value = response.data;
      await loadRelatedArticles();
    } else {
      error.value = response.message || '文章不存在';
    }
  } catch (err) {
    error.value = '网络错误，请重试';
  } finally {
    isLoading.value = false;
  }
};

const loadRelatedArticles = async () => {
  if (!article.value) return;

  try {
    const response = await articleApi.queryListBySelective({
      page: 1,
      per_page: 6,
      status: 1,
      article_source: article.value.article_source,
      order_by: 'update_time',
      desc_order: true
    });

    if (response.success) {
      relatedArticles.value = (response.data.items || [])
        .filter(item => item.article_id !== article.value.article_id)
        .slice(0, 3);
    }
  } catch (err) {
    console.error('Failed to load related articles:', err);
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

const onImageError = (event) => {
  event.target.style.display = 'none';
};

const goToDetail = (articleId) => {
  router.push(`/article/${articleId}`);
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  loadArticle();
});
</script>
