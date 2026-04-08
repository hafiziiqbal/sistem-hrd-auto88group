import {
  attendanceLocationApi,
  type AttendanceLocation,
  type AttendanceLocationDataParams,
} from "@/api/modules/attendance-location.api";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAttendanceLocationStore = defineStore(
  "attendance-location",
  () => {
    const attendanceLocationData = ref<AttendanceLocation[]>([]);
    const isLoadingData = ref(false);

    const attendanceLocationParams = reactive<AttendanceLocationDataParams>({
      search: "",
    });

    async function fetchAttendanceLocationData() {
      isLoadingData.value = true;
      try {
        const res = await attendanceLocationApi.getData({
          ...attendanceLocationParams,
        });
        attendanceLocationData.value = res.data;
      } finally {
        isLoadingData.value = false;
      }
    }

    return {
      attendanceLocationData,
      isLoadingData,
      attendanceLocationParams,
      fetchAttendanceLocationData,
    };
  },
);
