import {
  employeeRelationApi,
  type EmployeeRelation,
  type EmployeeRelationDataParams,
} from "@/api/modules/employee-relation.api";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useEmployeeRelationStore = defineStore("employee-relation", () => {
  const employeeRelationData = ref<EmployeeRelation[]>([]);
  const isLoadingData = ref(false);

  const employeeRelationDataParams = reactive<EmployeeRelationDataParams>({
    search: "",
  });

  async function fetchEmployeeRelationData() {
    isLoadingData.value = true;
    try {
      const res = await employeeRelationApi.getData({
        ...employeeRelationDataParams,
      });
      employeeRelationData.value = res.data;
    } finally {
      isLoadingData.value = false;
    }
  }

  return {
    employeeRelationData,
    isLoadingData,
    employeeRelationDataParams,
    fetchEmployeeRelationData,
  };
});
