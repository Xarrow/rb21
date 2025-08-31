<template>
  <div class="space-y-8 px-4 sm:px-6 lg:px-8" ref="containerRef">
    <!-- Section Header with Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 font-serif">
        “错过一条好鱼， 比错过下班还难受”
        <span v-if="totalCount > 0" class="text-base font-normal text-gray-500 dark:text-gray-400 ml-3">
          ({{ totalCount }} 条)
        </span>
      </h2>

      <!-- Column Count Control -->
      <div class="hidden lg:flex items-center space-x-4">
        <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">摸鱼姿势:</span>
        <div
            class="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
          <button v-for="count in [2, 3, 4,]" :key="count" @click="setColumnCount(count)" :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
            columnCount === count
              ? 'bg-primary-500 text-white shadow-md transform scale-105'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
          ]">
            {{ count }}列
          </button>
        </div>
      </div>
    </div>

    <!-- Waterfall -->
    <div v-if="articles.length > 0" class="relative" ref="containerRef">
      <div class="relative" :style="{
        width: '100%',
        minHeight: `${totalHeight}px`
      }">
        <article v-for="item in visibleItems" :key="item.article.article_id" class="waterfall-item absolute" :style="{
          left: `${item.left}px`,
          top: `${item.top}px`,
          width: `${item.width}px`,
          height: `${item.height}px`
        }">

          <div class="article-card relative rounded-2xl overflow-hidden cursor-pointer group h-full"
               @click="handleArticleClick(item.article.article_id)" :style="getCardBackgroundStyle(item.article)">

            <!-- 带概要图片 -->
            <div v-if="item.article.article_head_image && item.article.show_style !== 'post'"
                 class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20">
              <div class="absolute inset-0 p-6 flex flex-col justify-end z-10 space-y-4">

                <!-- Meta Info Row -->
                <div class="flex items-center gap-2 text-sm text-white/90 drop-shadow-md">
                  <MediaIcon v-if="item.article.article_source" :source="item.article.article_source" icon-size="xl"
                             class="shrink-0"/>
                  <span v-if="item.article.article_source" class="truncate">
        {{ item.article.article_source }}
      </span>
                  <span v-if="item.article.article_author" class="truncate">
        · {{ item.article.article_author }}
      </span>
                  <span v-if="item.article.update_time || item.article.create_time">
        · {{ formatDate(item.article.update_time || item.article.create_time) }}
      </span>
                </div>

                <!-- Title -->
                <h3 class="font-bold leading-snug line-clamp-2 text-white drop-shadow-lg text-lg sm:text-xl">
                  {{ item.article.article_title }}
                </h3>

                <!-- Summary -->
                <p v-if="item.article.article_summary" class="leading-relaxed line-clamp-3 font-normal text-white/90 drop-shadow-sm">
                  {{ item.article.article_summary }}
                </p>

                <!-- Tags -->
                <div v-if="item.article.tags && item.article.tags.length > 0" class="flex flex-wrap gap-1.5 pt-1">
      <span v-for="tag in item.article.tags.slice(0, 3)" :key="tag"
            class="inline-flex items-center px-2 py-0.5 rounded-full font-medium
                   bg-black/30 backdrop-blur-sm text-white/90 shadow-sm">
        #{{ tag }}
      </span>
                </div>

              </div>
            </div>

            <!-- 语录卡片样式 -->
            <div v-else-if="!item.article.article_head_image || item.article.show_style === 'post'"
                 class="w-full h-full rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden"
                 :style="getQuoteCardStyle(item.article)">
              <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/0 backdrop-blur-sm"></div>
              <div class="relative z-10 text-center px-2">
                <!-- 引号图标 -->
                <svg class="w-8 h-8 text-gray-700/70 dark:text-white/60 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                
                <!-- Title -->
                <h3 class="text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm px-4 text-gray-800 dark:text-white">
                  {{ item.article.article_title }}
                </h3>
                
                <!-- Author -->
                <div class="mt-4 flex items-center justify-center">
                  <div class="h-px bg-gray-700/40 dark:bg-white/30 flex-grow"></div>
                  <div class="px-4 py-1">
                    <span class="font-medium text-gray-700 dark:text-white/85">
                      <span v-if="item.article.article_author">—— {{ item.article.article_author }}</span>
                      <span v-else-if="item.article.article_source">—— {{ item.article.article_source }}</span>
                    </span>
                  </div>
                  <div class="h-px bg-gray-700/40 dark:bg-white/30 flex-grow"></div>
                </div>
                
                <!-- Tags -->
                <div v-if="item.article.tags && item.article.tags.length > 0" 
                     class="flex flex-wrap justify-center gap-1.5 mt-4">
                  <span v-for="tag in item.article.tags.slice(0, 3)" :key="tag"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                               bg-gray-700/25 dark:bg-white/20 backdrop-blur-sm text-gray-700 dark:text-white shadow-sm">
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 不带概要图片的标准卡片 -->
            <div v-else
                 class="w-full h-full rounded-2xl p-6 flex flex-col justify-between
            bg-white dark:bg-gray-900 shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-700">
              <div class="absolute inset-0 p-6 flex flex-col justify-start z-10 space-y-4">

                <!-- Meta Info Row -->
                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <MediaIcon
                      v-if="item.article.article_source"
                      :source="item.article.article_source"
                      icon-size="sm"
                      class="shrink-0"
                  />
                  <span v-if="item.article.article_source" class="truncate">
                    {{ item.article.article_source }}
                  </span>
                  <span v-if="item.article.article_author" class="truncate">
                    · {{ item.article.article_author }}
                  </span>
                  <span v-if="item.article.update_time || item.article.create_time">
                    · {{ formatDate(item.article.update_time || item.article.create_time) }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-xl sm:text-2xl font-bold leading-snug text-gray-900 dark:text-white drop-shadow-sm line-clamp-2">
                  {{ item.article.article_title }}
                </h3>

                <!-- Summary -->
                <p v-if="item.article.article_summary"
                   class="text-base leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-4">
                  {{ item.article.article_summary }}
                </p>

                <!-- Tags -->
                <div v-if="item.article.tags && item.article.tags.length > 0"
                     class="flex flex-wrap gap-1.5 pt-2 text-xs">
                  <span v-for="tag in item.article.tags.slice(0, 3)" :key="tag"
                        class="inline-flex items-center px-2 py-0.5 rounded-full
                               bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium shadow-sm">
                    #{{ tag }}
                  </span>
                </div>

              </div>
            </div>


            <div
                class="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <!-- <div v-if="loading" class="grid gap-4" :style="{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }">
      <div v-for="i in columnCount * 2" :key="i" class="animate-pulse">
        <div class="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden"
             :style="{ height: `${200 + Math.random() * 100}px` }">
          <div class="p-6 h-full flex flex-col justify-between">
            <div>
              <div class="h-3 bg-white/20 rounded mb-3 w-20"></div>
              <div class="h-5 bg-white/30 rounded mb-3"></div>
              <div class="space-y-2">
                <div class="h-3 bg-white/20 rounded"></div>
                <div class="h-3 bg-white/20 rounded w-3/4"></div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-white/20 rounded-full"></div>
                <div class="h-3 bg-white/20 rounded w-16"></div>
              </div>
              <div class="h-3 bg-white/20 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Load More -->
    <!-- <div v-if="hasMore && !loading && articles.length > 0" class="text-center py-8">
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
    </div> -->

    <!-- No More -->
    <!-- <div v-if="!hasMore && articles.length > 0" class="text-center py-8">
      <div class="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        已加载全部内容
      </div>
    </div> -->

    <!-- Empty -->
    <div v-if="!loading && articles.length === 0" class="text-center py-16">
      <div class="max-w-md mx-auto">
        <svg class="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor"
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">暂无文章</h3>
        <p class="text-gray-400 dark:text-gray-500 mb-6">没有找到符合条件的文章，试试其他搜索条件吧</p>
        <button @click="handleRefresh"
                class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200">
          刷新页面
        </button>
      </div>
    </div>

    <!-- Article Detail Modal -->
    <ArticleDetailCard v-if="showDetailModal" :article-id="selectedArticleId" @close="closeDetailModal"/>
  </div>
</template>

<script setup>
import MediaIcon from '../MediaIcon.vue';
import ArticleDetailCard from './ArticleDetailCard.vue';
import {ref, computed, onMounted, onUnmounted, watch, nextTick} from 'vue';

const props = defineProps({
  articles: {type: Array, default: () => []},
  loading: {type: Boolean, default: false},
  hasMore: {type: Boolean, default: true},
  totalCount: {type: Number, default: 0}
});

const emit = defineEmits(['load-more', 'article-click', 'refresh']);
const loading = ref(false);

// Refs
const containerRef = ref(null);

// Modal
const showDetailModal = ref(false);
const selectedArticleId = ref('');

// Waterfall state
const containerHeight = ref(1024);
const columnCount = ref(4);
const columnWidth = ref(400);
const gap = ref(27);

// Breakpoints
const getResponsiveColumnCount = (width) => {
  if (width < 640) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 2;
  if (width < 1280) return 3;
  if (width < 1536) return 3;
  return 3;
};

// Sort
const sortedArticles = computed(() => {
  return [...props.articles].sort((a, b) => {
    const timeA = new Date(a.update_time || a.create_time);
    const timeB = new Date(b.update_time || b.create_time);
    return timeB - timeA;
  });
});

// Items
const waterfallItems = computed(() => {
  const items = [];
  const colHeights = new Array(columnCount.value).fill(0);

  sortedArticles.value.forEach((article) => {
    const width = columnWidth.value;
    let height = 350;

    if (article.article_head_image) {
      const summaryWidth = article.head_image_summary_width || 400;
      const summaryHeight = article.head_image_summary_height ||
          (article.head_image_summary_width ? Math.round(article.head_image_summary_width * 0.8) : 320);

      const calculatedHeight = Math.round((summaryHeight / summaryWidth) * width);
      height = Math.max(320, Math.min(calculatedHeight, width * 1.5));
    } else {
      height = 280;
    }

    if (article.article_summary) {
      const len = article.article_summary.length;
      if (len > 150) height += 40;
      else if (len > 100) height += 20;
    }

    // place in the shortest column
    const colIndex = colHeights.indexOf(Math.min(...colHeights));
    const left = colIndex * (columnWidth.value + gap.value);
    const top = colHeights[colIndex];

    items.push({
      article,
      left,
      top,
      width,
      height,
      columnIndex: colIndex
    });

    colHeights[colIndex] += height + gap.value;
  });

  return items;
});

const totalHeight = computed(() => {
  if (waterfallItems.value.length === 0) return 0;
  return Math.max(...waterfallItems.value.map(i => i.top + i.height)) + gap.value;
});

const visibleItems = computed(() => {
  // Since we removed the scroll container, show all items
  return waterfallItems.value;
});

// Helpers
const getInnerAvailableWidth = () => {
  // Use containerRef width minus padding
  if (containerRef.value) {
    const el = containerRef.value;
    const style = getComputedStyle(el);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    return Math.max(0, (el.clientWidth || 0) - paddingLeft - paddingRight);
  }
  return 0;
};

// Layout
const updateLayout = () => {
  const availableWidth = getInnerAvailableWidth();
  if (availableWidth <= 0) return;

  // 响应式列数
  const responsiveColumns = getResponsiveColumnCount(availableWidth);
  if (window.innerWidth < 1024) {
    columnCount.value = responsiveColumns;
  }

  // 列宽（向下取整，避免最后一列溢出）
  const totalGapWidth = gap.value * Math.max(0, columnCount.value - 1);
  const rawColWidth = (availableWidth - totalGapWidth) / columnCount.value;
  columnWidth.value = Math.max(1, Math.floor(rawColWidth));

  // 最小列宽保障
  if (columnWidth.value < 280) {
    columnCount.value = Math.max(1, Math.floor(availableWidth / 300));
    const newTotalGap = gap.value * Math.max(0, columnCount.value - 1);
    columnWidth.value = Math.max(1, Math.floor((availableWidth - newTotalGap) / columnCount.value));
  }

  // 容器高度
  containerHeight.value = Math.min(window.innerHeight - 120, 1000);
};

const setColumnCount = (count) => {
  columnCount.value = count;
  nextTick(updateLayout);
};

const getCardBackgroundStyle = (article) => {
  if (article.article_head_image) {
    return {
      backgroundImage: `url(${article.article_head_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }
  return {};
};

const getQuoteCardStyle = (article) => {
  // 生成随机背景色
  const lightColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
  ];
  
  const darkColors = [
    'linear-gradient(135deg, #5a67d8 0%, #6b47a0 100%)',
    'linear-gradient(135deg, #e076e8 0%, #f04760 100%)',
    'linear-gradient(135deg, #3f9bfe 0%, #00d9e9 100%)',
    'linear-gradient(135deg, #3ad56c 0%, #2de5c7 100%)',
    'linear-gradient(135deg, #f95f8a 0%, #fdd130 100%)',
    'linear-gradient(135deg, #98dde5 0%, #f0c6d6 100%)',
    'linear-gradient(135deg, #4eddd1 0%, #a97fc0 100%)',
    'linear-gradient(135deg, #c78bb6 0%, #f0e9c7 100%)',
    'linear-gradient(135deg, #f0c952 0%, #fc9170 100%)',
    'linear-gradient(135deg, #f9afdf 0%, #98b5e5 100%)'
  ];
  
  // 使用文章ID生成确定性的随机索引，确保同一篇文章总是有相同的背景色
  const index = article.article_id ? 
    (article.article_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % lightColors.length : 
    Math.floor(Math.random() * lightColors.length);
  
  // 检查是否为深色模式
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return {
    background: isDarkMode ? darkColors[index] : lightColors[index]
  };
};

// Events

const handleResize = () => {
  updateLayout();
};

// Lifecycle
let ro = null; // ResizeObserver
onMounted(async () => {
  await nextTick(); // 确保 scrollContainer 已挂载
  updateLayout();
  window.addEventListener('resize', handleResize);

  // Listen to container size changes
  const target = containerRef.value;
  if ('ResizeObserver' in window && target) {
    ro = new ResizeObserver(() => updateLayout());
    ro.observe(target);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (ro) {
    ro.disconnect();
    ro = null;
  }
});

// Data/State watchers
watch(columnCount, () => updateLayout());
watch(() => props.articles, async () => {
  await nextTick();
  updateLayout();
}, {deep: true});

// Utils
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  return date.toLocaleDateString('zh-CN');
};

const getAuthorInitial = (author) => author?.charAt(0)?.toUpperCase() || 'A';
const getRandomViews = () => Math.floor(Math.random() * 1000) + 100;
const getRandomLikes = () => Math.floor(Math.random() * 200) + 20;

const getReadingTime = (summary) => {
  if (!summary) return 3;
  const wordCount = summary.length; // 中文近似
  const readingTime = Math.ceil(wordCount / 300);
  return Math.max(1, Math.min(readingTime, 10));
};

const handleRefresh = () => {
  emit('refresh');
  loading.value = true;
  setTimeout(() => loading.value = false, 1000);
};

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

const getFontSize = (item, type) => {
  const baseWidth = 400; // 设计稿的参考宽度
  const scale = item.width / baseWidth; // 宽度缩放比例

  switch (type) {
    case 'meta':
      return `${Math.max(10, 12 * scale)}px`; // 来源/作者/时间
    case 'title':
      return `${Math.max(16, 20 * scale)}px`; // 标题
    case 'summary':
      return `${Math.max(12, 14 * scale)}px`; // 摘要
    case 'tag':
      return `${Math.max(10, 12 * scale)}px`; // 标签
    default:
      return '14px';
  }
};

</script>

<style scoped>
.waterfall-item {
  @apply transition-all duration-300 ease-out;
  will-change: transform;
  box-sizing: border-box;
  max-width: 100%;
}

/* line clamp utils */

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Load more btn */

.waterfall-item * {
  will-change: auto;
}

.waterfall-item:hover * {
  will-change: transform;
}

@media (max-width: 640px) {
  .waterfall-item {
    @apply mx-1;
  }
}


.article-card {
  @apply transform hover:-translate-y-2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.article-card:hover {
  transform: translateY(-8px) scale(1.02);
}


.article-card::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  transition: transform 0.6s;
  z-index: 1;
}

.article-card:hover::before {
  transform: translateX(100%);
}

.waterfall-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.waterfall-item {
  grid-column-end: span 1;
  opacity: 0;
  animation: fadeIn 1s ease-out 100ms forwards;
}

.article-card {
  @apply relative rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 ease-out
  hover:-translate-y-2 hover:scale-105 shadow-lg dark:shadow-xl;
  box-sizing: border-box;
}

.article-card::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  z-index: 1;
}

.article-card:hover::before {
  transform: translateX(100%);
}

.waterfall-item {
  @apply transition-all duration-300 ease-out;
  will-change: transform;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.1s forwards;
}


</style>
