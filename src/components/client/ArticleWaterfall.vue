<template>
  <div class="space-y-8 px-4 sm:px-6 lg:px-8" ref="containerRef">
    <!-- Section Header with Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
        最新文章
        <span v-if="totalCount > 0" class="text-base font-normal text-gray-500 dark:text-gray-400 ml-3">
          ({{ totalCount }} 篇)
        </span>
      </h2>

      <!-- Column Count Control -->
      <div class="hidden lg:flex items-center space-x-4">
        <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">布局:</span>
        <div class="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
          <button
            v-for="count in [2, 3, 4,]"
            :key="count"
            @click="setColumnCount(count)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              columnCount === count
                ? 'bg-primary-500 text-white shadow-md transform scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
            ]"
          >
            {{ count }}列
          </button>
        </div>
      </div>
    </div>

    <!-- Waterfall -->
    <div
      v-if="articles.length > 0"
      class="waterfall-container"
      :style="{ height: `${containerHeight}px` }"
      @scroll="handleScroll"
      ref="scrollContainer"
    >
      <div
        class="waterfall-content"
        :style="{
          height: `${totalHeight}px`,
          width: '100%',
          overflow: 'hidden'
        }"
      >
        <article
          v-for="item in visibleItems"
          :key="item.article.article_id"
          class="waterfall-item absolute"
          :style="{
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${item.width}px`,
            height: `${item.height}px`
          }"
        >
          <div
            class="article-card relative rounded-2xl overflow-hidden cursor-pointer group h-full"
            @click="handleArticleClick(item.article.article_id)"
            :style="getCardBackgroundStyle(item.article)"
          >
            <div
              v-if="item.article.article_head_image"
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"
            ></div>
            <div
              v-else
              class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
            ></div>

            <!-- Floating Actions -->
            <div class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                @click.stop="toggleBookmark(item.article)"
                class="action-btn bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 hover:text-red-400"
                title="收藏"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
              <button
                @click.stop="shareArticle(item.article)"
                class="action-btn bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 hover:text-blue-400"
                title="分享"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="absolute inset-0 p-8 flex flex-col justify-between z-10">
              <div class="space-y-4">
                <div v-if="item.article.article_source" class="flex items-start justify-between">
                  <div class="inline-flex items-center px-4 py-2 bg-white/25 backdrop-blur-lg rounded-xl text-sm font-semibold shadow-lg border border-white/20">
                    <MediaIcon :source="item.article.article_source" icon-size="sm" class="mr-2 text-white"/>
                    <span class="text-white">{{ item.article.article_source }}</span>
                  </div>
                </div>

                <h3 class="text-2xl font-bold leading-tight line-clamp-3 group-hover:text-primary-200 transition-colors duration-300"
                    :class="item.article.article_head_image ? 'text-white drop-shadow-lg' : 'text-gray-900 dark:text-gray-100'">
                  {{ item.article.article_title }}
                </h3>

                <p class="text-base leading-relaxed line-clamp-4 font-medium"
                   :class="item.article.article_head_image ? 'text-white/90 drop-shadow-sm' : 'text-gray-700 dark:text-gray-300'">
                  {{ item.article.article_summary || '这篇文章暂时没有摘要，点击查看完整内容...' }}
                </p>
              </div>

              <div class="space-y-4">
                <div v-if="item.article.tags && item.article.tags.length > 0" class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in item.article.tags.slice(0, 3)"
                    :key="tag"
                    class="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/30"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                        <span class="text-white font-bold text-sm">
                          {{ getAuthorInitial(item.article.article_author) }}
                        </span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-semibold" :class="item.article.article_head_image ? 'text-white' : 'text-gray-900 dark:text-gray-100'">
                          {{ item.article.article_author || '匿名作者' }}
                        </span>
                        <span class="text-xs opacity-80" :class="item.article.article_head_image ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'">
                          {{ formatDate(item.article.update_time || item.article.create_time) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  articles: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  hasMore: { type: Boolean, default: true },
  totalCount: { type: Number, default: 0 }
});

const emit = defineEmits(['load-more', 'article-click', 'refresh']);

// Refs
const containerRef = ref(null);
const scrollContainer = ref(null);

// Modal
const showDetailModal = ref(false);
const selectedArticleId = ref('');

// Waterfall state
const containerHeight = ref(1024);
const scrollTop = ref(0);
const columnCount = ref(3);
const columnWidth = ref(400);
const gap = ref(20);
const buffer = ref(200);

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
  const windowHeight = containerHeight.value;
  return waterfallItems.value.filter(item => {
    return item.top < scrollTop.value + windowHeight + buffer.value &&
           item.top + item.height > scrollTop.value - buffer.value;
  });
});

// Helpers
const getInnerAvailableWidth = () => {
  // 优先使用真正滚动容器的宽度（已剔除父级 padding 和滚动条）
  if (scrollContainer.value) {
    return scrollContainer.value.clientWidth || 0;
  }
  // 回退：外层容器 - padding
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

// Events
const handleScroll = (event) => {
  scrollTop.value = event.target.scrollTop;
  const { scrollTop: st, scrollHeight, clientHeight } = event.target;
  if (scrollHeight - st - clientHeight < 100 && props.hasMore && !props.loading) {
    emit('load-more');
  }
};

const handleResize = () => {
  updateLayout();
};

// Lifecycle
let ro = null; // ResizeObserver
onMounted(async () => {
  await nextTick(); // 确保 scrollContainer 已挂载
  updateLayout();
  window.addEventListener('resize', handleResize);

  // 监听容器尺寸变化（包括滚动条出现/消失引起的宽度变化）
  const target = scrollContainer.value || containerRef.value;
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
}, { deep: true });

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
const getRandomViews  = () => Math.floor(Math.random() * 1000) + 100;
const getRandomLikes  = () => Math.floor(Math.random() * 200) + 20;

const getReadingTime = (summary) => {
  if (!summary) return 3;
  const wordCount = summary.length; // 中文近似
  const readingTime = Math.ceil(wordCount / 300);
  return Math.max(1, Math.min(readingTime, 10));
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
</script>

<style scoped>
/* Waterfall container */
.waterfall-container {
  @apply relative;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
  max-width: 100%;
  box-sizing: border-box;
}

.waterfall-container::-webkit-scrollbar { width: 4px; }
.waterfall-container::-webkit-scrollbar-track { background: transparent; }
.waterfall-container::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}
.waterfall-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}

.waterfall-content {
  @apply relative;
  width: 100%;
  min-height: 100%;
  overflow: hidden; /* 防止误差时滚动条闪烁 */
  box-sizing: border-box;
}

.waterfall-item {
  @apply transition-all duration-300 ease-out;
  will-change: transform;
  box-sizing: border-box;
  max-width: 100%;
}

.article-card {
  @apply transform hover:-translate-y-2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}
.article-card:hover { transform: translateY(-8px) scale(1.02); }

.action-btn {
  @apply p-2 transition-all duration-200 transform hover:scale-110;
  backdrop-filter: blur(12px);
}

/* line clamp utils */
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }

/* Load more btn */
.load-more-btn { @apply relative overflow-hidden; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.load-more-btn::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full;
  transition: transform 0.6s;
}
.load-more-btn:hover::before { @apply translate-x-full; }

.waterfall-item * { will-change: auto; }
.waterfall-item:hover * { will-change: transform; }

@media (max-width: 640px) {
  .waterfall-item { @apply mx-1; }
}

.article-card::before {
  content: '';
  position: absolute; inset: 0;
  transform: translateX(-100%);
  transition: transform 0.6s; z-index: 1;
}
.article-card:hover::before { transform: translateX(100%); }

.waterfall-item { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

.grid { display: grid; gap: 1rem; }
</style>
