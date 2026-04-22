import {
  employeeAttendanceRequestApi,
  type EmployeeAttendance,
  type EmployeeAttendanceParams,
} from "@/api/modules/employee-attendance.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useEmployeeAttendanceRequestStore = defineStore(
  "employee-attendance",
  () => {
    const employeeAttendance = ref<EmployeeAttendance[]>([]);
    const isLoading = ref(false);
    const totalRecords = ref(0);

    const params = reactive<EmployeeAttendanceParams>({
      draw: 1,
      start: 0,
      length: 10,
    });

    async function fetchOvertimeRequest() {
      isLoading.value = true;
      try {
        const res = await employeeAttendanceRequestApi.getDatatables({
          ...params,
        });
        employeeAttendance.value = res.data;
        totalRecords.value = res.recordsTotal;
        params.draw = res.draw + 1;
      } finally {
        isLoading.value = false;
      }
    }

    return {
      employeeAttendance,
      isLoading,
      totalRecords,
      params,
      fetchOvertimeRequest,
    };
  },
);
