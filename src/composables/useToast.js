import { ref } from 'vue';

const toast = ref({ show: false, type: 'success', message: '' });

export function useToast() {
  const showToast = (type, message) => {
    toast.value = { show: true, type, message };
    setTimeout(() => {
      toast.value.show = false;
    }, 3000);
  };

  return {
    toast,
    showToast
  };
}