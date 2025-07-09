<template>
  <span class="flex-shrink-0 mr-1 group" :class="sizeClass">
    <!-- 如果存在本地图标路径，则显示本地图片 -->
    <img v-if="localIconPath" :src="localIconPath" :alt="source + ' icon'" class="object-contain transition-transform duration-200 ease-in-out group-hover:scale-110"/>
    <!-- 否则，如果都没有，则显示来源的第一个字母 -->
    <span v-else-if="sourceText" class="text-xs font-medium">{{ sourceText.charAt(0).toUpperCase() }}</span>
  </span>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  source: {
    type: String,
    required: true
  },
  iconSize: { // 用于控制图标大小
    type: String,
    default: 'md' // 可选值: 'sm', 'md', 'lg', 'xl'
  }
});

// 本地静态资源图标映射
const localIconMap = {
  // 请将你的 cnn.png 文件放置在 public/icons/ 目录下
  // 例如：public/icons/cnn.png
  bloomberg: '/icons/Bloomberg.jpeg',
};

const normalizedSource = computed(() => props.source.toLowerCase());

// 计算本地图标路径
const localIconPath = computed(() => {
  return localIconMap[normalizedSource.value] || null;
});

// 计算文本回退
const sourceText = computed(() => {
  // 如果存在本地图标，则不显示文本
  if (localIconPath.value) {
    return null;
  }
  return props.source ? props.source.substring(0, 1) : null;
});

// 图标的尺寸类 (适用于本地图片)
const sizeClass = computed(() => {
  switch (props.iconSize) {
    case 'sm':
      return 'w-3 h-3'; // 小尺寸
    case 'md':
      return 'w-4 h-4'; // 默认尺寸
    case 'lg':
      return 'w-5 h-5'; // 大尺寸
    case 'xl':
      return 'w-6 h-6'; // 超大尺寸
    default:
      return 'w-4 h-4'; // 默认尺寸
  }
});
</script>
