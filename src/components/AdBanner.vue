<template>
  <div 
    v-if="shouldShowAd"
    class="relative overflow-hidden rounded-xl shadow-sm"
    :class="bannerClasses"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="animate-pulse bg-gray-300 dark:bg-gray-700 h-full flex items-center justify-center">
      <div class="text-gray-500 dark:text-gray-400">广告加载中...</div>
    </div>

    <!-- Ad Content -->
    <div v-else-if="adData" class="relative h-full">
      <!-- Background -->
      <div 
        class="absolute inset-0 bg-gradient-to-r"
        :style="{ background: adData.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }"
      ></div>
      
      <!-- Content -->
      <div class="relative h-full flex items-center justify-between p-6 text-white">
        <div class="flex-1">
          <h3 class="text-xl md:text-2xl font-bold mb-2">{{ adData.title }}</h3>
          <p class="text-sm md:text-base opacity-90 mb-4">{{ adData.description }}</p>
          <button 
            @click="handleAdClick"
            class="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          >
            {{ adData.buttonText }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        
        <!-- Ad Image -->
        <div v-if="adData.image" class="hidden md:block ml-6">
          <img 
            :src="adData.image" 
            :alt="adData.title"
            class="w-32 h-32 object-cover rounded-lg shadow-lg"
            @error="onImageError"
          />
        </div>
      </div>
      
      <!-- Close Button -->
      <button 
        @click="closeAd"
        class="absolute top-2 right-2 p-1 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-all duration-200"
        title="关闭广告"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <!-- Ad Label -->
      <div class="absolute bottom-2 left-2 px-2 py-1 bg-black/20 backdrop-blur-sm rounded text-xs text-white/70">
        广告
      </div>
    </div>

    <!-- Fallback/Placeholder -->
    <div v-else class="h-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
      <div class="text-center text-gray-500 dark:text-gray-400">
        <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        <p class="text-sm">广告位</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  position: {
    type: String,
    default: 'top', // top, bottom, sidebar
    validator: (value) => ['top', 'bottom', 'sidebar'].includes(value)
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const isLoading = ref(true);
const adData = ref(null);
const shouldShowAd = ref(true);

// Mock ad data - in real app, fetch from ad service
const mockAds = {
  top: {
    title: '🚀 提升开发效率',
    description: '使用最新的开发工具和框架，让你的项目更上一层楼',
    buttonText: '立即体验',
    image: '/placeholder.svg?height=128&width=128',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    url: 'https://example.com/dev-tools'
  },
  bottom: {
    title: '📚 在线学习平台',
    description: '海量课程资源，专业讲师指导，助你快速成长',
    buttonText: '开始学习',
    image: '/placeholder.svg?height=128&width=128',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    url: 'https://example.com/learning'
  },
  sidebar: {
    title: '💼 求职招聘',
    description: '找工作？招人才？这里有你需要的一切',
    buttonText: '查看职位',
    image: '/placeholder.svg?height=128&width=128',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    url: 'https://example.com/jobs'
  }
};

const bannerClasses = computed(() => {
  const baseClasses = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
  
  const sizeClasses = {
    small: 'h-20',
    medium: 'h-32',
    large: 'h-48'
  };
  
  return `${baseClasses} ${sizeClasses[props.size]}`;
});

const loadAd = async () => {
  isLoading.value = true;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Load ad based on position
  adData.value = mockAds[props.position] || mockAds.top;
  
  isLoading.value = false;
};

const handleAdClick = () => {
  if (adData.value?.url) {
    // Track ad click
    console.log('Ad clicked:', adData.value.title);
    
    // Open ad URL
    window.open(adData.value.url, '_blank', 'noopener,noreferrer');
  }
};

const closeAd = () => {
  shouldShowAd.value = false;
  
  // Track ad close
  console.log('Ad closed:', adData.value?.title);
  
  // Store in localStorage to remember user preference
  localStorage.setItem(`ad_closed_${props.position}`, Date.now().toString());
};

const onImageError = (event) => {
  event.target.style.display = 'none';
};

const checkAdVisibility = () => {
  // Check if user has closed this ad recently (within 24 hours)
  const closedTime = localStorage.getItem(`ad_closed_${props.position}`);
  if (closedTime) {
    const timeDiff = Date.now() - parseInt(closedTime);
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (hoursDiff < 24) {
      shouldShowAd.value = false;
      return;
    }
  }
  
  // Check if ads are disabled globally
  const adsDisabled = localStorage.getItem('ads_disabled');
  if (adsDisabled === 'true') {
    shouldShowAd.value = false;
    return;
  }
  
  shouldShowAd.value = true;
};

onMounted(() => {
  checkAdVisibility();
  
  if (shouldShowAd.value) {
    loadAd();
  }
});
</script>
