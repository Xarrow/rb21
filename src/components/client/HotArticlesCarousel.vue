<template>
  <div class="mb-12">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">热门推荐</h2>
      <div class="flex items-center space-x-2">
        <button
          @click="prevSlide"
          class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 transform hover:scale-110"
          :disabled="currentSlide === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 transform hover:scale-110"
          :disabled="currentSlide >= maxSlide"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= maxSlide }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="relative overflow-hidden rounded-3xl shadow-2xl h-96">
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-500 dark:text-gray-400">加载热门文章中...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="relative overflow-hidden rounded-3xl shadow-2xl h-96">
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
          <button @click="loadHotArticles" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            重新加载
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="articles.length === 0" class="relative overflow-hidden rounded-3xl shadow-2xl h-96">
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p class="text-gray-500 dark:text-gray-400">暂无热门文章</p>
        </div>
      </div>
    </div>

    <!-- Carousel Container -->
    <div v-else class="relative overflow-hidden rounded-3xl shadow-2xl">
      <!-- Parallax Background -->
      <div class="absolute inset-0 overflow-hidden">
        <div 
          class="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-accent-600/20 transform transition-transform duration-1000 ease-out"
          :style="{ transform: `translateX(${parallaxOffset}px) scale(1.1)` }"
        ></div>
      </div>

      <!-- Slides Container -->
      <div 
        class="flex transition-transform duration-700 ease-in-out"
        :style="{ 
          transform: `translateX(-${currentSlide * slideWidth}px)`,
          width: `${articles.length * slideWidth}px`
        }"
        @mouseenter="stopAutoSlide"
        @mouseleave="startAutoSlide"
      >
        <div
          v-for="(article, index) in articles"
          :key="article.article_id"
          class="relative cursor-pointer group"
          :style="{ width: `${slideWidth}px` }"
          @click="$emit('article-click', article.article_id)"
        >
          <!-- Background Image with Parallax -->
          <div class="absolute inset-0 overflow-hidden">
            <div 
              class="w-full h-96 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
              :style="{ 
                backgroundImage: `url(${article.article_head_image || getDefaultImage(index)})`,
                transform: `translateX(${getParallaxTransform(index)}px) scale(${index === currentSlide ? 1.05 : 1})`
              }"
            ></div>
            <!-- Gradient Overlays -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <!-- Animated Overlay -->
            <div class="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <!-- Content with Parallax Effect -->
          <div 
            class="absolute inset-0 flex items-end p-8 z-10 transform transition-transform duration-500"
            :style="{ transform: `translateY(${index === currentSlide ? 0 : 10}px)` }"
          >
            <div class="max-w-2xl transform group-hover:translate-y-[-8px] transition-transform duration-500">
              <!-- Hot Badge with Animation -->
              <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4 animate-pulse">
                <svg class="w-4 h-4 mr-2 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                </svg>
                热门推荐 #{{ index + 1 }}
              </div>

              <!-- Title with Typewriter Effect -->
              <h3 class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight transform transition-all duration-500 group-hover:text-yellow-300">
                {{ article.article_title }}
              </h3>

              <!-- Summary with Fade Animation -->
              <p class="text-lg text-gray-200 mb-6 leading-relaxed line-clamp-2 transform transition-all duration-500 group-hover:text-gray-100">
                {{ article.article_summary || '精彩内容，值得一读...' }}
              </p>

              <!-- Meta Info with Slide Animation -->
              <div class="flex items-center space-x-6 text-sm text-gray-300 transform transition-all duration-500 group-hover:text-gray-200">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center ring-2 ring-white/20">
                    <span class="text-white font-semibold text-xs">
                      {{ article.article_author?.charAt(0) || 'A' }}
                    </span>
                  </div>
                  <span class="font-medium">{{ article.article_author || '匿名作者' }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ formatDate(article.create_time) }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span>{{ getRandomViews() }} 阅读</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span>{{ getRandomLikes() }}</span>
                </div>
              </div>

              <!-- Read More Button -->
              <div class="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <button class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-200 transform hover:scale-105 border border-white/30">
                  阅读全文
                  <svg class="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Floating Action Buttons -->
          <div class="absolute top-6 right-6 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-20">
            <button
              @click.stop="toggleBookmark(article)"
              class="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-200 transform hover:scale-110"
              title="收藏"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
            <button
              @click.stop="shareArticle(article)"
              class="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-200 transform hover:scale-110"
              title="分享"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        <button
          v-for="(_, index) in articles"
          :key="index"
          @click="goToSlide(index)"
          class="relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
          :class="currentSlide === index 
            ? 'bg-white shadow-lg ring-2 ring-white/50' 
            : 'bg-white/50 hover:bg-white/75'"
        >
          <!-- Active indicator animation -->
          <div 
            v-if="currentSlide === index"
            class="absolute inset-0 rounded-full bg-white animate-ping"
          ></div>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          class="h-full bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 transition-all duration-700 ease-out"
          :style="{ width: `${((currentSlide + 1) / articles.length) * 100}%` }"
        ></div>
      </div>

      <!-- Slide Counter -->
      <div class="absolute top-6 left-6 z-20 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
        {{ currentSlide + 1 }} / {{ articles.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { hotArticleApi } from '../../services/api';

const props = defineProps({
  autoSlideInterval: {
    type: Number,
    default: 5000
  }
});

const emit = defineEmits(['article-click']);

// State
const articles = ref([]);
const loading = ref(false);
const error = ref('');
const currentSlide = ref(0);
const slideWidth = ref(0);
const parallaxOffset = ref(0);
let autoSlideTimer = null;
let resizeObserver = null;

// Computed
const maxSlide = computed(() => Math.max(0, articles.value.length - 1));

// Methods
const loadHotArticles = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await hotArticleApi.getHotArticles();
    
    if (response.success) {
      articles.value = response.data || [];
      if (articles.value.length === 0) {
        error.value = '暂无热门文章';
      }
    } else {
      error.value = response.message || '加载热门文章失败';
    }
  } catch (err) {
    error.value = '网络错误，请重试';
    console.error('Failed to load hot articles:', err);
  } finally {
    loading.value = false;
  }
};

const updateSlideWidth = () => {
  const container = document.querySelector('.relative.overflow-hidden.rounded-3xl');
  if (container) {
    slideWidth.value = container.offsetWidth;
  }
};

const nextSlide = () => {
  if (currentSlide.value < maxSlide.value) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0; // Loop back to first slide
  }
  updateParallax();
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = maxSlide.value; // Loop to last slide
  }
  updateParallax();
};

const goToSlide = (index) => {
  currentSlide.value = index;
  updateParallax();
};

const updateParallax = () => {
  parallaxOffset.value = -currentSlide.value * 50;
};

const getParallaxTransform = (index) => {
  const distance = index - currentSlide.value;
  return distance * 30; // Parallax effect strength
};

const startAutoSlide = () => {
  if (articles.value.length > 1) {
    autoSlideTimer = setInterval(() => {
      nextSlide();
    }, props.autoSlideInterval);
  }
};

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
};

const getDefaultImage = (index) => {
  const images = [
    'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg',
    'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'
  ];
  return images[index % images.length];
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return date.toLocaleDateString('zh-CN');
  }
};

const getRandomViews = () => {
  return Math.floor(Math.random() * 5000) + 1000;
};

const getRandomLikes = () => {
  return Math.floor(Math.random() * 500) + 50;
};

const toggleBookmark = (article) => {
  console.log('Toggle bookmark for:', article.article_id);
  // Implement bookmark functionality
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

// Watchers
watch(() => articles.value.length, (newLength) => {
  if (newLength > 0) {
    updateSlideWidth();
    startAutoSlide();
  }
});

// Lifecycle
onMounted(() => {
  loadHotArticles();
  updateSlideWidth();
  
  // Setup resize observer
  resizeObserver = new ResizeObserver(() => {
    updateSlideWidth();
  });
  
  const container = document.querySelector('.relative.overflow-hidden.rounded-3xl');
  if (container) {
    resizeObserver.observe(container);
  }
  
  // Add keyboard navigation
  const handleKeydown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };
  
  document.addEventListener('keydown', handleKeydown);
  
  // Cleanup function
  onUnmounted(() => {
    stopAutoSlide();
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    document.removeEventListener('keydown', handleKeydown);
  });
});

onUnmounted(() => {
  stopAutoSlide();
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for touch devices */
@media (hover: none) {
  .overflow-hidden {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .overflow-hidden::-webkit-scrollbar {
    display: none;
  }
}

/* Smooth animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .animate-slideIn {
  animation: slideIn 0.5s ease-out;
}
</style>