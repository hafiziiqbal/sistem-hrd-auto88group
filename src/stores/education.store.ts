import {
  educationApi,
  type Education,
  type EducationDataParams,
} from "@/api/modules/education.api";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useEducationStore = defineStore("education", () => {
  const educationData = ref<Education[]>([]);
  const isLoadingData = ref(false);

  const educationDataParams = reactive<EducationDataParams>({
    search: "",
  });

  async function fetchEducationData() {
    isLoadingData.value = true;
    try {
      const res = await educationApi.getData({ ...educationDataParams });
      educationData.value = res.data;
    } finally {
      isLoadingData.value = false;
    }
  }

  return {
    educationData,
    isLoadingData,
    educationDataParams,
    fetchEducationData,
  };
});
