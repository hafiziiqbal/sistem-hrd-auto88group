import {
  hrdEducationApi,
  type HrdEducation,
  type HrdEducationCreateUpdateParams,
  type HrdEducationSelectedParams,
} from "@/api/modules/hrd-education.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useHrdEducationStore = defineStore("hrd-education", () => {
  const hrdEducationSelected = ref<HrdEducation[]>([]);
  const isLoadingSelected = ref(false);
  const isLoadingUpdate = ref(false);
  const isLoadingCreate = ref(false);
  const isLoadingDestroy = ref(false);
  const updateError = ref<string | null>(null);
  const createError = ref<string | null>(null);
  const deleteError = ref<string | null>(null);

  const hrdEducationSelectedParams = reactive<HrdEducationSelectedParams>({
    user_id: "",
  });

  async function fetchHrdEducationSelected() {
    isLoadingSelected.value = true;
    try {
      const res = await hrdEducationApi.getSelected({
        ...hrdEducationSelectedParams,
      });
      hrdEducationSelected.value = res.data;
    } finally {
      isLoadingSelected.value = false;
    }
  }

  async function updateHrdEducation(id: number, params: FormData) {
    isLoadingUpdate.value = true;
    updateError.value = null;
    try {
      const res = await hrdEducationApi.updateHrdEducation(id, params);
      // update data di list jika ada
      const index = hrdEducationSelected.value.findIndex((u) => u.id === id);
      if (index !== -1) hrdEducationSelected.value[index] = res.data;

      return res;
    } catch (err: any) {
      updateError.value =
        err?.response?.data?.message ?? "Gagal mengupdate pendidikan";
      throw err;
    } finally {
      isLoadingUpdate.value = false;
    }
  }

  async function createHrdEducation(params: FormData) {
    isLoadingCreate.value = true;
    createError.value = null;
    try {
      const res = await hrdEducationApi.createHrdEducation(params);
      hrdEducationSelected.value.push(res.data);
      return res;
    } catch (err: any) {
      createError.value =
        err?.response?.data?.message ?? "Gagal menambah pendidikan";
      throw err;
    } finally {
      isLoadingCreate.value = false;
    }
  }

  async function destroyHrdEducation(id: number) {
    isLoadingDestroy.value = true;
    deleteError.value = null;
    try {
      const res = await hrdEducationApi.destroyHrdEducation(id);
      hrdEducationSelected.value = hrdEducationSelected.value.filter(
        (f) => f.id !== id,
      );
      return res;
    } catch (err: any) {
      deleteError.value =
        err?.response?.data?.message ?? "Gagal menghapus pendidikan";
      throw err;
    } finally {
      isLoadingDestroy.value = false;
    }
  }

  return {
    hrdEducationSelected,
    isLoadingSelected,
    isLoadingUpdate,
    isLoadingCreate,
    isLoadingDestroy,
    hrdEducationSelectedParams,
    createError,
    updateError,
    deleteError,
    fetchHrdEducationSelected,
    updateHrdEducation,
    createHrdEducation,
    destroyHrdEducation,
  };
});
