<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
    <div class="p-6 pb-0">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
          <svg class="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
          </svg>
          热门文章
        </h2>
        <div class="flex items-center space-x-2">
          <button
            @click="prevSlide"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            :disabled="isTransitioning"
          >
            <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            @click="nextSlide"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            :disabled="isTransitioning"
          >
            <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="relative overflow-hidden" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(article, index) in hotArticles"
          :key="article.article_id"
          class="w-full flex-shrink-0 px-6 pb-6"
        >
          <div 
            class="group cursor-pointer"
            @click="goToDetail(article.article_id)"
          >
            <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 h-80 md:h-96">
              <!-- Background Image with Parallax Effect -->
              <div 
                class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                :style="{ backgroundImage: `url(${article.article_head_image || '/placeholder.svg?height=400&width=800'})` }"
              ></div>
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <!-- Content -->
              <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <!-- Category Badge -->
                <div class="mb-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600/90 text-white backdrop-blur-sm">
                    <MediaIcon :source="article.article_source" class="mr-1" />
                    {{ article.article_source }}
                  </span>
                </div>
                
                <!-- Title -->
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors duration-300">
                  {{ article.article_title }}
                </h3>
                
                <!-- Summary -->
                <p class="text-gray-200 text-sm md:text-base mb-4 line-clamp-2 opacity-90">
                  {{ article.article_summary || '暂无摘要' }}
                </p>
                
                <!-- Meta Info -->
                <div class="flex items-center justify-between text-sm text-gray-300">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span>{{ article.article_author || '匿名' }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{{ formatDate(article.update_time) }}</span>
                    </div>
                  </div>
                  
                  <!-- Read More Button -->
                  <div class="flex items-center space-x-1 text-primary-300 group-hover:text-primary-200 transition-colors duration-300">
                    <span class="text-sm font-medium">阅读更多</span>
                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Hover Effect Overlay -->
              <div class="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="px-6 pb-6">
        <div class="animate-pulse">
          <div class="h-80 md:h-96 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="hotArticles.length === 0" class="px-6 pb-6 text-center py-16">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p class="text-gray-500 dark:text-gray-400">暂无热门文章</p>
      </div>
    </div>

    <!-- Indicators -->
    <div v-if="hotArticles.length > 1" class="flex justify-center space-x-2 pb-6">
      <button
        v-for="(article, index) in hotArticles"
        :key="`indicator-${index}`"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="index === currentSlide ? 'bg-primary-600 w-6' : 'bg-gray-300 dark:bg-gray-600'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import MediaIcon from './MediaIcon.vue';
import { articleApi } from '../services/api';

const router = useRouter();

const hotArticles = ref([]);
const currentSlide = ref(0);
const isLoading = ref(false);
const isTransitioning = ref(false);
const autoplayInterval = ref(null);
const isAutoplayPaused = ref(false);

const loadHotArticles = async () => {
  isLoading.value = true;
  
  try {
    // Mock hot articles API call - replace with actual API
    const response = await articleApi.queryListBySelective({
      page: 1,
      per_page: 5,
      status: 1,
      order_by: 'update_time',
      desc_order: true
    });
    
    if (response.success) {
      hotArticles.value = response.data.items || [];
    }
  } catch (error) {
    console.error('Failed to load hot articles:', error);
  } finally {
    isLoading.value = false;
  }
};

const nextSlide = () => {
  if (isTransitioning.value || hotArticles.value.length <= 1) return;
  
  isTransitioning.value = true;
  currentSlide.value = (currentSlide.value + 1) % hotArticles.value.length;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const prevSlide = () => {
  if (isTransitioning.value || hotArticles.value.length <= 1) return;
  
  isTransitioning.value = true;
  currentSlide.value = currentSlide.value === 0 ? hotArticles.value.length - 1 : currentSlide.value - 1;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const goToSlide = (index) => {
  if (isTransitioning.value || index === currentSlide.value) return;
  
  isTransitioning.value = true;
  currentSlide.value = index;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const startAutoplay = () => {
  if (hotArticles.value.length <= 1) return;
  
  autoplayInterval.value = setInterval(() => {
    if (!isAutoplayPaused.value) {
      nextSlide();
    }
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

const pauseAutoplay = () => {
  isAutoplayPaused.value = true;
};

const resumeAutoplay = () => {
  isAutoplayPaused.value = false;
};

const goToDetail = (articleId) => {
  router.push(`/article/${articleId}`);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return '1天前';
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}周前`;
  } else {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    });
  }
};

onMounted(() => {
  loadHotArticles();
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
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
