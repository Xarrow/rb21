<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl font-bold mb-6">文章瀑布流</h1>

    <!-- 瀑布流容器 -->
    <div ref="container" class="relative" :style="{ height: containerHeight + 'px' }">
      <div
        v-for="(article, idx) in positionedArticles"
        :key="article.article_id"
        class="absolute w-[calc(25%-1rem)]" 
        :style="{
          transform: `translate(${article.left}px, ${article.top}px)`
        }"
      >
        <div class="mb-4 rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow">
          <img
            v-if="article.article_head_image"
            :src="article.article_head_image"
            :alt="article.article_title"
            class="w-full h-auto object-cover"
          />
          <div class="p-3">
            <h2 class="text-base font-semibold mb-2 line-clamp-2">
              {{ article.article_title }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多 -->
    <div class="mt-6 text-center">
      <button
        @click="loadMore"
        :disabled="loading"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {{ loading ? "加载中..." : "加载更多" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const rawArticles = ref([]); // 原始数据
const positionedArticles = ref([]); // 带位置的卡片数据
const loading = ref(false);
const page = ref(1);
const perPage = 10;
const container = ref(null);
const containerHeight = ref(0);

// 列配置
const columnCount = 4;
const gap = 16; // px

const fetchArticles = async () => {
  loading.value = true;
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/articles/query_list_by_selective?page=${page.value}&per_page=${perPage}`
    );
    const data = await res.json();
    if (data.code === 0 && Array.isArray(data.data)) {
      const startIndex = rawArticles.value.length;
      rawArticles.value.push(...data.data);
      await nextTick();
      positionNewItems(startIndex);
    }
  } catch (err) {
    console.error("获取文章失败", err);
  }
  loading.value = false;
};

// 定位新加载的卡片
const positionNewItems = (startIndex) => {
  // 如果是第一次加载，初始化列高度
  if (startIndex === 0) {
    positionedArticles.value = [];
    columnHeights = new Array(columnCount).fill(0);
  }

  for (let i = startIndex; i < rawArticles.value.length; i++) {
    const article = rawArticles.value[i];
    // 找到最矮的列
    const minColIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const left = minColIndex * ((container.value.clientWidth / columnCount)) + gap / 2;
    const cardHeight = 300; // 可以根据图片比例动态计算
    const top = columnHeights[minColIndex];

    positionedArticles.value.push({
      ...article,
      left,
      top
    });

    columnHeights[minColIndex] += cardHeight + gap;
  }

  containerHeight.value = Math.max(...columnHeights);
};

let columnHeights = [];

const loadMore = () => {
  page.value++;
  fetchArticles();
};

onMounted(() => {
  fetchArticles();
});
</script>
