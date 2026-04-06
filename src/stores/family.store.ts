import {
  familyApi,
  type Family,
  type FamilySelectedParams,
  type FamilyCreateUpdateParams,
} from "@/api/modules/family.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useFamilyStore = defineStore("family", () => {
  const familySelected = ref<Family[]>([]);
  const isLoadingSelected = ref(false);
  const isLoadingUpdate = ref(false);
  const isLoadingCreate = ref(false);
  const isLoadingDestroy = ref(false);
  const updateError = ref<string | null>(null);
  const createError = ref<string | null>(null);
  const deleteError = ref<string | null>(null);

  const familySelectedParams = reactive<FamilySelectedParams>({
    user_id: "",
  });

  async function fetchFamilySelected() {
    isLoadingSelected.value = true;
    try {
      const res = await familyApi.getSelected({ ...familySelectedParams });
      familySelected.value = res.data;
    } finally {
      isLoadingSelected.value = false;
    }
  }

  async function updateFamily(id: number, params: FamilyCreateUpdateParams) {
    isLoadingUpdate.value = true;
    updateError.value = null;
    try {
      const res = await familyApi.updateFamily(id, params);
      // update data di list jika ada
      const index = familySelected.value.findIndex((u) => u.id === id);
      if (index !== -1) familySelected.value[index] = res.data;

      return res;
    } catch (err: any) {
      updateError.value =
        err?.response?.data?.message ?? "Gagal mengupdate keluarga";
      throw err;
    } finally {
      isLoadingUpdate.value = false;
    }
  }

  async function createFamily(params: FamilyCreateUpdateParams) {
    isLoadingCreate.value = true;
    createError.value = null;
    try {
      const res = await familyApi.createFamily(params);
      familySelected.value.push(res.data);
      return res;
    } catch (err: any) {
      createError.value =
        err?.response?.data?.message ?? "Gagal menambah keluarga";
      throw err;
    } finally {
      isLoadingCreate.value = false;
    }
  }

  async function destroyFamily(id: number) {
    isLoadingDestroy.value = true;
    deleteError.value = null;
    try {
      const res = await familyApi.destroyFamily(id);
      familySelected.value = familySelected.value.filter((f) => f.id !== id);
      return res;
    } catch (err: any) {
      deleteError.value =
        err?.response?.data?.message ?? "Gagal menghapus keluarga";
      throw err;
    } finally {
      isLoadingDestroy.value = false;
    }
  }

  return {
    familySelected,
    isLoadingSelected,
    isLoadingUpdate,
    isLoadingCreate,
    isLoadingDestroy,
    familySelectedParams,
    createError,
    updateError,
    deleteError,
    fetchFamilySelected,
    updateFamily,
    createFamily,
    destroyFamily,
  };
});
