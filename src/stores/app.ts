import { defineStore } from "pinia";
import { ref } from "vue";
export const useAppStore = defineStore("app", () => {
  const errorMessage = ref("");
  const showErrorSnackbar = ref(false);

  const showSuccessSnackbar = ref(false);
  const successMessage = ref("");

  return {
    errorMessage,
    showErrorSnackbar,
    showSuccessSnackbar,
    successMessage,
  };
});
