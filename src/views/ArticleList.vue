<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
<!--    <ArticleHeader />-->
    
    <main class="pt-20">
      <!-- Tag Display Section -->
      <section class="container mx-auto px-4 py-8">
        <TagCloud :current-tag="currentTag" @tag-change="handleTagChange" />
      </section>

      <!-- Ad Banner -->
      <section class="container mx-auto px-4 py-4">
        <AdBanner position="top" />
      </section>

      <!-- Hot Articles Carousel -->
      <section class="container mx-auto px-4 py-8">
        <HotArticleCarousel />
      </section>

      <!-- Articles Grid -->
      <section class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" ref="articlesGrid">
          <ArticleCard
            v-for="article in articles"
            :key="article.article_id"
            :article="article"
            @click="goToDetail(article.article_id)"
          />
          
          <!-- Loading Skeleton -->
          <div v-if="isLoading" v-for="n in 8" :key="`skeleton-${n}`" class="animate-pulse">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div class="h-48 bg-gray-300 dark:bg-gray-700"></div>
              <div class="p-4 space-y-3">
                <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Trigger -->
        <div ref="loadMoreTrigger" class="h-10 flex items-center justify-center mt-8">
          <div v-if="isLoading && articles.length > 0" class="flex items-center space-x-2 text-gray-500">
            <div class="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <span>加载更多...</span>
          </div>
          <div v-else-if="hasMore" class="text-gray-500">
            滚动加载更多
          </div>
          <div v-else-if="articles.length > 0" class="text-gray-400">
            没有更多文章了
          </div>
        </div>
      </section>

      <!-- Ad Banner -->
      <section class="container mx-auto px-4 py-4">
        <AdBanner position="bottom" />
      </section>
    </main>

    <ArticleFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import ArticleHeader from '../components/ArticleHeader.vue';
import ArticleFooter from '../components/ArticleFooter.vue';
import TagCloud from '../components/TagCloud.vue';
import HotArticleCarousel from '../components/HotArticleCarousel.vue';
import ArticleCard from '../components/ArticleCard.vue';
import AdBanner from '../components/AdBanner.vue';
import { articleApi } from '../services/api';

const router = useRouter();

const articles = ref([]);
const isLoading = ref(false);
const hasMore = ref(true);
const currentPage = ref(1);
const currentTag = ref('');
const loadMoreTrigger = ref(null);

let observer = null;

const loadArticles = async (reset = false) => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  
  try {
    const params = {
      page: reset ? 1 : currentPage.value,
      per_page: 12,
      status: 1, // Only published articles
      order_by: 'update_time',
      desc_order: true
    };

    if (currentTag.value) {
      params.article_source = currentTag.value;
    }

    const response = await articleApi.queryListBySelective(params);
    
    if (response.success) {
      const newArticles = response.data.items || [];
      
      if (reset) {
        articles.value = newArticles;
        currentPage.value = 1;
      } else {
        articles.value.push(...newArticles);
      }
      
      currentPage.value = response.data.page + 1;
      hasMore.value = response.data.page < response.data.total_pages;
    }
  } catch (error) {
    console.error('Failed to load articles:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleTagChange = (tag) => {
  currentTag.value = tag;
  currentPage.value = 1;
  loadArticles(true);
};

const goToDetail = (articleId) => {
  router.push(`/article/${articleId}`);
};

const setupInfiniteScroll = () => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore.value && !isLoading.value) {
        loadArticles();
      }
    },
    {
      rootMargin: '100px'
    }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
};

onMounted(() => {
  loadArticles(true);
  setupInfiniteScroll();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
