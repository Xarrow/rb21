<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        图片库
        <span v-if="images.length > 0" class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
          ({{ images.length }} 张图片)
        </span>
      </h3>
      
      <button
        v-if="images.length > 0"
        @click="clearAll"
        class="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        清空所有
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="images.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <p class="text-gray-500 dark:text-gray-400">还没有上传任何图片</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">上传图片后会在这里显示</p>
    </div>

    <!-- Image Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="image in images"
        :key="image.id"
        class="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
        @click="copyMarkdownUrl(image)"
      >
        <!-- Image -->
        <div class="aspect-square overflow-hidden">
          <img
            :src="image.url"
            :alt="image.filename"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
            <svg class="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <p class="text-white text-sm font-medium">点击复制</p>
          </div>
        </div>
        
        <!-- Info -->
        <div class="p-3">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" :title="image.original_filename">
            {{ image.original_filename }}
          </p>
          <div class="flex items-center justify-between mt-1">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatFileSize(image.size) }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400" v-if="image.width && image.height">
              {{ image.width }}×{{ image.height }}
            </p>
          </div>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {{ formatDate(image.upload_time) }}
          </p>
        </div>

        <!-- Delete Button -->
        <button
          @click.stop="removeImage(image.id)"
          class="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          title="删除图片"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Copy Success Toast -->
    <div
      v-if="showCopySuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-up"
    >
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        Markdown 地址已复制到剪贴板
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['remove-image', 'clear-all']);

const showCopySuccess = ref(false);

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const copyMarkdownUrl = async (image) => {
  try {
    const markdownText = `![${image.original_filename}](${image.url})`;
    await navigator.clipboard.writeText(markdownText);
    
    showCopySuccess.value = true;
    setTimeout(() => {
      showCopySuccess.value = false;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // 降级方案：创建临时文本区域
    const textArea = document.createElement('textarea');
    textArea.value = `![${image.original_filename}](${image.url})`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    showCopySuccess.value = true;
    setTimeout(() => {
      showCopySuccess.value = false;
    }, 2000);
  }
};

const removeImage = (imageId) => {
  emit('remove-image', imageId);
};

const clearAll = () => {
  if (confirm('确定要清空所有图片吗？此操作不可撤销。')) {
    emit('clear-all');
  }
};
</script>
