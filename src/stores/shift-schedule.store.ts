import {
  shiftScheduleApi,
  type ShiftSchedule,
  type ShiftScheduleDatatablesParams,
  type ShiftScheduleStorePayload,
  type ShiftScheduleUpdatePayload,
} from "@/api/modules/shift-schedule.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useShiftScheduleStore = defineStore("shift-schedule", () => {
  const shiftSchedule = ref<ShiftSchedule[]>([]);
  const isLoading = ref(false);
  const isLoadingCreate = ref(false);
  const isLoadingUpdate = ref(false);
  const isLoadingDestroy = ref(false);
  const totalRecords = ref(0);

  const params = reactive<ShiftScheduleDatatablesParams>({
    draw: 1,
    start: 0,
    length: 10,
    user_id: undefined,
    branch_id: undefined,
    period: undefined,
  });

  async function fetchShiftSchedule() {
    isLoading.value = true;
    try {
      const res = await shiftScheduleApi.getDatatables({ ...params });
      shiftSchedule.value = res.data;
      totalRecords.value = res.recordsTotal;
      params.draw = res.draw + 1;
    } finally {
      isLoading.value = false;
    }
  }

  async function store(payload: ShiftScheduleStorePayload) {
    isLoadingCreate.value = true;
    try {
      return await shiftScheduleApi.store(payload);
    } finally {
      isLoadingCreate.value = false;
    }
  }

  async function update(id: number, payload: ShiftScheduleUpdatePayload) {
    isLoadingUpdate.value = true;
    try {
      return await shiftScheduleApi.update(id, payload);
    } finally {
      isLoadingUpdate.value = false;
    }
  }

  async function destroy(id: number) {
    isLoadingDestroy.value = true;
    try {
      return await shiftScheduleApi.destroy(id);
    } finally {
      isLoadingDestroy.value = false;
    }
  }

  return {
    shiftSchedule,
    isLoading,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingDestroy,
    totalRecords,
    params,
    fetchShiftSchedule,
    store,
    update,
    destroy,
  };
});
