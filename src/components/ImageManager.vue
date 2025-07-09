<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="handleBackdropClick">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col m-4" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            图片管理
            <span v-if="totalImages > 0" class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
              (共 {{ totalImages }} 张)
            </span>
          </h2>
        </div>

        <div class="flex items-center space-x-2">
        <button
            @click="refreshImages"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            title="刷新"
            :disabled="isLoading"
        >
          <svg 
              class="w-5 h-5 text-gray-600 dark:text-gray-400"
              :class="{ 'animate-spin': isLoading }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>

        <button
            @click="$emit('close')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button
            @click="activeTab = 'gallery'"
            class="px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200"
            :class="activeTab === 'gallery'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
        >
          图片库 ({{ totalImages }})
        </button>
        <button
            @click="activeTab = 'upload'"
            class="px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200"
            :class="activeTab === 'upload'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
        >
          上传图片
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-hidden">
        <!-- Gallery Tab -->
        <div v-show="activeTab === 'gallery'" class="h-full flex flex-col">
          <!-- Loading -->
          <div v-if="isLoading" class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-500 dark:text-gray-400">加载中...</p>
            </div>
          </div>

          <!-- Error -->
          <div v-else-if="error" class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
              <button @click="loadImages" class="btn-primary">重新加载</button>
            </div>
          </div>

          <!-- Empty -->
          <div v-else-if="images.length === 0" class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-gray-500 dark:text-gray-400 mb-4">还没有图片</p>
              <button @click="activeTab = 'upload'" class="btn-primary">上传图片</button>
            </div>
          </div>

          <!-- Image Grid -->
          <div v-else class="flex-1 overflow-y-auto p-6">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div
                  v-for="image in images"
                  :key="image.id"
                  class="group relative bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <!-- Image -->
                <div class="aspect-square overflow-hidden cursor-pointer" @click.stop="viewImage(image)">
                  <img
                      :src="image.url"
                      :alt="image.original_filename"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                  />
                </div>

                <!-- Actions Overlay -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <!-- View -->
                    <button
                        @click.stop="viewImage(image)"
                        class="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white transition-all duration-200"
                        title="查看原图"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>

                    <!-- Copy -->
                    <button
                        @click.stop="copyMarkdown(image)"
                        class="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white transition-all duration-200"
                        title="复制 Markdown"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </button>

                    <!-- Delete -->
                    <button
                        @click.stop="deleteImage(image)"
                        class="p-2 bg-red-500 bg-opacity-80 hover:bg-opacity-100 rounded-lg text-white transition-all duration-200"
                        title="删除图片"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Info -->
                <div class="p-3">
                  <p class="text-xs font-medium text-gray-900 dark:text-gray-100 truncate" :title="image.original_filename">
                    {{ image.original_filename }}
                  </p>
                  <div class="flex items-center justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>{{ formatFileSize(image.size) }}</span>
                    <span v-if="image.width && image.height">{{ image.width }}×{{ image.height }}</span>
                  </div>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {{ formatDate(image.upload_time) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                  @click="loadImages(currentPage - 1)"
                  :disabled="currentPage <= 1"
                  class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>

              <span class="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
                {{ currentPage }} / {{ totalPages }}
              </span>

              <button
                  @click="loadImages(currentPage + 1)"
                  :disabled="currentPage >= totalPages"
                  class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        </div>

        <!-- Upload Tab -->
        <div v-show="activeTab === 'upload'" class="h-full overflow-y-auto p-6">
          <ImageUpload @upload-success="handleUploadSuccess"/>
        </div>
      </div>
    </div>

    <!-- Image Viewer Modal -->
    <div v-if="viewingImage" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-60" @click="closeImageViewer">
      <div class="relative max-w-[90vw] max-h-[90vh]" @click.stop>
        <!-- Close Button -->
        <button
            @click="closeImageViewer"
            class="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Image -->
        <img
            :src="viewingImage.url"
            :alt="viewingImage.original_filename"
            class="max-w-full max-h-full object-contain"
        />

        <!-- Image Info -->
        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
          <h3 class="font-medium mb-2">{{ viewingImage.original_filename }}</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-300">fileKey:</span>
              <span class="ml-2">{{ viewingImage.file_key }}</span>
            </div>
<!--            <div>-->
<!--              <span class="text-gray-300">链接:</span>-->
<!--              <span class="ml-2"><a :href="viewingImage.url" target="_blank">{{ viewingImage.url }}</a></span>-->
<!--            </div>-->
            <div>
              <span class="text-gray-300">尺寸:</span>
              <span class="ml-2">{{ viewingImage.width }}×{{ viewingImage.height }}</span>
            </div>
            <div>
              <span class="text-gray-300">大小:</span>
              <span class="ml-2">{{ formatFileSize(viewingImage.size) }}</span>
            </div>
            <div>
              <span class="text-gray-300">格式:</span>
              <span class="ml-2">{{ viewingImage.content_type }}</span>
            </div>
            <div>
              <span class="text-gray-300">上传时间:</span>
              <span class="ml-2">{{ formatDate(viewingImage.upload_time) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex space-x-2 mt-3">
            <button
                @click.stop="copyMarkdown(viewingImage)"
                class="px-3 py-1 bg-primary-600 hover:bg-primary-700 rounded text-sm transition-colors duration-200"
            >
              复制 Markdown
            </button>
            <button
                @click.stop="deleteImage(viewingImage)"
                class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors duration-200"
            >
              删除图片
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Messages -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
          class="px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          :class="toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
      >
        <svg v-if="toast.type === 'success'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"/>
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {imageApi} from '../services/api';
import ImageUpload from './ImageUpload.vue';

const emit = defineEmits(['close']);

// State
const activeTab = ref('gallery');
const images = ref([]);
const isLoading = ref(false);
const error = ref('');
const viewingImage = ref(null);
const toast = ref({show: false, type: 'success', message: ''});

// Pagination
const currentPage = ref(1);
const pageSize = ref(24);
const totalImages = ref(0);

const totalPages = computed(() => Math.ceil(totalImages.value / pageSize.value));

// Methods
const loadImages = async (page = 1) => {
  await loadImages(1);
  showToast('success', '图片列表已刷新');
};

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
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const viewImage = (image) => {
  viewingImage.value = image;
};

const closeImageViewer = () => {
  viewingImage.value = null;
};

const copyMarkdown = async (image) => {
  try {
    const markdownText = `![${image.original_filename}](${image.url})`;
    await navigator.clipboard.writeText(markdownText);
    showToast('success', 'Markdown 地址已复制');
  } catch (error) {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = `![${image.original_filename}](${image.url})`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('success', 'Markdown 地址已复制');
  }
};

const deleteImage = async (image) => {
  if (!confirm(`确定要删除图片 "${image.original_filename}" 吗？`)) {
    return;
  }

  try {
    const response = await imageApi.deleteImage(image);

    if (response.success) {
      // Remove from local list
      const index = images.value.findIndex(img => img.id === image.id);
      if (index > -1) {
        images.value.splice(index, 1);
        totalImages.value -= 1;
      }

      // Close viewer if viewing deleted image
      if (viewingImage.value?.id === image.id) {
        closeImageViewer();
      }

      showToast('success', '图片已删除');

      // Reload if current page is empty
      if (images.value.length === 0 && currentPage.value > 1) {
        loadImages(currentPage.value - 1);
      }
    } else {
      showToast('error', response.message || '删除失败');
    }
  } catch (err) {
    showToast('error', '删除失败，请重试');
  }
};

const handleUploadSuccess = (imageData) => {
  if (currentPage.value === 1) {
    images.value.unshift(imageData);
    totalImages.value += 1;
  } else {
    loadImages(1);
  }
  activeTab.value = 'gallery';
  showToast('success', '图片上传成功');
};

const showToast = (type, message) => {
  toast.value = {show: true, type, message};
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

// 只有点击背景遮罩时才关闭弹框
const handleBackdropClick = (event) => {
  // 确保点击的是背景遮罩，而不是弹框内容
  if (event.target === event.currentTarget) {
    emit('close');
  }
};

onMounted(() => {
  loadImages();
});
</script>
