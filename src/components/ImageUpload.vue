<template>
  <div class="space-y-4">
    <!-- Upload Area -->
    <div 
      class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center transition-colors duration-200"
      :class="{ 'border-primary-500 bg-primary-50 dark:bg-primary-900/20': isDragOver }"
      @drop="handleDrop"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @dragenter.prevent
      tabindex="0"
    >
      <div class="space-y-4">
        <div class="flex justify-center">
          <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        
        <div>
          <p class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            上传图片
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            拖拽图片到此处，点击选择文件，或者 <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+V</kbd> 粘贴图片<br>
            支持 JPG、PNG、GIF、WebP 格式，最大 10MB
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              @click="triggerFileInput"
              class="btn-primary"
              :disabled="isUploading"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              选择文件
            </button>
          </div>
        </div>
      </div>
      
      <!-- Hidden file input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        class="hidden"
        @change="handleFileSelect"
      />
    </div>

    <!-- Upload Progress -->
    <div v-if="isUploading" class="space-y-2">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">上传中...</span>
        <span class="text-gray-600 dark:text-gray-400">{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          class="bg-primary-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <p class="text-red-800 dark:text-red-400">{{ errorMessage }}</p>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="text-green-800 dark:text-green-400">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { imageApi } from '../services/api';

const emit = defineEmits(['upload-success']);

const fileInput = ref(null);
const isDragOver = ref(false);
const isUploading = ref(false);
const uploadProgress = ref(0);
const errorMessage = ref('');
const successMessage = ref('');

const clearMessages = () => {
  errorMessage.value = '';
  successMessage.value = '';
};

const showError = (message) => {
  clearMessages();
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = '';
  }, 5000);
};

const showSuccess = (message) => {
  clearMessages();
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
};

const validateFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('不支持的文件格式。请选择 JPG、PNG、GIF 或 WebP 格式的图片。');
  }
  
  if (file.size > maxSize) {
    throw new Error('文件大小超过限制。请选择小于 10MB 的图片。');
  }
};

const uploadFile = async (file) => {
  try {
    validateFile(file);
    
    isUploading.value = true;
    uploadProgress.value = 0;
    clearMessages();
    
    // 模拟上传进度
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += Math.random() * 20;
      }
    }, 200);
    
    const response = await imageApi.uploadImage(file);
    
    clearInterval(progressInterval);
    uploadProgress.value = 100;
    
    if (response.success) {
      showSuccess(`图片上传成功！文件名: ${response.data.filename}`);
      emit('upload-success', response.data);
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    showError(error.message);
  } finally {
    isUploading.value = false;
    setTimeout(() => {
      uploadProgress.value = 0;
    }, 1000);
  }
};

const uploadFromBase64 = async (base64Data, filename) => {
  try {
    isUploading.value = true;
    uploadProgress.value = 0;
    clearMessages();
    
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += Math.random() * 20;
      }
    }, 200);
    
    const response = await imageApi.uploadImageFromBase64(base64Data, filename);
    
    clearInterval(progressInterval);
    uploadProgress.value = 100;
    
    if (response.success) {
      showSuccess(`图片上传成功！文件名: ${response.data.filename}`);
      emit('upload-success', response.data);
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    showError(error.message);
  } finally {
    isUploading.value = false;
    setTimeout(() => {
      uploadProgress.value = 0;
    }, 1000);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  files.forEach(uploadFile);
  // 清空input，允许重复选择同一文件
  event.target.value = '';
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragOver.value = false;
  
  const files = Array.from(event.dataTransfer.files);
  const imageFiles = files.filter(file => file.type.startsWith('image/'));
  
  if (imageFiles.length === 0) {
    showError('请拖拽图片文件');
    return;
  }
  
  imageFiles.forEach(uploadFile);
};

const handlePaste = async (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith('image/')) {
      event.preventDefault();
      const file = item.getAsFile();
      if (file) {
        await uploadFile(file);
      }
      break;
    }
  }
};

// 全局粘贴事件监听
const handleGlobalPaste = (event) => {
  // 只在当前组件可见时处理粘贴事件
  if (document.activeElement?.closest('.space-y-4')) {
    handlePaste(event);
  }
};

onMounted(() => {
  document.addEventListener('paste', handleGlobalPaste);
});

onUnmounted(() => {
  document.removeEventListener('paste', handleGlobalPaste);
});
</script>