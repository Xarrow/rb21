<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
        : 'bg-transparent',
      'border-b border-gray-200/50 dark:border-gray-700/50'
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <svg
              class="w-10 h-10 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3B82F6"/>
                  <stop offset="50%" style="stop-color:#8B5CF6"/>
                  <stop offset="100%" style="stop-color:#06B6D4"/>
                </linearGradient>
              </defs>
              <circle cx="50" cy="30" r="8" fill="url(#logoGradient)"/>
              <circle cx="30" cy="50" r="6" fill="url(#logoGradient)" opacity="0.8"/>
              <circle cx="70" cy="50" r="6" fill="url(#logoGradient)" opacity="0.8"/>
              <circle cx="50" cy="70" r="8" fill="url(#logoGradient)"/>
              <path d="M50 22 L50 38 M42 50 L58 50 M50 62 L50 78" stroke="url(#logoGradient)" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
              Thread
            </h1>
            <p class="text-xs text-gray-500 dark:text-gray-400 -mt-1">分享你的故事</p>
          </div>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/' }"
          >
            首页
          </router-link>
          <div
            v-for="category in categories"
            :key="category.id"
            class="relative group"
          >
            <button
              class="nav-link flex items-center space-x-1"
              @click="toggleCategoryMenu(category.id)"
            >
              <span>{{ category.name }}</span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': openCategory === category.id }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="openCategory === category.id"
              class="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
            >
              <router-link
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
                :to="`/category/${subcategory.slug}`"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {{ subcategory.name }}
              </router-link>
            </div>
          </div>
          <router-link
            to="/admin"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/admin') }"
          >
            管理
          </router-link>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative hidden lg:block">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              @keyup.enter="handleSearch"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            title="切换主题"
          >
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.706-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-show="showMobileMenu" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="space-y-2">
          <router-link to="/" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            首页
          </router-link>
          <div v-for="category in categories" :key="category.id">
            <button
              @click="toggleMobileCategoryMenu(category.id)"
              class="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <span>{{ category.name }}</span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': openMobileCategory === category.id }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div v-show="openMobileCategory === category.id" class="pl-4 space-y-1">
              <router-link
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
                :to="`/category/${subcategory.slug}`"
                class="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {{ subcategory.name }}
              </router-link>
            </div>
          </div>
          <router-link to="/admin" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            管理
          </router-link>
        </div>

        <!-- Mobile Search -->
        <div class="mt-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            @keyup.enter="handleSearch"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isScrolled = ref(false);
const isDark = ref(false);
const searchQuery = ref('');
const showMobileMenu = ref(false);
const openCategory = ref(null);
const openMobileCategory = ref(null);

// Mock categories data - in real app, fetch from API
const categories = ref([
  {
    id: 1,
    name: '技术',
    subcategories: [
      { id: 11, name: '前端开发', slug: 'frontend' },
      { id: 12, name: '后端开发', slug: 'backend' },
      { id: 13, name: '移动开发', slug: 'mobile' },
      { id: 14, name: '人工智能', slug: 'ai' }
    ]
  },
  {
    id: 2,
    name: '生活',
    subcategories: [
      { id: 21, name: '美食', slug: 'food' },
      { id: 22, name: '旅行', slug: 'travel' },
      { id: 23, name: '摄影', slug: 'photography' },
      { id: 24, name: '健康', slug: 'health' }
    ]
  },
  {
    id: 3,
    name: '娱乐',
    subcategories: [
      { id: 31, name: '电影', slug: 'movies' },
      { id: 32, name: '音乐', slug: 'music' },
      { id: 33, name: '游戏', slug: 'games' },
      { id: 34, name: '动漫', slug: 'anime' }
    ]
  }
]);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const toggleCategoryMenu = (categoryId) => {
  openCategory.value = openCategory.value === categoryId ? null : categoryId;
};

const toggleMobileCategoryMenu = (categoryId) => {
  openMobileCategory.value = openMobileCategory.value === categoryId ? null : categoryId;
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`);
    searchQuery.value = '';
    showMobileMenu.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  document.documentElement.classList.toggle('dark', isDark.value);

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative.group')) {
      openCategory.value = null;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 relative;
}

.nav-link-active {
  @apply text-primary-600 dark:text-primary-400;
}

.nav-link-active::after {
  content: '';
  @apply absolute -bottom-4 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400;
}
</style>
