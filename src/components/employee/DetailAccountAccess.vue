<template>
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
  <div class="flex flex-col gap-5 p-3">
    <v-card variant="flat" border class="mx-auto w-full rounded-lg">
      <v-card-item class="bg-gray-100 dark:bg-gray-800">
        <div class="flex items-center justify-between">
          <v-card-title class="text-base font-bold flex items-center gap-2">
            <v-icon
              icon="mdi-account-key"
              color="primary"
              size="small"
            ></v-icon>
            Data Akun
          </v-card-title>
          <div class="flex gap-2">
            <v-btn
              icon="mdi-pencil"
              variant="text"
              color="text-amber-500"
              size="small"
              @click="openDialog"
            ></v-btn>
          </div>
        </div>
      </v-card-item>

      <v-divider></v-divider>

      <v-card-text class="p-4">
        <v-row>
          <v-col cols="12" md="6">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300">
                Kata Sandi
              </span>
              <span class="font-bold text-sm">*******</span>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300">
                Lokasi Presensi
              </span>
              <span class="font-bold text-sm">
                {{ userStore.usersSelected?.location_presensi?.name }}
              </span>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300">
                Kunci Perangkat (Absensi)
              </span>
              <div
                class="font-bold text-sm inline-block px-2 py-0.5 rounded w-fit"
                :class="
                  statusYesOrNoColor(
                    userStore.usersSelected?.lock_device_attendance ?? 0,
                  )
                "
              >
                {{
                  statusYesOrNoLabel(
                    userStore.usersSelected?.lock_device_attendance ?? 0,
                  )
                }}
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300">
                ID Perangkat
              </span>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm">
                  {{ userStore.usersSelected?.device_id ? "*******" : "-" }}
                </span>

                <v-btn
                  v-if="userStore.usersSelected?.device_id"
                  variant="text"
                  color="text-amber-700 dark:text-amber-500"
                  size="small"
                  density="compact"
                  class="text-none"
                  :loading="userStore.isLoadingDeviceId"
                  @click="resetDeviceId"
                >
                  <v-icon start icon="mdi-reload" size="16"></v-icon>
                  Reset
                </v-btn>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300">
                Kunci Wajah (Absensi)
              </span>
              <div
                class="font-bold text-sm inline-block px-2 py-0.5 rounded w-fit"
                :class="
                  statusYesOrNoColor(
                    userStore.usersSelected?.lock_face_attendance ?? 0,
                  )
                "
              >
                {{
                  statusYesOrNoLabel(
                    userStore.usersSelected?.lock_face_attendance ?? 0,
                  )
                }}
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm dark:text-gray-300">
                ID Wajah
              </span>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm">
                  {{ userStore.usersSelected?.face_id ? "*******" : "-" }}
                </span>
                <v-btn
                  v-if="userStore.usersSelected?.face_id"
                  variant="text"
                  color="text-amber-700 dark:text-amber-500"
                  size="small"
                  density="compact"
                  class="text-none"
                  :loading="userStore.isLoadingFaceId"
                  @click="resetFaceId"
                >
                  <v-icon start icon="mdi-reload" size="16"></v-icon>
                  Reset
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>

  <v-dialog v-model="dialog" max-width="500">
    <v-card rounded="lg">
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon icon="mdi-pencil" color="primary" size="small"></v-icon>
        <span class="text-base font-bold">Edit Akses Akun</span>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="dialog = false"
        ></v-btn>
      </v-card-title>

      <v-card-text>
        <v-row class="gy-4">
          <v-col cols="12">
            <v-text-field
              v-model="form.password"
              type="password"
              variant="outlined"
              hide-details="auto"
              density="compact"
              :rules="[rules.password]"
              :error-messages="serverErrors.password"
            >
              <template v-slot:label>
                Kata Sandi<span class="text-red-500">*</span>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-autocomplete
              v-model="form.location_presensi_id"
              :items="listAttendanceLocation"
              :loading="attendanceLocationStore.isLoadingData"
              prepend-inner-icon="mdi-map-marker-outline"
              item-title="title"
              item-value="value"
              placeholder="Pilih lokasi absen"
              variant="outlined"
              density="compact"
              color="primary"
              class="custom-input"
              hide-details="auto"
              clearable
              no-filter
              @update:search="onSearchAttendanceLocation"
              :rules="[rules.required]"
              :error-messages="serverErrors.location_presensi_id"
            >
              <template v-slot:label>
                Lokasi Absen<span class="text-red-500">*</span>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="form.lock_device_attendance"
              :items="yesNoOptions"
              variant="outlined"
              density="compact"
              hide-details="auto"
              :rules="[rules.required]"
              :error-messages="serverErrors.lock_device_attendance"
            >
              <template v-slot:label>
                Kunci Perangkat (Absensi)<span class="text-red-500">*</span>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="form.lock_face_attendance"
              :items="yesNoOptions"
              variant="outlined"
              density="compact"
              hide-details="auto"
              :rules="[rules.required]"
              :error-messages="serverErrors.lock_face_attendance"
            >
              <template v-slot:label>
                Kunci Wajah (Absensi)<span class="text-red-500">*</span>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end px-6 pb-4">
        <v-btn variant="text" @click="dialog = false">Batal</v-btn>
        <v-btn
          color="bg-indigo-300 dark:bg-indigo-500"
          variant="flat"
          @click="submit"
          >Simpan</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useYesOrNoStatus } from "@/composables/UseYesOrNoStatus";
import { useAttendanceLocationStore } from "@/stores/attendance-location.store";
import { useUserStore } from "@/stores/user.store";
import { computed, onMounted, reactive, ref } from "vue";

const serverErrors = reactive<Record<string, string>>({});
const attendanceLocationStore = useAttendanceLocationStore();
const userStore = useUserStore();
const { statusYesOrNoLabel, statusYesOrNoColor } = useYesOrNoStatus();

const searchAttendanceLocation = ref("");

const listAttendanceLocation = computed(() => {
  const keyword = searchAttendanceLocation.value.toLowerCase();
  return attendanceLocationStore.attendanceLocationData
    .filter((b) => (keyword ? b.name.toLowerCase().includes(keyword) : true))
    .map((b) => ({ title: b.name, value: b.id }));
});

const onSearchAttendanceLocation = (val: any) => {
  searchAttendanceLocation.value = val ?? "";
};

const rules = {
  required: (v: any) =>
    (v !== null && v !== undefined && v !== "") || "Wajib diisi",
  password: (v: string) => v.length >= 6 || "Password minimal 6 karakter",
};

const dialog = ref(false);

const form = reactive({
  id: 0,
  password: "",
  location_presensi_id: 0,
  lock_device_attendance: 0,
  lock_face_attendance: 0,
});

const yesNoOptions = [
  { title: "Ya", value: 1 },
  { title: "Tidak", value: 0 },
];

function openDialog() {
  const user = userStore.usersSelected;
  form.id = user?.id ?? 0;
  form.password = "";
  form.location_presensi_id = user?.location_presensi_id ?? 0;
  form.lock_device_attendance = user?.lock_device_attendance ?? 0;
  form.lock_face_attendance = user?.lock_face_attendance ?? 0;
  dialog.value = true;
}

async function submit() {
  try {
    let result = await userStore.updateAccountAccess(Number(form.id), form);
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message ?? "Gagal mengupdate user");
    }
    dialog.value = false;
  } catch (e) {
    showError("Gagal update data");
  }
}

async function resetFaceId() {
  try {
    let result = await userStore.resetFaceId(
      Number(userStore.usersSelected?.id),
    );
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message ?? "Gagal reset ID Wajah");
    }
    dialog.value = false;
  } catch (e) {
    showError("Gagal update data");
  }
}

async function resetDeviceId() {
  try {
    let result = await userStore.resetDeviceId(
      Number(userStore.usersSelected?.id),
    );
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message ?? "Gagal reset ID Perangkat");
    }
    dialog.value = false;
  } catch (e) {
    showError("Gagal update data");
  }
}

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

onMounted(async () => {
  attendanceLocationStore.fetchAttendanceLocationData();
});
</script>
