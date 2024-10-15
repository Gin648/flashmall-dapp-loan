import { showLoadingToast, closeToast } from "vant";
import { ref } from "vue";

export let loading = ref<any>(null);
export let loadingType = ref<any>(1);
export const useLoading = () => {
  const loadingToggle = (
    show: boolean,
    type: number = 1,
    forbidClick: boolean = false
  ) => {
    loadingType.value = type;
    if (show && type === 1) {
      showLoadingToast({
        duration: 0,
        forbidClick: forbidClick,
        className: "loadingClass"
      });
    } else {
      if (loading.value) {
        closeToast();
      }
    }
    loading.value = show;
  };
  return {
    loadingToggle
  };
};
