<template>
  <div v-if="familyStore.isLoadingSelected">
    <v-card v-for="n in 3" :key="n" flat class="p-3">
      <v-skeleton-loader
        type="heading, divider, list-item-two-line@3"
        elevation="0"
      ></v-skeleton-loader>
    </v-card>
  </div>
  <v-card v-else flat class="p-1 md:p-3 space-y-3">
    <div class="flex justify-end w-full gap-2">
      <v-btn
        color="bg-gray-300 dark:bg-gray-600 text-indigo-900 dark:text-indigo-100 text-sm"
        prepend-icon="mdi-pencil-box"
        variant="flat"
        @click="openAddDialog"
        >Tambah Data</v-btn
      >
    </div>
    <div class="flex flex-col gap-5">
      <v-card
        v-for="(item, index) in familyStore.familySelected"
        :key="index"
        variant="flat"
        border
        class="mx-auto w-full rounded-lg"
      >
        <v-card-item class="bg-gray-100 dark:bg-gray-800">
          <div class="flex items-center justify-between">
            <v-card-title class="text-base font-bold flex items-center gap-2">
              <v-icon icon="mdi-account" color="primary" size="small"></v-icon>
              {{ item.employee_relation_name ?? "-" }}
            </v-card-title>
            <div class="flex gap-2">
              <v-btn
                icon="mdi-pencil"
                variant="text"
                color="text-amber-500"
                size="small"
                @click="openEditDialog(item)"
              ></v-btn>

              <v-btn
                icon="mdi-delete"
                variant="text"
                color="text-red-600"
                size="small"
              ></v-btn>
            </div>
          </div>
        </v-card-item>

        <v-divider></v-divider>

        <v-card-text class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col col-span-3">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Nama Lengkap</span
              >
              <span class="font-bold text-sm">{{ item.name ?? "-" }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Tempat, Tanggal Lahir</span
              >
              <span class="font-bold text-sm"
                >{{ item.birth_place ?? "-" }},
                {{ toFullDate(item.birth_date) ?? "-" }}</span
              >
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300">NIK</span>
              <span class="font-bold text-sm">{{ item.nik ?? "-" }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >No. BPJS Kesehatan</span
              >
              <span class="font-bold text-sm">{{
                item.bpjs_health_number ?? "-"
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >No. HP</span
              >
              <span class="font-bold text-sm">{{
                item.phone_number ?? "-"
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Jenis Kelamin</span
              >
              <span class="font-bold text-sm">{{
                item.gender == null
                  ? "-"
                  : item.gender == "M"
                    ? "Laki-Laki"
                    : "Perempuan"
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Agama</span
              >
              <span class="font-bold text-sm">{{
                item.religion_name ?? "-"
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Pekerjaan</span
              >
              <span class="font-bold text-sm">{{ item.job_name ?? "-" }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Status Perkawinan</span
              >
              <span class="font-bold text-sm">{{
                item.marital_status_name
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Tanggal Perkawinan</span
              >
              <span class="font-bold text-sm">{{
                toFullDate(item.marriage_date) ?? "-"
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Pendidikan Terakhir</span
              >
              <span class="font-bold text-sm">{{
                item.education_name ?? "-"
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300"
                >Status</span
              >
              <span class="font-bold text-sm">
                {{
                  item.life_status === "alive"
                    ? "Hidup"
                    : item.life_status === "deceased"
                      ? "Meninggal"
                      : "-"
                }}
              </span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-card>

  <!-- Dialog Tambah / Edit Data Keluarga -->
  <v-dialog v-model="dialog" max-width="700" scrollable>
    <v-card rounded="lg">
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon
          :icon="isEditMode ? 'mdi-pencil' : 'mdi-account-plus'"
          color="primary"
          size="small"
        ></v-icon>
        <span class="text-base font-bold">
          {{ isEditMode ? "Edit Data Keluarga" : "Tambah Data Keluarga" }}
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <!-- Hubungan -->
            <div class="md:col-span-2">
              <v-select
                v-model="form.employee_relation_name"
                label="Hubungan Keluarga"
                :items="relationOptions"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              ></v-select>
            </div>

            <!-- Nama Lengkap -->
            <div class="md:col-span-2">
              <v-text-field
                v-model="form.name"
                label="Nama Lengkap"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              ></v-text-field>
            </div>

            <!-- Tempat Lahir -->
            <v-text-field
              v-model="form.birth_place"
              label="Tempat Lahir"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- Tanggal Lahir -->
            <v-text-field
              v-model="form.birth_date"
              label="Tanggal Lahir"
              variant="outlined"
              density="compact"
              type="date"
            ></v-text-field>

            <!-- NIK -->
            <v-text-field
              v-model="form.nik"
              label="NIK"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- No. BPJS Kesehatan -->
            <v-text-field
              v-model="form.bpjs_health_number"
              label="No. BPJS Kesehatan"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- No. HP -->
            <v-text-field
              v-model="form.phone_number"
              label="No. HP"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- Jenis Kelamin -->
            <v-select
              v-model="form.gender"
              label="Jenis Kelamin"
              :items="genderOptions"
              item-title="label"
              item-value="value"
              variant="outlined"
              density="compact"
            ></v-select>

            <!-- Agama -->
            <v-text-field
              v-model="form.religion_name"
              label="Agama"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- Pekerjaan -->
            <v-text-field
              v-model="form.job_name"
              label="Pekerjaan"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- Status Perkawinan -->
            <v-text-field
              v-model="form.marital_status_name"
              label="Status Perkawinan"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- Tanggal Perkawinan -->
            <v-text-field
              v-model="form.marriage_date"
              label="Tanggal Perkawinan"
              variant="outlined"
              density="compact"
              type="date"
            ></v-text-field>

            <!-- Pendidikan Terakhir -->
            <v-text-field
              v-model="form.education_name"
              label="Pendidikan Terakhir"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <!-- Status Hidup -->
            <v-select
              v-model="form.life_status"
              label="Status"
              :items="lifeStatusOptions"
              item-title="label"
              item-value="value"
              variant="outlined"
              density="compact"
            ></v-select>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="px-6 py-4 gap-2 justify-end">
        <v-btn variant="outlined" @click="closeDialog">Batal</v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :prepend-icon="isEditMode ? 'mdi-content-save' : 'mdi-plus'"
          @click="submitForm"
        >
          {{ isEditMode ? "Simpan Perubahan" : "Tambah Data" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDateFormatter } from "@/composables/UseDateFormatter";
import { useFamilyStore } from "@/stores/family.store";
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";

const familyStore = useFamilyStore();
const route = useRoute();
const { toFullDate } = useDateFormatter();
const userId = route.params.id;

// --- Dialog state ---
const dialog = ref(false);
const isEditMode = ref(false);
const formRef = ref();

// --- Form model ---
const defaultForm = () => ({
  employee_relation_name: null as string | null,
  name: "",
  birth_place: "",
  birth_date: "",
  nik: "",
  bpjs_health_number: "",
  phone_number: "",
  gender: null as string | null,
  religion_name: "",
  job_name: "",
  marital_status_name: "",
  marriage_date: "",
  education_name: "",
  life_status: null as string | null,
});

const form = reactive(defaultForm());

// --- Options ---
const relationOptions = [
  "Istri",
  "Suami",
  "Anak",
  "Orang Tua",
  "Saudara",
  "Lainnya",
];

const genderOptions = [
  { label: "Laki-Laki", value: "M" },
  { label: "Perempuan", value: "F" },
];

const lifeStatusOptions = [
  { label: "Hidup", value: "alive" },
  { label: "Meninggal", value: "deceased" },
];

// --- Validation rules ---
const rules = {
  required: (v: any) => !!v || "Field ini wajib diisi",
};

// --- Actions ---
function openAddDialog() {
  isEditMode.value = false;
  Object.assign(form, defaultForm());
  dialog.value = true;
}

function openEditDialog(item: any) {
  isEditMode.value = true;
  Object.assign(form, {
    employee_relation_name: item.employee_relation_name ?? null,
    name: item.name ?? "",
    birth_place: item.birth_place ?? "",
    birth_date: item.birth_date ?? "",
    nik: item.nik ?? "",
    bpjs_health_number: item.bpjs_health_number ?? "",
    phone_number: item.phone_number ?? "",
    gender: item.gender ?? null,
    religion_name: item.religion_name ?? "",
    job_name: item.job_name ?? "",
    marital_status_name: item.marital_status_name ?? "",
    marriage_date: item.marriage_date ?? "",
    education_name: item.education_name ?? "",
    life_status: item.life_status ?? null,
  });
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
  formRef.value?.reset();
}

async function submitForm() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  if (isEditMode.value) {
    // TODO: panggil action store untuk update data
    console.log("Update data:", { ...form });
  } else {
    // TODO: panggil action store untuk tambah data
    console.log("Tambah data:", { ...form });
  }

  closeDialog();
}

onMounted(async () => {
  if (familyStore.familySelected.length == 0) {
    familyStore.familySelectedParams.user_id = userId as string;
    await familyStore.fetchFamilySelected();
  }
});
</script>
