import {
  positionApi,
  type Position,
  type PositionDataParams,
} from "@/api/modules/position.api";

import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePositionStore = defineStore("position", () => {
  const positionData = ref<Position[]>([]);
  const isLoadingData = ref(false);

  const positionDataParams = reactive<PositionDataParams>({
    search: "",
  });

  async function fetchPositionData() {
    isLoadingData.value = true;
    try {
      const res = await positionApi.getData({ ...positionDataParams });
      positionData.value = res.data;
    } finally {
      isLoadingData.value = false;
    }
  }

  return {
    positionData,
    isLoadingData,
    positionDataParams,
    fetchPositionData,
  };
});
