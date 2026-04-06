import { jobApi, type Job, type JobDataParams } from "@/api/modules/job.api";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useJobStore = defineStore("job", () => {
  const jobData = ref<Job[]>([]);
  const isLoadingData = ref(false);

  const jobDataParams = reactive<JobDataParams>({
    search: "",
  });

  async function fetchJobData() {
    isLoadingData.value = true;
    try {
      const res = await jobApi.getData({
        ...jobDataParams,
      });
      jobData.value = res.data;
    } finally {
      isLoadingData.value = false;
    }
  }

  return {
    jobData,
    isLoadingData,
    jobDataParams,
    fetchJobData,
  };
});
