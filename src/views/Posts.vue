<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4">
        <!-- Top Bar -->
        <div class="flex items-center justify-between py-4">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5zM15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold gradient-text">Thread</h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">Share Your Stories</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">首页</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">科技</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">生活</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">娱乐</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">体育</a>
          </nav>

          <!-- Theme Toggle -->
          <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Tags Section -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-3">
          <button
              v-for="tag in tags"
              :key="tag.name"
              @click="selectTag(tag.name)"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              :class="selectedTag === tag.name
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700'"
          >
            {{ tag.name }}
            <span class="ml-2 text-xs opacity-75">({{ tag.count }})</span>
          </button>
        </div>
      </div>

      <!-- Hot Posts Carousel -->
<!--      <div class="mb-12">-->
<!--        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">热门推荐</h2>-->
<!--        <div class="relative overflow-hidden rounded-2xl">-->
<!--          <div -->
<!--              class="flex transition-transform duration-500 ease-in-out"-->
<!--              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"-->
<!--          >-->
<!--            <div-->
<!--                v-for="(post, index) in hotPosts"-->
<!--                :key="post.article_id"-->
<!--                class="w-full flex-shrink-0 relative h-96 cursor-pointer"-->
<!--                @click="viewPost(post)"-->
<!--            >-->
<!--              <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>-->
<!--              <img-->
<!--                  :src="post.article_head_image || 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg'"-->
<!--                  :alt="post.article_title"-->
<!--                  class="w-full h-full object-cover"-->
<!--              />-->
<!--              <div class="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">-->
<!--                <h3 class="text-3xl font-bold mb-2">{{ post.article_title }}</h3>-->
<!--                <p class="text-lg opacity-90 mb-4">{{ post.article_summary }}</p>-->
<!--                <div class="flex items-center space-x-4 text-sm">-->
<!--                  <span>{{ post.article_author }}</span>-->
<!--                  <span>{{ formatDate(post.create_time) }}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          -->
<!--          &lt;!&ndash; Navigation Buttons &ndash;&gt;-->
<!--          <button-->
<!--              @click="prevSlide"-->
<!--              class="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-200"-->
<!--          >-->
<!--            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>-->
<!--            </svg>-->
<!--          </button>-->
<!--          <button-->
<!--              @click="nextSlide"-->
<!--              class="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-200"-->
<!--          >-->
<!--            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>-->
<!--            </svg>-->
<!--          </button>-->

<!--          &lt;!&ndash; Dots Indicator &ndash;&gt;-->
<!--          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">-->
<!--            <button-->
<!--                v-for="(_, index) in hotPosts"-->
<!--                :key="index"-->
<!--                @click="currentSlide = index"-->
<!--                class="w-3 h-3 rounded-full transition-all duration-200"-->
<!--                :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"-->
<!--            ></button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Posts Grid -->
        <div class="lg:col-span-3">
          <div class="masonry-grid">
            <div
                v-for="post in posts"
                :key="post.article_id"
                class="masonry-item mb-6 break-inside-avoid"
                :class="getCardClass(post.article_category)"
            >
              <!-- Article Style Card -->
              <div
                  v-if="post.article_category === 'article'"
                  class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  @click="viewPost(post)"
              >
                <div v-if="post.article_head_image" class="relative overflow-hidden">
                  <img
                      :src="post.article_head_image"
                      :alt="post.article_title"
                      class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ post.article_title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {{ post.article_summary }}
                  </p>
                  <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div class="flex items-center space-x-2">
                      <MediaIcon :source="post.article_source" />
                      <span>{{ post.article_author }}</span>
                    </div>
                    <span>{{ formatDate(post.create_time) }}</span>
                  </div>
                </div>
              </div>

              <!-- Post Style Card -->
              <div
                  v-else
                  class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  @click="viewPost(post)"
              >
                <div class="p-4">
                  <div class="flex items-start space-x-3 mb-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white font-semibold text-sm">
                        {{ post.article_author?.charAt(0) || 'A' }}
                      </span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center space-x-2">
                        <span class="font-semibold text-gray-900 dark:text-gray-100">{{ post.article_author }}</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(post.create_time) }}</span>
                      </div>
                      <div class="flex items-center space-x-1 mt-1">
                        <MediaIcon :source="post.article_source" icon-size="sm" />
                        <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.article_source }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <p class="text-gray-900 dark:text-gray-100 leading-relaxed">
                      {{ post.article_content }}
                    </p>
                  </div>

                  <div v-if="post.article_head_image" class="mb-3">
                    <img
                        :src="post.article_head_image"
                        :alt="post.article_title"
                        class="w-full rounded-lg object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        :class="getImageClass(post.article_content)"
                    />
                  </div>

                  <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div class="flex items-center space-x-4">
                      <button class="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <span>{{ Math.floor(Math.random() * 100) }}</span>
                      </button>
                      <button class="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        <span>{{ Math.floor(Math.random() * 50) }}</span>
                      </button>
                    </div>
                    <button class="hover:text-primary-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex justify-center py-8">
            <div class="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>

          <!-- Load More -->
          <div v-if="hasMore && !loading" class="text-center py-8">
            <button
                @click="loadMore"
                class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              加载更多
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Ad Space -->
          <div class="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-xl p-6 mb-6 text-center">
            <div class="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">广告位</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">这里可以放置广告内容</p>
          </div>

          <!-- Popular Tags -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">热门标签</h3>
            <div class="flex flex-wrap gap-2">
              <span
                  v-for="tag in popularTags"
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5zM15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold">Thread</h3>
                <p class="text-gray-400">Share Your Stories</p>
              </div>
            </div>
            <p class="text-gray-400 mb-4">
              Thread 是一个现代化的内容分享平台，让每个人都能轻松分享自己的想法、故事和创意。
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-lg font-semibold mb-4">友情链接</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">技术博客</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">设计灵感</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">开发工具</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">学习资源</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-lg font-semibold mb-4">联系我们</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">关于我们</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">联系方式</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">意见反馈</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p class="text-gray-400">
            © 2024 Thread. All rights reserved. Made with ❤️ for the community.
          </p>
        </div>
      </div>
    </footer>

    <!-- Post Detail Modal -->
    <PostDetailModal
        v-if="showPostDetail"
        :post="selectedPost"
        @close="showPostDetail = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { articleApi } from '../services/api';
import MediaIcon from '../components/MediaIcon.vue';
import PostDetailModal from '../components/PostDetailModal.vue';

// State
const posts = ref([]);
const hotPosts = ref([]);
const loading = ref(false);
const hasMore = ref(true);
const currentPage = ref(1);
const pageSize = ref(20);
const selectedTag = ref('全部');
const currentSlide = ref(0);
const isDark = ref(false);
const showPostDetail = ref(false);
const selectedPost = ref(null);

// Mock data
const tags = ref([
  { name: '全部', count: 1234 },
  { name: '科技', count: 456 },
  { name: '生活', count: 789 },
  { name: '娱乐', count: 321 },
  { name: '体育', count: 654 },
  { name: '财经', count: 234 },
]);

const popularTags = ref(['Vue.js', 'React', 'JavaScript', 'Python', 'AI', '机器学习', '前端开发', '后端开发']);

// Methods
const loadPosts = async (page = 1, reset = false) => {
  if (loading.value) return;
  
  loading.value = true;
  
  try {
    const response = await articleApi.queryListBySelective({
      page,
      per_page: pageSize.value,
      order_by: 'update_time',
      desc_order: true
    });

    if (response.success) {
      const newPosts = response.data.items || response.data || [];
      
      if (reset) {
        posts.value = newPosts;
      } else {
        posts.value = [...posts.value, ...newPosts];
      }
      
      hasMore.value = page < (response.total_pages || Math.ceil(response.total / pageSize.value));
      currentPage.value = page;
    }
  } catch (error) {
    console.error('Failed to load posts:', error);
  } finally {
    loading.value = false;
  }
};

const loadHotPosts = async () => {
  try {
    // Mock hot posts since API endpoint not available
    const response = await articleApi.queryListBySelective({
      page: 1,
      per_page: 5,
      order_by: 'create_time',
      desc_order: true
    });

    if (response.success) {
      hotPosts.value = (response.data.items || response.data || []).slice(0, 5);
    }
  } catch (error) {
    console.error('Failed to load hot posts:', error);
  }
};

const loadMore = () => {
  if (hasMore.value && !loading.value) {
    loadPosts(currentPage.value + 1);
  }
};

const selectTag = (tag) => {
  selectedTag.value = tag;
  currentPage.value = 1;
  loadPosts(1, true);
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % hotPosts.value.length;
};

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? hotPosts.value.length - 1 : currentSlide.value - 1;
};

const viewPost = (post) => {
  selectedPost.value = post;
  showPostDetail.value = true;
};

const getCardClass = (showStyle) => {
  return showStyle === 'post' ? 'post-card' : 'article-card';
};

const getImageClass = (content) => {
  const contentLength = content?.length || 0;
  if (contentLength < 50) {
    return 'h-64';
  } else if (contentLength < 200) {
    return 'h-48';
  }
  return 'h-32';
};

const formatDate = (dateString) => {
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

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

// Infinite scroll
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 1000 && hasMore.value && !loading.value) {
    loadMore();
  }
};

// Auto slide for carousel
let slideInterval;
const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
};

onMounted(() => {
  // Load theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  document.documentElement.classList.toggle('dark', isDark.value);

  // Load data
  loadPosts(1, true);
  loadHotPosts();
  
  // Setup scroll listener
  window.addEventListener('scroll', handleScroll);
  
  // Start auto slide
  startAutoSlide();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  stopAutoSlide();
});
</script>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent;
}

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

.masonry-item {
  break-inside: avoid;
  page-break-inside: avoid;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card {
  @apply transform hover:scale-[1.02] transition-transform duration-200;
}

.article-card {
  @apply transform hover:scale-[1.01] transition-transform duration-200;
}
</style>