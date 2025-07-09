<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="handleBackdropClick">
    <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl h-[95vh] flex flex-col resize-x overflow-hidden"
        :style="{ width: modalWidth + 'px', minWidth: '800px', maxWidth: '95vw' }"
        @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {{ isEdit ? '编辑文章' : '创建文章' }}
        </h2>
        <div class="flex items-center space-x-2">
          <!-- Image Manager Button -->
          <button
              @click="showImageManager = true"
              class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400 transition-colors duration-200"
              title="图片管理"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </button>

          <!-- Close Button -->
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

      <!-- Content -->
      <div class="flex-1 overflow-hidden">
        <div class="flex h-full">
          <!-- Left: Form -->
          <div
              class="flex flex-col h-full overflow-hidden border-r border-gray-200 dark:border-gray-700"
              :style="{ width: leftPanelWidth + '%' }"
          >
            <PostForm
                :on-submit="handleSubmit"
                :initial-data="article"
                @update:content="handleContentUpdate"
            />
          </div>

          <!-- Resize Handle -->
          <div
              class="w-1 bg-gray-200 dark:bg-gray-700 hover:bg-primary-500 cursor-col-resize flex-shrink-0 transition-colors duration-200"
              @mousedown="startResize"
          ></div>

          <!-- Right: Preview -->
          <div
              class="h-full overflow-hidden"
              :style="{ width: (100 - leftPanelWidth) + '%' }"
          >
            <MarkdownPreview :content="previewContent"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Manager Modal -->
    <ImageManager
        v-if="showImageManager"
        @close="showImageManager = false"
    />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import PostForm from './PostForm.vue';
import MarkdownPreview from './MarkdownPreview.vue';
import ImageManager from './ImageManager.vue';
import {articleApi} from '../services/api';

const props = defineProps({
  article: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'save']);

const previewContent = ref(props.article?.article_content || '');
const showImageManager = ref(false);
const modalWidth = ref(1200);
const leftPanelWidth = ref(50);
const isResizing = ref(false);

const handleContentUpdate = (content) => {
  previewContent.value = content;
};

const handleSubmit = async (data) => {
  try {
    let response;

    if (props.isEdit) {
      response = await articleApi.updateArticle(props.article.article_id, data);
    } else {
      response = await articleApi.createArticle(data);
    }

    if (response.success) {
      emit('save');
    } else {
      throw new Error(response.message || '操作失败');
    }
  } catch (error) {
    console.error('Article save error:', error);
    throw error;
  }
};

const startResize = (e) => {
  isResizing.value = true;
  const startX = e.clientX;
  const startWidth = leftPanelWidth.value;
  const modalRect = e.target.closest('.bg-white').getBoundingClientRect();

  const handleMouseMove = (e) => {
    if (!isResizing.value) return;

    const deltaX = e.clientX - startX;
    const modalWidth = modalRect.width;
    const deltaPercent = (deltaX / modalWidth) * 100;
    const newWidth = Math.max(30, Math.min(70, startWidth + deltaPercent));

    leftPanelWidth.value = newWidth;
  };

  const handleMouseUp = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};
</script>