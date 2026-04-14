import {
  highlightApi,
  type LeaveRequest,
  type LeaveRequestParams,
} from "@/api/modules/highlight.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useHighlightStore = defineStore("highlight", () => {
  const leaveRequest = ref<LeaveRequest[]>([]);
  const isLoadingLeaveRequest = ref(false);

  const leaveRequestParams = reactive<LeaveRequestParams>({
    branch_id: undefined,
    hrd_leave_type_id: undefined,
  });

  async function fetchLeaveRequest() {
    isLoadingLeaveRequest.value = true;
    try {
      console.log(leaveRequestParams);
      const res = await highlightApi.getLeaveRequest({ ...leaveRequestParams });
      leaveRequest.value = res.data;

      console.log(res.data);
    } finally {
      isLoadingLeaveRequest.value = false;
    }
  }

  return {
    leaveRequest,
    isLoadingLeaveRequest,
    leaveRequestParams,
    fetchLeaveRequest,
  };
});
