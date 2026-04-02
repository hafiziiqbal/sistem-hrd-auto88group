import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import {
  userApi,
  type User,
  type UserDataParams,
  type UserDatatablesParams,
  type UserSelectedParams,
} from "@/api/modules/user.api";

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const usersData = ref<User[]>([]);
  const usersSelected = ref<User | null>(null);
  const isLoading = ref(false);
  const isLoadingData = ref(false);
  const isLoadingSelected = ref(false);
  const totalRecords = ref(0);

  const params = reactive<UserDatatablesParams>({
    draw: 1,
    start: 0,
    length: 10,
    user_id: undefined,
    master_position_id: undefined,
    branch_id: undefined,
    hrd_master_education_id: undefined,
    status_id: undefined,
    gender: undefined,
    show_deleted: false,
  });
  const userDataParams = reactive<UserDataParams>({
    search: "",
  });
  const userSelectedParams = reactive<UserSelectedParams>({
    id: "",
  });

  async function fetchUsers() {
    isLoading.value = true;
    try {
      const res = await userApi.getDatatables({ ...params });
      users.value = res.data;
      totalRecords.value = res.recordsTotal;
      params.draw = res.draw + 1;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUsersData() {
    isLoadingData.value = true;
    try {
      const res = await userApi.getData({ ...userDataParams });
      usersData.value = res.data;
    } finally {
      isLoadingData.value = false;
    }
  }
  async function fetchUsersSelected() {
    isLoadingSelected.value = true;
    try {
      const res = await userApi.getSelected({ ...userSelectedParams });
      usersSelected.value = res.data;
    } finally {
      isLoadingSelected.value = false;
    }
  }

  function toggleShowDeleted() {
    params.show_deleted = !params.show_deleted;
    params.start = 0;
    fetchUsers();
  }

  return {
    users,
    usersData,
    usersSelected,
    isLoading,
    isLoadingData,
    isLoadingSelected,
    totalRecords,
    params,
    userDataParams,
    userSelectedParams,
    fetchUsers,
    fetchUsersData,
    toggleShowDeleted,
    fetchUsersSelected,
  };
});
