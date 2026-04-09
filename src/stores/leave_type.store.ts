import {
  leaveTypeApi,
  type LeaveType,
  type LeaveTypeDatatablesParams,
  type LeaveTypeParams,
} from "@/api/modules/leave_type.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useLeaveTypeStore = defineStore("leave-type", () => {
  const leaveType = ref<LeaveType[]>([]);
  const isLoading = ref(false);
  const isLoadingCreate = ref(false);
  const isLoadingUpdate = ref(false);
  const isLoadingDestroy = ref(false);
  const totalRecords = ref(0);

  const params = reactive<LeaveTypeDatatablesParams>({
    draw: 1,
    start: 0,
    length: 10,
    search: undefined,
  });

  async function fetchLeaveType() {
    isLoading.value = true;
    try {
      const res = await leaveTypeApi.getDatatables({ ...params });
      leaveType.value = res.data;
      totalRecords.value = res.recordsTotal;
      params.draw = res.draw + 1;
    } finally {
      isLoading.value = false;
    }
  }

  async function createLeaveType(params: LeaveTypeParams) {
    isLoadingCreate.value = true;
    try {
      const res = await leaveTypeApi.createLeaveType(params);
      leaveType.value.push(res.data);
      return res;
    } catch (err: any) {
      throw err;
    } finally {
      isLoadingCreate.value = false;
    }
  }

  async function updateLeaveType(id: number, params: LeaveTypeParams) {
    isLoadingUpdate.value = true;
    try {
      const res = await leaveTypeApi.updateLeaveType(id, params);

      const index = leaveType.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        leaveType.value[index] = {
          ...leaveType.value[index],
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

  async function destroyLeaveType(id: number) {
    isLoadingDestroy.value = true;
    try {
      const res = await leaveTypeApi.destroyLeaveType(id);
      const index = leaveType.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        leaveType.value.splice(index, 1);
      }
      return res;
    } catch (err: any) {
      throw err;
    } finally {
      isLoadingDestroy.value = false;
    }
  }

  return {
    leaveType,
    isLoading,
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingDestroy,
    totalRecords,
    params,
    fetchLeaveType,
    createLeaveType,
    updateLeaveType,
    destroyLeaveType,
  };
});
