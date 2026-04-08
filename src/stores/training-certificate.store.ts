import {
  trainingCertificateApi,
  type TrainingCertificate,
  type TrainingCertificateSelectedParams,
} from "@/api/modules/training-certificate.api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useTrainingCertificateStore = defineStore(
  "training-certificate",
  () => {
    const trainingCertificateSelected = ref<TrainingCertificate[]>([]);
    const isLoadingSelected = ref(false);
    const isLoadingUpdate = ref(false);
    const isLoadingCreate = ref(false);
    const isLoadingDestroy = ref(false);
    const updateError = ref<string | null>(null);
    const createError = ref<string | null>(null);
    const deleteError = ref<string | null>(null);

    const trainingCertificateSelectedParams =
      reactive<TrainingCertificateSelectedParams>({
        user_id: "",
      });

    async function fetchTrainingCertificateSelected() {
      isLoadingSelected.value = true;
      try {
        const res = await trainingCertificateApi.getSelected({
          ...trainingCertificateSelectedParams,
        });
        trainingCertificateSelected.value = res.data;
      } finally {
        isLoadingSelected.value = false;
      }
    }

    async function updateTrainingCertificate(id: number, params: FormData) {
      isLoadingUpdate.value = true;
      updateError.value = null;
      try {
        const res = await trainingCertificateApi.updateTrainingCertificate(
          id,
          params,
        );
        const index = trainingCertificateSelected.value.findIndex(
          (u) => u.id === id,
        );
        if (index !== -1) trainingCertificateSelected.value[index] = res.data;

        return res;
      } catch (err: any) {
        updateError.value =
          err?.response?.data?.message ?? "Gagal mengupdate data";
        throw err;
      } finally {
        isLoadingUpdate.value = false;
      }
    }

    async function createTrainingCertificate(params: FormData) {
      isLoadingCreate.value = true;
      createError.value = null;
      try {
        const res =
          await trainingCertificateApi.createTrainingCertificate(params);
        trainingCertificateSelected.value.push(res.data);
        return res;
      } catch (err: any) {
        createError.value =
          err?.response?.data?.message ?? "Gagal menambah data";
        throw err;
      } finally {
        isLoadingCreate.value = false;
      }
    }

    async function destroyTrainingCertificate(id: number) {
      isLoadingDestroy.value = true;
      deleteError.value = null;
      try {
        const res = await trainingCertificateApi.destroyTrainingCertificate(id);
        trainingCertificateSelected.value =
          trainingCertificateSelected.value.filter((f) => f.id !== id);
        return res;
      } catch (err: any) {
        deleteError.value =
          err?.response?.data?.message ?? "Gagal menghapus data";
        throw err;
      } finally {
        isLoadingDestroy.value = false;
      }
    }

    return {
      trainingCertificateSelected,
      isLoadingSelected,
      isLoadingUpdate,
      isLoadingCreate,
      isLoadingDestroy,
      trainingCertificateSelectedParams,
      createError,
      updateError,
      deleteError,
      fetchTrainingCertificateSelected,
      updateTrainingCertificate,
      createTrainingCertificate,
      destroyTrainingCertificate,
    };
  },
);
