import {
  shiftApi,
  type Shift,
  type ShiftDataParams,
  type ShiftDatatablesParams,
  type ShiftParams,
} from "@/api/modules/shift.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useShiftStore = defineStore("shift", () => {
  const shift = ref<Shift[]>([]);
  const shiftData = ref<Shift[]>([]);
  const isLoading = ref(false);
  const isLoadingCreate = ref(false);
  const isLoadingUpdate = ref(false);
  const isLoadingDestroy = ref(false);
  const isLoadingData = ref(false);
  const totalRecords = ref(0);

  const params = reactive<ShiftDatatablesParams>({
    draw: 1,
    start: 0,
    length: 10,
    search: undefined,
  });

  const shiftDataParams = reactive<ShiftDataParams>({
    search: "",
  });

  async function fetchShift() {
    isLoading.value = true;
    try {
      const res = await shiftApi.getDatatables({ ...params });
      shift.value = res.data;
      totalRecords.value = res.recordsTotal;
      params.draw = res.draw + 1;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchShiftData() {
    isLoadingData.value = true;
    try {
      const res = await shiftApi.getData({
        ...shiftDataParams,
      });

      shiftData.value = res.data;
    } finally {
      isLoadingData.value = false;
    }
  }

  async function createShift(params: ShiftParams) {
    isLoadingCreate.value = true;
    try {
      const res = await shiftApi.createShift(params);
      shift.value.push(res.data);
      return res;
    } catch (err: any) {
      throw err;
    } finally {
      isLoadingCreate.value = false;
    }
  }

  async function updateShift(id: number, params: ShiftParams) {
    isLoadingUpdate.value = true;
    try {
      const res = await shiftApi.updateShift(id, params);

      const index = shift.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        shift.value[index] = {
          ...shift.value[index],
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

  async function destroyShift(id: number) {
    isLoadingDestroy.value = true;
    try {
      const res = await shiftApi.destroyShift(id);
      const index = shift.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        shift.value.splice(index, 1);
      }
      return res;
    } catch (err: any) {
      throw err;
    } finally {
      isLoadingDestroy.value = false;
    }
  }

  return {
    shift,
    shiftData,
    isLoading,
    isLoadingData,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingDestroy,
    totalRecords,
    params,
    shiftDataParams,
    fetchShift,
    fetchShiftData,
    createShift,
    updateShift,
    destroyShift,
  };
});
