import {
  remainingLeaveApi,
  type History,
  type RemainingLeave,
  type RemainingLeaveDatatablesParams,
  type RemainingLeaveDetailParams,
  type User,
} from "@/api/modules/remainig-leave.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useRemainingLeaveStore = defineStore("remaining-leave", () => {
  const remainingLeave = ref<RemainingLeave[]>([]);
  const userSelected = ref<User | null>(null);
  const historySelected = ref<History | null>(null);
  const isLoading = ref(false);
  const isLoadingDetail = ref(false);
  const totalRecords = ref(0);

  const params = reactive<RemainingLeaveDatatablesParams>({
    draw: 1,
    start: 0,
    length: 10,
    user_id: undefined,
    branch_id: undefined,
  });

  const detailParams = reactive<RemainingLeaveDetailParams>({
    year: undefined,
    change: undefined,
    type: undefined,
  });

  async function fetchRemainingLeave() {
    isLoading.value = true;
    try {
      const res = await remainingLeaveApi.getDatatables({ ...params });
      remainingLeave.value = res.data;
      totalRecords.value = res.recordsTotal;
      params.draw = res.draw + 1;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchRemainingLeaveDetail(id: number) {
    isLoadingDetail.value = true;
    try {
      const res = await remainingLeaveApi.getDetail(id, detailParams);
      userSelected.value = res.data.user;
      historySelected.value = res.data.history;
      return res;
    } finally {
      isLoadingDetail.value = false;
    }
  }

  return {
    remainingLeave,
    historySelected,
    userSelected,
    isLoading,
    isLoadingDetail,
    totalRecords,
    params,
    detailParams,
    fetchRemainingLeave,
    fetchRemainingLeaveDetail,
  };
});
