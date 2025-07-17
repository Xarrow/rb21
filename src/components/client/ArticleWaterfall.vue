<template>
  <div class="space-y-8">
    <!-- Section Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        最新文章
        <span v-if="totalCount > 0" class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
          ({{ totalCount }} 篇)
        </span>
      </h2>
      <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span>实时更新</span>
      </div>
    </div>

    <!-- Articles Grid -->
    <div class="masonry-grid" v-if="articles.length > 0">
      <article
          v-for="article in articles"
          :key="article.article_id"
          class="masonry-item mb-6 break-inside-avoid"
      >
        <!-- Article Style Card -->
        <div
            v-if="article.show_style === 'article'"
            class="article-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group"
            @click="handleArticleClick(article.article_id)"
        >
          <!-- Image -->
          <div v-if="article.article_head_image" class="relative overflow-hidden">
            <img
                :src="article.article_head_image"
                :alt="article.article_title"
                class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <!-- Floating Actions -->
            <div class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                  @click.stop="toggleBookmark(article)"
                  class="action-btn bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-500"
                  title="收藏"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
              <button
                  @click.stop="shareArticle(article)"
                  class="action-btn bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-500"
                  title="分享"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Category Badge -->
            <div v-if="article.article_source"
                 class="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium mb-3">
              <MediaIcon :source="article.article_source" icon-size="sm" class="mr-1"/>
              {{ article.article_source }}
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2 leading-tight">
              {{ article.article_title }}
            </h3>

            <!-- Summary -->
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
              {{ article.article_summary || '暂无摘要...' }}
            </p>

            <!-- Meta Info -->
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-xs">
                      {{ getAuthorInitial(article.article_author) }}
                    </span>
                  </div>
                  <span>{{ article.article_author || '匿名' }}</span>
                </div>
                <span>•</span>
                <span>{{ formatDate(article.update_time || article.create_time) }}</span>
              </div>
              <div class="flex items-center space-x-1 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <span>{{ getRandomViews() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Post Style Card -->
        <div
            v-else
            class="post-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group"
            @click="handleArticleClick(article.article_id)"
        >
          <!-- With Image -->
          <div v-if="article.article_head_image" class="relative">
            <img
                :src="article.article_head_image"
                :alt="article.article_title || ''"
                class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
            />

            <!-- Content Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <!-- Title -->
                <h3 v-if="article.article_title" class="text-xl font-bold mb-2 line-clamp-2">
                  {{ article.article_title }}
                </h3>

                <!-- Summary -->
                <p v-if="article.article_summary" class="text-gray-200 text-sm mb-3 line-clamp-2">
                  {{ article.article_summary }}
                </p>

                <!-- Meta Info -->
                <div class="flex items-center justify-between text-xs text-gray-300">
                  <div class="flex items-center space-x-3">
                    <!-- Source -->
                    <div v-if="article.article_source" class="flex items-center space-x-1">
                      <component
                          :is="article.article_source_link ? 'a' : 'div'"
                          :href="article.article_source_link"
                          :target="article.article_source_link ? '_blank' : undefined"
                          @click.stop="article.article_source_link ? null : undefined"
                          class="flex items-center space-x-1 hover:text-white transition-colors"
                          :class="{ 'cursor-pointer': article.article_source_link }"
                      >
                        <MediaIcon :source="article.article_source" icon-size="sm"/>
                        <span>{{ article.article_source }}</span>
                      </component>
                    </div>

                    <!-- Author -->
                    <span v-if="article.article_author">{{ article.article_author }}</span>
                  </div>

                  <!-- Update Time -->
                  <span v-if="article.update_time">{{ formatDate(article.update_time) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Without Image - Text Card -->
          <div v-else class="p-6 min-h-[200px] flex flex-col justify-center">
            <!-- Title -->
            <h3 v-if="article.article_title" class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 line-clamp-2 leading-tight">
              {{ article.article_title }}
            </h3>

            <!-- Summary as main content -->
            <div v-if="article.article_summary" class="flex-1 flex items-center justify-center mb-4">
              <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed  font-serif">
                {{ article.article_summary }}
              </p>
            </div>

            <!-- Meta Info -->
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div class="flex items-center space-x-3">
                <!-- Source -->
                <div v-if="article.article_source" class="flex items-center space-x-1">
                  <component
                      :is="article.article_source_link ? 'a' : 'div'"
                      :href="article.article_source_link"
                      :target="article.article_source_link ? '_blank' : undefined"
                      @click.stop="article.article_source_link ? null : undefined"
                      class="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                      :class="{ 'cursor-pointer': article.article_source_link }"
                  >
                    <MediaIcon :source="article.article_source" icon-size="sm"/>
                    <span>{{ article.article_source }}</span>
                  </component>
                </div>

                <!-- Author -->
                <span v-if="article.article_author">{{ article.article_author }}</span>
              </div>

              <!-- Update Time -->
              <span v-if="article.update_time">{{ formatDate(article.update_time) }}</span>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="masonry-grid">
      <div v-for="i in 6" :key="i" class="masonry-item mb-6 break-inside-avoid">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-6">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !loading && articles.length > 0" class="text-center py-8">
      <button
          @click="$emit('load-more')"
          class="load-more-btn px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        加载更多文章
      </button>
    </div>

    <!-- No More Content -->
    <div v-if="!hasMore && articles.length > 0" class="text-center py-8">
      <div class="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        已加载全部内容
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && articles.length === 0" class="text-center py-16">
      <div class="max-w-md mx-auto">
        <svg class="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">暂无文章</h3>
        <p class="text-gray-400 dark:text-gray-500 mb-6">没有找到符合条件的文章，试试其他搜索条件吧</p>
        <button
            @click="$emit('refresh')"
            class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          刷新页面
        </button>
      </div>
    </div>

    <!-- Article Detail Modal -->
    <ArticleDetailCard
        v-if="showDetailModal"
        :article-id="selectedArticleId"
        @close="closeDetailModal"
    />
  </div>
</template>

<script setup>
import MediaIcon from '../MediaIcon.vue';
import ArticleDetailCard from './ArticleDetailCard.vue';
import { ref } from 'vue';

const props = defineProps({
  articles: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  hasMore: {
    type: Boolean,
    default: true
  },
  totalCount: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['load-more', 'article-click', 'refresh']);

// Modal state
const showDetailModal = ref(false);
const selectedArticleId = ref('');

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return '';

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
    return date.toLocaleDateString('zh-CN');
  }
};

const getAuthorInitial = (author) => {
  return author?.charAt(0)?.toUpperCase() || 'A';
};

const getRandomViews = () => {
  return Math.floor(Math.random() * 1000) + 100;
};

// Event handlers
const handleArticleClick = (articleId) => {
  selectedArticleId.value = articleId;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedArticleId.value = '';
};

const toggleBookmark = (article) => {
  console.log('Toggle bookmark for:', article.article_id);
};

const shareArticle = (article) => {
  if (navigator.share) {
    navigator.share({
      title: article.article_title,
      text: article.article_summary,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
  }
};
</script>

<style scoped>
.masonry-grid {
  columns: 1;
  column-gap: 1.5rem;
}

@media (min-width: 640px) {
  .masonry-grid {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    columns: 2;
  }
}

@media (min-width: 1280px) {
  .masonry-grid {
    columns: 3;
  }
}

.masonry-item {
  break-inside: avoid;
  page-break-inside: avoid;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card {
  @apply transform hover:-translate-y-2;
}

.post-card {
  @apply transform hover:-translate-y-1;
}

.action-btn {
  @apply p-2 transition-all duration-200 transform hover:scale-110;
}

.load-more-btn {
  @apply relative overflow-hidden;
}

.load-more-btn::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full;
  transition: transform 0.6s;
}

.load-more-btn:hover::before {
  @apply translate-x-full;
}
</style>