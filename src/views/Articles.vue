<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">

    <!-- Main Content -->
    <main class="pt-0 pb-6">
      <!-- Ad Banner Container -->
      <div class="container mx-auto px-4 mb-8">
        <!-- <AdBanner/> -->
      </div>

      <!-- Content Grid -->
      <div class="w-full px-4">
        <div class="flex flex-col lg:flex-row gap-0">
          <!-- Mobile Sidebar (shown above content on mobile) -->
          <div class="lg:hidden">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
              <PopularTags
                  :tags="popularTags"
                  @tag-click="handleTagSelect"
              />
            </div>
          </div>

          <!-- Articles Waterfall -->
          <div class="w-full lg:w-[calc(100%)]">
            <ArticleWaterfall
                :articles="articles"
                :loading="loading"
                :has-more="hasMore"
                :total-count="totalCount"
                @load-more="loadMoreArticles"
                @article-click="handleArticleClick"
            />
          </div>

          <!-- Desktop Sidebar -->
<!--          <div class="hidden lg:block relative w-[300px]">-->
<!--            <div class="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">-->
<!--              <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-6">-->
<!--                <PopularTags-->
<!--                    :tags="popularTags"-->
<!--                    @tag-click="handleTagSelect"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </main>

    <!-- Footer -->
    <ArticleFooter/>

    <!-- Article Detail Modal -->
    <ArticleDetailModal
        v-if="showDetailModal"
        :article-id="selectedArticleId"
        @close="closeDetailModal"
    />
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {articleApi} from '../services/api';
import TagCloud from '../components/client/TagCloud.vue';
import HotArticlesCarousel from '../components/client/HotArticlesCarousel.vue';
import ArticleWaterfall from '../components/client/ArticleWaterfall.vue';
import AdBanner from '../components/client/AdBanner.vue';
import PopularTags from '../components/client/PopularTags.vue';
import ArticleFooter from '../components/client/ArticleFooter.vue';
import ArticleDetailModal from '../components/client/ArticleDetailModal.vue';

// State
const articles = ref([]);
const categories = ref([]);
const tags = ref([]);
const popularTags = ref([]);
const loading = ref(false);
const hasMore = ref(true);
const currentPage = ref(1);
const totalCount = ref(0);
const selectedTag = ref('全部');
const selectedCategory = ref('全部');
const searchQuery = ref('');
const showDetailModal = ref(false);
const selectedArticleId = ref('');

const PAGE_SIZE = 7;

// API methods
const loadArticles = async (page = 1, reset = false) => {
  if (loading.value) return;

  loading.value = true;

  try {
    const params = {
      page,
      per_page: PAGE_SIZE,
      order_by: 'update_time',
      status: 1,
      desc_order: true
    };

    if (selectedCategory.value && selectedCategory.value !== '全部') {
      params.article_source = selectedCategory.value;
    }

    if (selectedTag.value && selectedTag.value !== '全部') {
      params.article_title = selectedTag.value;
    }

    if (searchQuery.value) {
      params.article_title = searchQuery.value;
    }

    const response = await articleApi.queryListBySelective(params);

    if (response.success && response.data) {
      const newArticles = response.data.items || response.data || [];

      if (reset) {
        articles.value = newArticles;
      } else {
        articles.value = [...articles.value, ...newArticles];
      }

      const total = response.total || 0;
      const pageSize = response.data?.page_size || PAGE_SIZE;
      const totalPages = response.data?.total_pages || Math.ceil((response.total || 0) / pageSize);
      hasMore.value = page < totalPages;
      currentPage.value = page;
      totalCount.value = total;
    }
  } catch (error) {
    console.error('Error loading articles:', error);
  } finally {
    loading.value = false;
  }
};

const loadInitialData = async () => {
  await Promise.all([
    loadArticles(1, true),
    loadCategories(),
    loadTags()
  ]);
};

const loadCategories = async () => {
  categories.value = [
    {name: '全部', count: 1234},
    {name: '科技', count: 456},
    {name: '生活', count: 789},
    {name: '娱乐', count: 321},
    {name: '体育', count: 654},
    {name: '财经', count: 234}
  ];
};

const loadTags = async () => {
  tags.value = [
    {name: '全部', count: 1234},
    {name: 'Vue.js', count: 89},
    {name: 'React', count: 76},
    {name: 'JavaScript', count: 123},
    {name: 'Python', count: 98},
    {name: 'AI', count: 67},
    {name: '机器学习', count: 54}
  ];

  popularTags.value = [
    'Vue.js', 'React', 'JavaScript', 'Python', 'AI', '机器学习',
    '前端开发', '后端开发', '数据科学', '区块链'
  ];
};

const resetAndReload = () => {
  currentPage.value = 1;
  loadArticles(1, true);
};

// Event handlers
const loadMoreArticles = () => {
  if (hasMore.value && !loading.value) {
    loadArticles(currentPage.value + 1);
  }
};

const handleCategoryChange = (category) => {
  selectedCategory.value = category;
  resetAndReload();
};

const handleTagSelect = (tag) => {
  selectedTag.value = tag;
  resetAndReload();
};

const handleSearch = (query) => {
  searchQuery.value = query;
  resetAndReload();
};

const handleArticleClick = (articleId) => {
  selectedArticleId.value = articleId;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedArticleId.value = '';
};

// Infinite scroll
const handleScroll = () => {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 1000 && hasMore.value && !loading.value) {
    loadMoreArticles();
  }
};

// Lifecycle
onMounted(() => {
  loadInitialData();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
