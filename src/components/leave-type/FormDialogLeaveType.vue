<template>
  <v-dialog v-model="dialog" max-width="700" scrollable>
    <v-card rounded="lg">
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon
          :icon="isEditMode ? 'mdi-pencil' : 'mdi-briefcase'"
          color="primary"
          size="small"
        ></v-icon>
        <span class="text-base font-bold">
          {{ isEditMode ? "Edit Data" : "Tambah Data " }}
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
      <v-card-text class="p-4">
        <v-form ref="formRef">
          <v-row class="gy-4">
            <v-col cols="6">
              <v-text-field
                id="code"
                v-model="form.code"
                type="text"
                variant="outlined"
                hide-details="auto"
                density="compact"
                :rules="[rules.required]"
                :error-messages="serverErrors.code"
              >
                <template v-slot:label>
                  Code<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-autocomplete
                id="type"
                v-model="form.type"
                :items="listType"
                placeholder="Pilih jenis izin"
                variant="outlined"
                density="compact"
                color="primary"
                item-title="label"
                item-value="value"
                hide-details="auto"
                :rules="[rules.required]"
                :error-messages="serverErrors.type"
                clearable
              >
                <template v-slot:label>
                  Jenis Izin<span class="text-red-500">*</span>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="name"
                v-model="form.name"
                type="text"
                variant="outlined"
                hide-details="auto"
                density="compact"
                :rules="[rules.required]"
                :error-messages="serverErrors.name"
              >
                <template v-slot:label>
                  Nama Jenis Izin<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                id="max_hour"
                v-model="form.max_hour"
                type="number"
                variant="outlined"
                hide-details="auto"
                density="compact"
                :rules="maxHourRules"
                :disabled="isMaxDayFilled"
                :error-messages="serverErrors.max_hour"
              >
                <template v-slot:label>
                  Max Izin (Jam)<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                id="max_day"
                v-model="form.max_day"
                type="number"
                variant="outlined"
                hide-details="auto"
                density="compact"
                :rules="maxDayRules"
                :disabled="isMaxHourFilled"
                :error-messages="serverErrors.max_day"
              >
                <template v-slot:label>
                  Max Izin (Hari)<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="back_date"
                v-model="form.back_date"
                type="number"
                variant="outlined"
                hide-details="auto"
                density="compact"
                :error-messages="serverErrors.back_date"
                :rules="[rules.required, rules.numeric]"
              >
                <template v-slot:label>
                  Back Date<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-autocomplete
                id="deduct_file"
                v-model="form.deduct_leave"
                :items="listDeductLeave"
                placeholder="Pilih opsi"
                variant="outlined"
                density="compact"
                color="primary"
                item-title="label"
                item-value="value"
                hide-details="auto"
                :rules="[rules.required]"
                :error-messages="serverErrors.deduct_leave"
                clearable
              >
                <template v-slot:label>
                  Mengurangi Cuti<span class="text-red-500">*</span>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="6">
              <v-autocomplete
                id="file_upload"
                v-model="form.file_upload"
                :items="listUploadFile"
                placeholder="Pilih opsi"
                variant="outlined"
                density="compact"
                color="primary"
                item-title="label"
                item-value="value"
                hide-details="auto"
                :rules="[rules.required]"
                :error-messages="serverErrors.upload_file"
                clearable
              >
                <template v-slot:label>
                  Upload File<span class="text-red-500">*</span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
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
              ? leaveTypeStore.isLoadingUpdate
              : leaveTypeStore.isLoadingCreate
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
import { useLeaveTypeStore } from "@/stores/leave_type.store";
import { computed, reactive, ref, watch } from "vue";

const defaultForm = () => ({
  id: 0 as number | null,
  code: "",
  name: "",
  type: "",
  is_full_day: 0 as number,
  max_day: "" as string,
  max_hour: "" as string,
  back_date: "" as string,
  file_upload: 0 as number,
  deduct_leave: 0 as number,
});

const props = defineProps<{
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}>();

const leaveTypeStore = useLeaveTypeStore();
const form = reactive(defaultForm());
const serverErrors = reactive<Record<string, string>>({});

const dialog = ref(false);
const isEditMode = ref(false);
const formRef = ref();

const listType = [
  { label: "Izin", value: "izin" },
  { label: "Sakit", value: "sakit" },
  { label: "Cuti", value: "cuti" },
];

const listDeductLeave = [
  { label: "Ya", value: 1 },
  { label: "Tidak", value: 0 },
];

const listUploadFile = [
  { label: "Wajib", value: 1 },
  { label: "Tidak Wajib", value: 0 },
];

const isMaxHourFilled = computed(() => {
  return form.max_hour !== null && form.max_hour !== "";
});

const isMaxDayFilled = computed(() => {
  return form.max_day !== null && form.max_day !== "";
});

const maxHourRules = computed(() => {
  return [
    (v: any) => {
      if (!v && !form.max_day) return true; // dua-duanya kosong → OK
      // kalau diisi, harus angka
      if (v && !/^[0-9]+$/.test(v)) {
        return "Max Hari harus berupa angka";
      }
      // kalau dua-duanya diisi → optional (kalau mau dibatasi bisa ubah)
      if (v && form.max_day) return true;

      return true;
    },
  ];
});

const maxDayRules = computed(() => {
  return [
    (v: any) => {
      // dua-duanya kosong → valid
      if (!v && !form.max_hour) return true;

      // kalau dua-duanya diisi → optional
      if (v && form.max_hour) return true;

      // kalau diisi harus angka
      if (v && !/^[0-9]+$/.test(v)) {
        return "Max Hari harus berupa angka";
      }

      return true;
    },
  ];
});
watch(
  () => form.max_hour,
  (val) => {
    if (val) {
      form.max_day = "";

      // 🔥 hapus error max_day
      delete serverErrors.max_day;

      // 🔥 reset validasi field max_day
      formRef.value?.resetValidation();
    }
  },
);

watch(
  () => form.max_day,
  (val) => {
    if (val) {
      form.max_hour = "";

      // 🔥 hapus error max_hour
      delete serverErrors.max_hour;

      // 🔥 reset validasi field max_hour
      formRef.value?.resetValidation();
    }
  },
);

const rules = {
  required: (v: any) =>
    (v !== null && v !== undefined && v !== "") || "Wajib diisi",
  numeric: (v: any) => /^[0-9]+$/.test(v) || "Harus berupa angka",
};

function closeDialog() {
  dialog.value = false;
  formRef.value?.reset();
  Object.keys(serverErrors).forEach((key) => delete serverErrors[key]);
}

function openAddDialog() {
  isEditMode.value = false;
  Object.assign(form, defaultForm());
  dialog.value = true;
}

function openEditDialog(item: any) {
  console.log(item);
  isEditMode.value = true;
  Object.assign(form, {
    id: item.id,
    code: item.code,
    name: item.name,
    type: item.type,
    is_full_day: item.is_full_day,
    max_day: item.max_day,
    max_hour: item.max_hour,
    back_date: item.back_date,
    file_upload: item.file_upload,
    deduct_leave: item.deduct_leave,
  });
  dialog.value = true;
}
async function submitForm() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  Object.keys(serverErrors).forEach((key) => delete serverErrors[key]);

  if (isEditMode.value) {
    try {
      await leaveTypeStore.updateLeaveType(Number(form.id), form);
      props.showSuccess("Data berhasil diperbarui.");
      closeDialog();
    } catch (err: any) {
      handleServerErrors(err);
    }
  } else {
    try {
      await leaveTypeStore.createLeaveType(form);
      props.showSuccess("Data berhasil ditambahkan.");
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
    props.showError(err?.message ?? "Terjadi kesalahan, coba lagi.");
  }
}

defineExpose({
  openAddDialog,
  openEditDialog,
});
</script>
