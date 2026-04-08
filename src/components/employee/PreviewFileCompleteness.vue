<template>
  <div v-if="fileCompletenessStore.isLoadingSelected">
    <v-card v-for="n in 3" :key="n" flat class="p-3">
      <v-skeleton-loader
        type="heading, divider, list-item-two-line@3"
        elevation="0"
      ></v-skeleton-loader>
    </v-card>
  </div>
  <v-card v-else flat class="p-1 md:p-3 space-y-3">
    <!-- ───── Toolbar ───── -->
    <div class="flex justify-end w-full gap-2">
      <v-btn
        color="bg-gray-300 dark:bg-gray-600 text-indigo-900 dark:text-indigo-100 text-sm"
        prepend-icon="mdi-pencil-box"
        variant="flat"
        @click="
          openAddDialog(
            fileCompletenessStore.fileCompletenessSelectedParams.user_id,
          )
        "
      >
        Tambah Data
      </v-btn>
    </div>

    <confirm-dialog />

    <!-- ───── Snackbar Error ───── -->
    <v-snackbar
      v-model="showErrorSnackbar"
      color="bg-red-500"
      elevation="24"
      location="top"
      timeout="4000"
      rounded="lg"
    >
      <div class="d-flex align-center">
        <v-icon icon="mdi-alert-circle" class="me-3"></v-icon>
        <span class="font-weight-medium">{{ snackbarMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          icon="mdi-close"
          @click="showErrorSnackbar = false"
        ></v-btn>
      </template>
    </v-snackbar>

    <!-- ───── Snackbar Success ───── -->
    <v-snackbar
      v-model="showSuccessSnackbar"
      color="bg-green-500"
      elevation="24"
      location="top"
      timeout="4000"
      rounded="lg"
    >
      <div class="d-flex align-center">
        <v-icon icon="mdi-check-circle" class="me-3"></v-icon>
        <span class="font-weight-medium">{{ successMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          icon="mdi-close"
          @click="showSuccessSnackbar = false"
        ></v-btn>
      </template>
    </v-snackbar>

    <div class="flex flex-col gap-5">
      <v-row>
        <v-col
          v-for="(
            item, index
          ) in fileCompletenessStore.fileCompletenessSelected"
          :key="item.id"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <v-card
            class="relative group overflow-hidden rounded-xl w-full mx-auto"
          >
            <div
              class="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-white dark:bg-gray-800"
            >
              <v-img
                v-if="item.file && isImageFile(item.file)"
                :src="getStorageUrl(item.file) || undefined"
                cover
                class="h-full w-full"
              >
                <template v-slot:placeholder>
                  <div class="flex items-center justify-center h-full">
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-4"
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>

              <div
                v-else
                class="h-full w-full flex flex-col items-center justify-center border-2 border-dashed bg-gray-50 dark:bg-gray-900 transition-colors group-hover:border-indigo-500"
              >
                <v-icon color="red-lighten-1" size="48"
                  >mdi-file-pdf-box</v-icon
                >
                <span
                  class="text-xs mt-2 px-4 text-center truncate w-full text-indigo-600 font-medium"
                >
                  {{ item.file }}
                </span>
              </div>

              <div
                class="absolute inset-0 bg-white/60 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10"
              >
                <v-btn
                  icon="mdi-eye"
                  color="bg-gray-500"
                  variant="elevated"
                  @click="viewFile(item.file)"
                  class="scale-90 group-hover:scale-100 transition-transform text-white"
                ></v-btn>
                <v-btn
                  @click="openEditDialog(item)"
                  icon="mdi-pencil"
                  color="bg-amber-500"
                  variant="elevated"
                  class="scale-90 group-hover:scale-100 transition-transform text-white"
                ></v-btn>
                <v-btn
                  @click="handleDelete(item.id)"
                  :loading="fileCompletenessStore.isLoadingDestroy"
                  icon="mdi-delete"
                  color="bg-rose-500"
                  variant="elevated"
                  class="scale-90 group-hover:scale-100 transition-transform text-white"
                ></v-btn>
              </div>

              <div
                class="absolute bottom-2 left-1/2 -translate-x-1/2 z-0 w-full text-center pointer-events-none"
              >
                <span
                  class="bg-black/50 dark:bg-white/20 backdrop-blur-sm text-white px-3 py-0.5 rounded-full text-[10px] font-medium border border-white/20 inline-block"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-card>

  <v-dialog v-model="dialog" max-width="700" scrollable>
    <v-card rounded="lg">
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon
          :icon="isEditMode ? 'mdi-pencil' : 'mdi-file'"
          color="primary"
          size="small"
        ></v-icon>
        <span class="text-base font-bold">
          {{ isEditMode ? "Edit File" : "Tambah File" }}
        </span>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="closeDialog"
        ></v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="px-6 py-4">
        <v-form ref="formRef">
          <div class="space-y-3 md:space-y-0 md:grid grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <v-text-field
                id="name"
                v-model="form.name"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :rules="[rules.required]"
                :error-messages="serverErrors.name"
              >
                <template v-slot:label>
                  Nama<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </div>

            <div class="flex flex-col gap-1 col-span-2">
              <v-file-input
                id="file"
                v-model="form.file"
                variant="outlined"
                density="compact"
                hide-details="auto"
                accept=".pdf,.jpg,.jpeg,.png"
                prepend-icon=""
                prepend-inner-icon="mdi-paperclip"
                :error-messages="serverErrors.file"
              >
                <template v-slot:label
                  >Lampiran<span class="text-red-500">*</span></template
                >
              </v-file-input>

              <!-- Preview existing + tombol hapus -->
              <div
                v-if="
                  form.file_existing &&
                  !getFileFromModel(form.file_existing as any)
                "
                class="flex items-center gap-2 text-xs text-gray-500 border rounded px-3 py-2 bg-gray-50 dark:bg-gray-800"
              >
                <v-icon size="x-small" color="red">mdi-file-pdf-box</v-icon>
                <span class="truncate flex-1">{{ form.file_existing }}</span>
                <v-btn
                  icon="mdi-close-circle"
                  variant="text"
                  size="x-small"
                  color="red"
                  @click="removeFile"
                ></v-btn>
              </div>
            </div>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="px-6 py-4 gap-2 justify-end">
        <v-btn variant="outlined" @click="closeDialog">Batal</v-btn>
        <v-btn
          color="bg-indigo-300 dark:bg-indigo-500"
          variant="flat"
          :prepend-icon="isEditMode ? 'mdi-content-save' : 'mdi-plus'"
          :loading="
            isEditMode
              ? fileCompletenessStore.isLoadingUpdate
              : fileCompletenessStore.isLoadingCreate
          "
          @click="submitForm"
        >
          {{ isEditMode ? "Simpan Perubahan" : "Tambah Data" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useFileCompletenessStore } from "@/stores/file-completeness.store";
import { onMounted, reactive, ref } from "vue";
import ConfirmDialog from "../ConfirmDialog.vue";
import { useRoute } from "vue-router";
import { nextTick } from "vue";
import { useConfirmDialog } from "@/composables/useConfirmDialog";

const { ask } = useConfirmDialog();
const fileCompletenessStore = useFileCompletenessStore();
const route = useRoute();
const userId = route.params.id;
const apiUrl = import.meta.env.VITE_API_URL ?? "";

const showErrorSnackbar = ref(false);
const snackbarMessage = ref("");
const showSuccessSnackbar = ref(false);
const successMessage = ref("");

function showError(message: string) {
  snackbarMessage.value = message;
  showErrorSnackbar.value = true;
}

function showSuccess(message: string) {
  successMessage.value = message;
  showSuccessSnackbar.value = true;
}

const dialog = ref(false);
const isEditMode = ref(false);
const formRef = ref();

const defaultForm = () => ({
  id: null as number | null,
  user_id: null as number | null,
  name: "",
  file: [] as File[],
  file_existing: null as any,
  remove_file: false,
});

function buildFormData(): FormData {
  const fd = new FormData();
  fd.append("user_id", String(form.user_id));
  fd.append("name", form.name);
  const file = Array.isArray(form.file) ? form.file[0] : form.file;

  if (file instanceof File) {
    fd.append("file", file);
  }

  if (form.file_existing !== null) {
    fd.append("file_preview", form.file_existing);
  }

  if (form.remove_file) {
    fd.append("remove_file", "1");
  }
  return fd;
}

async function submitForm() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  Object.keys(serverErrors).forEach((key) => delete serverErrors[key]);

  if (isEditMode.value) {
    try {
      let result = await fileCompletenessStore.updateFileCompleteness(
        Number(form.id),
        buildFormData(),
      );

      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message ?? "Gagal mengupdate prospek");
      }
      closeDialog();
    } catch (err: any) {
      handleServerErrors(err);
    }
  } else {
    try {
      let result =
        await fileCompletenessStore.createFileCompleteness(buildFormData());
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message ?? "Gagal mengupdate prospek");
      }
      closeDialog();
    } catch (err: any) {
      handleServerErrors(err);
    }
  }
}

function handleServerErrors(err: any) {
  if (err?.status === 422) {
    const errors = err.errors as Record<string, string[]>;
    if (errors) {
      Object.entries(errors).forEach(([field, messages]) => {
        serverErrors[field] = messages[0];
      });
    }
  } else {
    showError(err?.message ?? "Terjadi kesalahan, coba lagi.");
  }
}

function getFileFromModel(model: File | File[] | null): File | null {
  if (!model) return null;
  const file = Array.isArray(model) ? model[0] : model;
  return file instanceof File ? file : null;
}

function removeFile() {
  form.file_existing = null;
  form.remove_file = true;
}

const form = reactive(defaultForm());
const serverErrors = reactive<Record<string, string>>({});

const rules = {
  required: (v: any) => !!v || "Field ini wajib diisi",
};

function getStorageUrl(
  filename: string | File | null | undefined,
): string | null {
  if (!filename) return null;
  if (filename instanceof File) return URL.createObjectURL(filename);
  return `${apiUrl}/image/file-completeness/${userId}/${filename}`;
}

function isImageFile(filename: string | File): boolean {
  const name = filename instanceof File ? filename.name : filename;
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(name);
}

function openAddDialog(userId: any) {
  isEditMode.value = false;
  Object.assign(form, defaultForm());
  form.user_id = userId;
  dialog.value = true;
}

function openEditDialog(item: any) {
  isEditMode.value = true;
  Object.assign(form, {
    id: item.id,
    user_id: item.user_id,
    name: item.name,
    file: [],
    file_existing: item.file ?? null,
  });
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
  formRef.value?.reset();
  Object.keys(serverErrors).forEach((key) => delete serverErrors[key]);
}

async function handleDelete(id: number) {
  const confirmed = await ask({
    title: "Hapus file",
    message: "File ini akan dihapus. Lanjutkan?",
    confirmText: "Ya, Hapus",
    color: "red-darken-1",
  });
  if (confirmed) deleteFileCompleteness(id);
}

async function deleteFileCompleteness(id: number) {
  try {
    await fileCompletenessStore.destroyFileCompleteness(id);
    showSuccess("Data berhasil dihapus.");
  } catch (err: any) {
    showError(err?.message ?? "Gagal menghapus data ini.");
  }
}

function viewFile(file: string | File | null | undefined) {
  const url = getStorageUrl(file);
  if (url) {
    window.open(url, "_blank");
  } else {
    showError("File tidak ditemukan atau tidak valid.");
  }
}

onMounted(async () => {
  if (fileCompletenessStore.fileCompletenessSelected.length === 0) {
    fileCompletenessStore.fileCompletenessSelectedParams.user_id =
      userId as string;
    await fileCompletenessStore.fetchFileCompletenessSelected();
  }
});
</script>
