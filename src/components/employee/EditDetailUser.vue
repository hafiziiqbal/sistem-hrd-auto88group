<template>
  <div v-if="userStore.isLoadingSelected">
    <v-card v-for="n in 3" :key="n" flat class="p-3">
      <v-skeleton-loader
        type="heading, divider, list-item-two-line@3"
        elevation="0"
      ></v-skeleton-loader>
    </v-card>
  </div>
  <v-card v-else flat class="p-3">
    <div class="flex justify-end w-full gap-2">
      <v-btn
        color="bg-gray-300 dark:bg-gray-600 text-indigo-900 dark:text-indigo-100 text-sm"
        prepend-icon="mdi-close"
        variant="flat"
        @click="emit('cancel')"
      >
        Batal
      </v-btn>
      <v-btn
        color="indigo"
        prepend-icon="mdi-content-save"
        variant="flat"
        :loading="isSaving"
        @click="handleSubmit"
      >
        Simpan
      </v-btn>
    </div>

    <v-form ref="formRef" validate-on="submit lazy">
      <div class="flex flex-col gap-5">
        <!-- Data Diri -->
        <v-card elevation="0">
          <v-card-title
            class="text-indigo-600 dark:text-indigo-400 font-bold px-0 text-base"
          >
            Data Diri
          </v-card-title>
          <v-divider class="mb-6"></v-divider>
          <v-row gap="15">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.nik"
                label="NIK"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.name"
                label="Nama Lengkap"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.hrd_master_education_id"
                label="Pendidikan Terakhir"
                :items="listEducation"
                :loading="educationStore.isLoadingData"
                item-title="title"
                item-value="value"
                placeholder="Pilih pendidikan"
                variant="outlined"
                density="compact"
                color="primary"
                hide-details="auto"
                clearable
                no-filter
                :rules="[rules.required]"
                @update:search="onSearchEducation"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6"></v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.front_title"
                label="Gelar Depan"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.back_title"
                label="Gelar Belakang"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.phone_number"
                label="Nomor HP"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.email"
                label="Email"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.gender"
                :items="listGender"
                label="Jenis Kelamin"
                placeholder="Pilih jenis kelamin"
                variant="outlined"
                density="compact"
                color="primary"
                item-title="label"
                item-value="value"
                hide-details="auto"
                :rules="[rules.required]"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.hrd_master_marital_status_id"
                label="Status Pernikahan"
                :items="listMaritalStatus"
                :loading="maritalStatusStore.isLoadingData"
                item-title="title"
                item-value="value"
                placeholder="Pilih status pernikahan"
                variant="outlined"
                density="compact"
                color="primary"
                hide-details="auto"
                clearable
                no-filter
                :rules="[rules.required]"
                @update:search="onSearchMaritalStatus"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.hrd_master_blood_type_id"
                label="Golongan Darah"
                :items="listBloodType"
                :loading="bloodTypeStore.isLoadingData"
                item-title="title"
                item-value="value"
                placeholder="Pilih golongan darah"
                variant="outlined"
                density="compact"
                color="primary"
                hide-details="auto"
                clearable
                no-filter
                :rules="[rules.required]"
                @update:search="onSearchBloodType"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.birth_place"
                label="Tempat Lahir"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <app-date-picker
                v-model="form.birth_date"
                label="Tanggal Lahir"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.hrd_master_religion_id"
                label="Agama"
                :items="listReligion"
                :loading="religionStore.isLoadingData"
                item-title="title"
                item-value="value"
                placeholder="Pilih agama"
                variant="outlined"
                density="compact"
                color="primary"
                hide-details="auto"
                clearable
                no-filter
                :rules="[rules.required]"
                @update:search="onSearchReligion"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.bpjs_health_number"
                label="Nomor BPJS Kesehatan"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.bpjs_employment_number"
                label="Nomor BPJS Ketenagakerjaan"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.number_of_children"
                label="Jumlah Anak"
                variant="outlined"
                density="compact"
                type="number"
                min="0"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.emergency_phone_number"
                label="Nomor HP Darurat"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.emergency_contact_name"
                label="Nama Kontak Darurat"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <!-- Foto Profil -->
        <v-card elevation="0">
          <v-card-title
            class="text-indigo-600 dark:text-indigo-400 font-bold px-0 text-base"
          >
            Foto Profil
          </v-card-title>
          <v-divider class="mb-4"></v-divider>
          <div class="flex flex-col gap-3">
            <div v-if="imagePreview || userStore.usersSelected?.image">
              <v-img
                :src="
                  imagePreview ??
                  apiUrl +
                    '/image/user-profile/' +
                    userStore.usersSelected?.id +
                    '/' +
                    userStore.usersSelected?.image
                "
                max-width="200"
                aspect-ratio="1/1"
                class="rounded-lg bg-grey-lighten-2 mb-3"
              ></v-img>
            </div>
            <v-file-input
              v-model="form.imageFile"
              label="Upload Foto Profil"
              variant="outlined"
              density="compact"
              accept="image/*"
              prepend-icon="mdi-camera"
              hide-details="auto"
              :rules="[rules.imageSize]"
              @update:model-value="onImageChange"
            ></v-file-input>
            <div class="text-gray-400 text-xs">
              Format: JPG, PNG. Maks. 2MB.
            </div>
          </div>
        </v-card>

        <!-- Alamat KTP -->
        <v-card elevation="0">
          <v-card-title
            class="text-indigo-600 dark:text-indigo-400 font-bold px-0 text-base"
          >
            Data Alamat (Sesuai KTP)
          </v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-textarea
            v-model="form.address_id_card"
            label="Alamat KTP"
            variant="outlined"
            density="compact"
            rows="3"
            auto-grow
            hide-details="auto"
          ></v-textarea>
        </v-card>

        <!-- Alamat Domisili -->
        <v-card elevation="0">
          <v-card-title
            class="text-indigo-600 dark:text-indigo-400 font-bold px-0 text-base"
          >
            Data Alamat (Domisili)
          </v-card-title>
          <v-divider class="mb-6"></v-divider>
          <v-row gap="15">
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="form.master_area_province_id"
                label="Provinsi"
                :items="listProvince"
                :loading="provinceStore.isLoading"
                item-title="title"
                item-value="value"
                placeholder="Pilih provinsi"
                variant="outlined"
                density="compact"
                color="primary"
                hide-details="auto"
                clearable
                no-filter
                :rules="[rules.required]"
                @update:search="onSearchProvince"
                @update:model-value="onProvinceChange"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.regency_id"
                label="Kabupaten"
                variant="outlined"
                density="compact"
                :items="regencyOptions"
                item-title="name"
                item-value="id"
                hide-details="auto"
                :disabled="!form.master_area_province_id"
                @update:model-value="onRegencyChange"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="form.district_id"
                label="Kecamatan"
                variant="outlined"
                density="compact"
                :items="districtOptions"
                item-title="name"
                item-value="id"
                hide-details="auto"
                :disabled="!form.regency_id"
                @update:model-value="onDistrictChange"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.village_id"
                label="Kelurahan"
                variant="outlined"
                density="compact"
                :items="villageOptions"
                item-title="name"
                item-value="id"
                hide-details="auto"
                :disabled="!form.district_id"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.neighborhood_unit"
                label="RT"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.community_unit"
                label="RW"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                v-model="form.current_address"
                label="Alamat"
                variant="outlined"
                density="compact"
                rows="3"
                hide-details="auto"
                auto-grow
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="form.zip_code"
                label="Kode Pos"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <!-- Data Kepegawaian -->
        <v-card elevation="0">
          <v-card-title
            class="text-indigo-600 dark:text-indigo-400 font-bold px-0 text-base"
          >
            Data Kepegawaian
          </v-card-title>
          <v-divider class="mb-6"></v-divider>
          <v-row gap="15">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.position"
                label="Jabatan"
                class="mb-0"
                variant="outlined"
                density="compact"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.branch_id"
                label="Cabang"
                variant="outlined"
                density="compact"
                :items="branchOptions"
                item-title="name"
                item-value="id"
                hide-details="auto"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.remaining_leave"
                label="Jatah Cuti"
                variant="outlined"
                density="compact"
                type="number"
                min="0"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.status_id"
                label="Status"
                variant="outlined"
                density="compact"
                :items="employeeStatusOptions"
                item-title="label"
                item-value="value"
                hide-details="auto"
                :rules="[rules.required]"
              ></v-select>
            </v-col>

            <!-- Status 1: Kontrak -->
            <template v-if="form.status_id === 1">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.effective_start_date"
                  label="Tanggal Mulai Kontrak"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.effective_end_date"
                  label="Tanggal Selesai Kontrak"
                  variant="outlined"
                  density="compact"
                  type="date"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </template>

            <!-- Status 2: Tetap -->
            <template v-else-if="form.status_id === 2">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.effective_start_date"
                  label="Tanggal Ditetapkan"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                  type="date"
                ></v-text-field>
              </v-col>
            </template>

            <!-- Status 3 atau 4: Resign / Dikeluarkan -->
            <template v-else-if="[3, 4].includes(form.status_id ?? 0)">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.effective_end_date"
                  label="Tanggal Keluar"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                  type="date"
                ></v-text-field>
              </v-col>
            </template>

            <!-- Status 5: Pensiun -->
            <template v-else-if="form.status_id === 5">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.effective_end_date"
                  label="Tanggal Pensiun"
                  variant="outlined"
                  density="compact"
                  type="date"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </template>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.join_date"
                label="Join Date"
                variant="outlined"
                density="compact"
                type="date"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-form>

    <!-- Bottom action bar -->
    <div class="flex justify-end w-full gap-2 mt-6">
      <v-btn
        color="bg-gray-300 dark:bg-gray-600 text-indigo-900 dark:text-indigo-100 text-sm"
        prepend-icon="mdi-close"
        variant="flat"
        @click="emit('cancel')"
      >
        Batal
      </v-btn>
      <v-btn
        color="indigo"
        prepend-icon="mdi-content-save"
        variant="flat"
        :loading="isSaving"
        @click="handleSubmit"
      >
        Simpan
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import { onMounted, ref, reactive, computed } from "vue";
import { useEducationStore } from "@/stores/education.store";
import { useDebounceFn } from "@/composables/UseDebounce";
import { useMaritalStatusStore } from "@/stores/maritall-status.store";
import { useBloodTypeStore } from "@/stores/blood-type.store";
import AppDatePicker from "@/components/AppDatePicker.vue";
import { useReligionStore } from "@/stores/religion.store";
import { useProvinceStore } from "@/stores/province.store";

const educationStore = useEducationStore();
const maritalStatusStore = useMaritalStatusStore();
const bloodTypeStore = useBloodTypeStore();
const religionStore = useReligionStore();
const provinceStore = useProvinceStore();
const userStore = useUserStore();

const apiUrl = import.meta.env.VITE_API_URL;
const formRef = ref();
const isSaving = ref(false);
const imagePreview = ref<string | null>(null);
const listEducation = computed(() =>
  educationStore.educationData.map((education) => ({
    title: education.name,
    value: education.id,
  })),
);
const listMaritalStatus = computed(() =>
  maritalStatusStore.maritalStatusData.map((maritalStatus) => ({
    title: maritalStatus.name,
    value: maritalStatus.id,
  })),
);
const listBloodType = computed(() =>
  bloodTypeStore.bloodTypeData.map((bloodType) => ({
    title: bloodType.name,
    value: bloodType.id,
  })),
);
const listReligion = computed(() =>
  religionStore.religionData.map((religion) => ({
    title: religion.name,
    value: religion.id,
  })),
);
const listProvince = computed(() =>
  provinceStore.province.map((province) => ({
    title: province.name,
    value: province.id,
  })),
);
const listGender = [
  { label: "Laki-Laki", value: "M" },
  { label: "Perempuan", value: "F" },
];

const onSearchEducation = useDebounceFn((val: string) => {
  console.log("asdfas");
  educationStore.educationDataParams.search = val ?? "";
  educationStore.fetchEducationData();
}, 400);
const onSearchMaritalStatus = useDebounceFn((val: string) => {
  maritalStatusStore.maritalStatusDataParams.search = val ?? "";
  maritalStatusStore.fetchMaritalStatusData();
}, 400);
const onSearchBloodType = useDebounceFn((val: string) => {
  bloodTypeStore.bloodTypeDataParams.search = val ?? "";
  bloodTypeStore.fetchBloodTypeData();
}, 400);
const onSearchReligion = useDebounceFn((val: string) => {
  religionStore.religionDataParams.search = val ?? "";
  religionStore.fetchReligionData();
}, 400);
const onSearchProvince = useDebounceFn((val: string) => {
  provinceStore.provinceParams.search = val ?? "";
  provinceStore.fetchProvince();
}, 400);

// ── Form state ──────────────────────────────────────────────────────────────
const form = reactive({
  nik: "",
  name: "",
  hrd_master_education_id: null as number | null,
  front_title: "",
  back_title: "",
  phone_number: "",
  email: "",
  gender: "",
  hrd_master_marital_status_id: null as number | null,
  hrd_master_blood_type_id: null as number | null,
  birth_place: "",
  birth_date: "",
  hrd_master_religion_id: null as number | null,
  bpjs_health_number: "",
  bpjs_employment_number: "",
  number_of_children: null as number | null,
  emergency_phone_number: "",
  emergency_contact_name: "",
  imageFile: null as File | File[] | null,
  address_id_card: "",
  master_area_province_id: null as number | null,
  regency_id: null as number | null,
  district_id: null as number | null,
  village_id: null as number | null,
  neighborhood_unit: "",
  community_unit: "",
  current_address: "",
  zip_code: "",
  position: "",
  branch_id: null as number | null,
  remaining_leave: null as number | null,
  status_id: null as number | null,
  effective_start_date: "",
  effective_end_date: "",
  join_date: "",
});

// ── Validation rules ─────────────────────────────────────────────────────────
const rules = {
  required: (v: unknown) => !!v || "Wajib diisi",
  email: (v: string) => /.+@.+\..+/.test(v) || "Format email tidak valid",
  imageSize: (v: File | File[]) => {
    if (!v) return true;
    const file = Array.isArray(v) ? v[0] : v;
    if (!file) return true;
    return file.size <= 2 * 1024 * 1024 || "Ukuran file maksimal 2MB";
  },
};

// ── Dropdown options (replace with your actual API calls / stores) ───────────

const employeeStatusOptions = [
  { label: "Kontrak", value: 1 },
  { label: "Tetap", value: 2 },
  { label: "Resign", value: 3 },
  { label: "Dikeluarkan", value: 4 },
  { label: "Pensiun", value: 5 },
];

// TODO: replace with data from your store / API
const branchOptions = ref<{ id: number; name: string }[]>([]);
const provinceOptions = ref<{ id: number; name: string }[]>([]);
const regencyOptions = ref<{ id: number; name: string }[]>([]);
const districtOptions = ref<{ id: number; name: string }[]>([]);
const villageOptions = ref<{ id: number; name: string }[]>([]);

// ── Cascading address handlers ────────────────────────────────────────────────
function onProvinceChange() {
  form.regency_id = null;
  form.district_id = null;
  form.village_id = null;
  regencyOptions.value = [];
  districtOptions.value = [];
  villageOptions.value = [];
  // TODO: fetch regencies by province_id
}

function onRegencyChange() {
  form.district_id = null;
  form.village_id = null;
  districtOptions.value = [];
  villageOptions.value = [];
  // TODO: fetch districts by regency_id
}

function onDistrictChange() {
  form.village_id = null;
  villageOptions.value = [];
  // TODO: fetch villages by district_id
}

// ── Image preview ────────────────────────────────────────────────────────────
function onImageChange(files: File | File[]) {
  const file = Array.isArray(files) ? files[0] : files;
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  } else {
    imagePreview.value = null;
  }
}

// ── Populate form from store ─────────────────────────────────────────────────
function populateForm() {
  const u = userStore.usersSelected;
  if (!u) return;
  form.nik = u.nik ?? "";
  form.name = u.name ?? "";
  form.hrd_master_education_id = u.education?.id ?? null;
  form.front_title = u.front_title ?? "";
  form.back_title = u.back_title ?? "";
  form.phone_number = u.phone_number ?? "";
  form.email = u.email ?? "";
  form.gender = u.gender;
  form.hrd_master_marital_status_id = u.marital_status?.id ?? null;
  form.hrd_master_blood_type_id = u.blood_type?.id ?? null;
  form.birth_place = u.birth_place ?? "";
  form.birth_date = u.birth_date ?? "";
  form.hrd_master_religion_id = u.religion?.id ?? null;
  form.bpjs_health_number = u.bpjs_health_number ?? "";
  form.bpjs_employment_number = u.bpjs_employment_number ?? "";
  form.number_of_children = u.number_of_children ?? null;
  form.emergency_phone_number = u.emergency_phone_number ?? "";
  form.emergency_contact_name = u.emergency_contact_name ?? "";
  form.address_id_card = u.address_id_card ? String(u.address_id_card) : "";
  form.master_area_province_id = u.province?.id ?? null;
  form.regency_id = u.regency?.id ?? null;
  form.district_id = u.disctrict?.id ?? null; // note: typo in original "disctrict"
  form.village_id = u.village?.id ?? null;
  form.neighborhood_unit = u.neighborhood_unit ?? "";
  form.community_unit = u.community_unit ?? "";
  form.current_address = u.current_address ?? "";
  form.zip_code = u.zip_code ?? "";
  form.position = u.position?.name ?? "";
  form.branch_id = u.branch?.id ?? null;
  form.remaining_leave = u.remaining_leave ?? null;
  form.status_id = u.status_id ?? null;
  form.effective_start_date = u.effective_start_date ?? "";
  form.effective_end_date = u.effective_end_date ?? "";
  form.join_date = u.join_date ?? "";
}
const emit = defineEmits<{
  cancel: [];
  saved: [];
}>();

// ── Submit ────────────────────────────────────────────────────────────────────
async function handleSubmit() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  isSaving.value = true;
  try {
    // await userStore.updateUser(...)
    emit("saved"); // ← emit ke parent
  } finally {
    isSaving.value = false;
  }
}

// ── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  await Promise.all([
    provinceStore.fetchProvince(),
    educationStore.fetchEducationData(),
    maritalStatusStore.fetchMaritalStatusData(),
    bloodTypeStore.fetchBloodTypeData(),
    religionStore.fetchReligionData(),
  ]);
  console.log("listProvince:", listProvince.value);
  console.log("form.master_area_province_id:", form.master_area_province_id);
  console.log("type of id:", typeof form.master_area_province_id);
  console.log("type of value in list:", typeof listProvince.value[0]?.value);

  populateForm();
});
</script>
