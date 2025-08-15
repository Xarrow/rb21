<template>
  <div class="mb-4 break-inside-avoid rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow">
    <!-- 头图 -->
    <img
      v-if="article.article_head_image"
      :src="article.article_head_image"
      :alt="article.article_title"
      class="w-full h-auto object-cover"
    />

    <!-- 内容 -->
    <div class="p-3">
      <h2 class="text-base font-semibold mb-2 line-clamp-2">
        {{ article.article_title }}
      </h2>
      <p v-if="article.article_summary" class="text-sm text-gray-600 line-clamp-3">
        {{ article.article_summary }}
      </p>

      <!-- 标签 -->
      <div v-if="article.current_tags?.length" class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="tag in article.current_tags"
          :key="tag.tag_id"
          class="px-2 py-0.5 text-xs bg-gray-100 rounded-full text-gray-700"
        >
          {{ tag.tag_name }}
        </span>
      </div>

      <!-- 来源链接 -->
      <div v-if="article.article_source_link" class="mt-3">
        <a
          :href="article.article_source_link"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-blue-500 hover:underline"
        >
          来源：{{ article.article_source }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
});
</script>
