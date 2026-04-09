import {
  workingHourApi,
  type WorkingHour,
  type WorkingHourDatatablesParams,
  type WorkingHourParams,
} from "@/api/modules/working-hour.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useWorkingHourStore = defineStore("workingHour", () => {
  const workingHour = ref<WorkingHour[]>([]);
  const isLoading = ref(false);
  const isLoadingUpdate = ref(false);
  const totalRecords = ref(0);

  const params = reactive<WorkingHourDatatablesParams>({
    draw: 1,
    start: 0,
    length: 10,
    search: undefined,
  });

  async function fetchWorkingHour() {
    isLoading.value = true;
    try {
      const res = await workingHourApi.getDatatables({ ...params });
      workingHour.value = res.data;
      totalRecords.value = res.recordsTotal;
      params.draw = res.draw + 1;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateWorkingHour(id: number, params: WorkingHourParams) {
    isLoadingUpdate.value = true;
    try {
      const res = await workingHourApi.updateWorkingHour(id, params);

      const index = workingHour.value.findIndex((item) => item.id === id);
      console.log(`ini id ${id}`);
      console.log(index);
      if (index !== -1) {
        workingHour.value[index] = {
          ...workingHour.value[index],
          ...res.data,
        };
      }
      return res;
    } catch (err: any) {
      throw err;
    } finally {
      isLoadingUpdate.value = false;
    }
  }

  return {
    workingHour,
    isLoading,
    isLoadingUpdate,
    totalRecords,
    params,
    fetchWorkingHour,
    updateWorkingHour,
  };
});
