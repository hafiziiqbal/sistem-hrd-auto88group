<template>
  <v-dialog v-model="dialog" max-width="900" scrollable>
    <v-card rounded="lg">
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon :icon="isEditMode ? 'mdi-pencil' : 'mdi-briefcase'" />
        <span class="text-base font-bold">
          {{ isEditMode ? "Edit Data" : "Tambah Data" }}
        </span>
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
      </v-card-title>

      <v-divider />

      <v-card-text class="p-4">
        <v-form ref="formRef">
          <v-row class="gy-4">
            <!-- CODE -->
            <v-col cols="12">
              <v-text-field
                v-model="form.code"
                density="compact"
                variant="outlined"
                hide-details="auto"
                :rules="[rules.required]"
                :error-messages="serverErrors.code"
              >
                <template v-slot:label>
                  Code<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <!-- LOOP HARI -->
            <v-col
              v-for="(day, index) in form.time"
              :key="day.dayCode"
              cols="12"
            >
              <v-card variant="flat" class="overflow-visible !bg-transparent">
                <div
                  class="group relative bg-white border border-slate-200 rounded-xl p-5 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                >
                  <div class="flex items-center gap-3 mb-5">
                    <div class="h-8 w-1.5 bg-blue-600 rounded-full"></div>
                    <span
                      class="text-sm font-bold uppercase tracking-wider text-slate-700"
                    >
                      {{ dayLabels[day.dayCode] }}
                    </span>
                  </div>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-menu
                        v-model="openTimeIn[index]"
                        :close-on-content-click="false"
                        transition="scale-transition"
                      >
                        <template #activator="{ props }">
                          <div class="space-y-1">
                            <label
                              class="text-xs font-semibold text-slate-500 ml-1"
                              >Jam Masuk
                              <span class="text-red-500">*</span></label
                            >
                            <v-text-field
                              v-model="day.time_in"
                              readonly
                              v-bind="props"
                              density="comfortable"
                              variant="outlined"
                              color="blue-darken-1"
                              :rules="[rules.required]"
                              hide-details="auto"
                              prepend-inner-icon="mdi-clock-outline"
                              class="rounded-lg shadow-sm"
                            />
                          </div>
                        </template>

                        <v-card class="rounded-xl elevation-12">
                          <v-time-picker
                            v-model="day.time_in"
                            format="24hr"
                            color="blue-darken-1"
                            @update:minute="openTimeIn[index] = false"
                          />
                        </v-card>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-menu
                        v-model="openTimeOut[index]"
                        :close-on-content-click="false"
                        transition="scale-transition"
                      >
                        <template #activator="{ props }">
                          <div class="space-y-1">
                            <label
                              class="text-xs font-semibold text-slate-500 ml-1"
                              >Jam Pulang
                              <span class="text-red-500">*</span></label
                            >
                            <v-text-field
                              v-model="day.time_out"
                              readonly
                              v-bind="props"
                              density="comfortable"
                              variant="outlined"
                              color="blue-darken-1"
                              :rules="[rules.required]"
                              hide-details="auto"
                              prepend-inner-icon="mdi-clock-check-outline"
                              class="rounded-lg shadow-sm"
                            />
                          </div>
                        </template>

                        <v-card class="rounded-xl elevation-12">
                          <v-time-picker
                            v-model="day.time_out"
                            format="24hr"
                            color="blue-darken-1"
                            @update:minute="openTimeOut[index] = false"
                          />
                        </v-card>
                      </v-menu>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-end">
        <v-btn variant="outlined" @click="closeDialog">Batal</v-btn>
        <v-btn
          color="primary"
          :loading="workingHourStore.isLoadingUpdate"
          @click="submitForm"
        >
          {{ isEditMode ? "Simpan" : "Tambah" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useShiftStore } from "@/stores/shift.store";
import {
  workingHourApi,
  type WorkingHourParams,
} from "@/api/modules/working-hour.api";
import { useWorkingHourStore } from "@/stores/working-hour.store";

const workingHourStore = useWorkingHourStore();

const props = defineProps<{
  showError: (msg: string) => void;
  showSuccess: (msg: string) => void;
}>();

// mapping hari
const dayLabels: Record<string, string> = {
  "1": "Senin",
  "2": "Selasa",
  "3": "Rabu",
  "4": "Kamis",
  "5": "Jumat",
  "6": "Sabtu",
  "7": "Minggu",
};

// default time 7 hari
const defaultTimes = () => [
  { dayCode: "1", time_in: "", time_out: "" },
  { dayCode: "2", time_in: "", time_out: "" },
  { dayCode: "3", time_in: "", time_out: "" },
  { dayCode: "4", time_in: "", time_out: "" },
  { dayCode: "5", time_in: "", time_out: "" },
  { dayCode: "6", time_in: "", time_out: "" },
  { dayCode: "7", time_in: "", time_out: "" },
];

const defaultForm = () => ({
  id: null as number | null,
  code: "",
  time: defaultTimes(),
});

const form = reactive(defaultForm());
const serverErrors = reactive<Record<string, string>>({});

const dialog = ref(false);
const isEditMode = ref(false);
const formRef = ref();

const openTimeIn = ref<boolean[]>(Array(7).fill(false));
const openTimeOut = ref<boolean[]>(Array(7).fill(false));

const rules = {
  required: (v: any) => !!v || "Wajib diisi",
};

// =========================
// OPEN ADD
// =========================
function openAddDialog() {
  isEditMode.value = false;
  Object.assign(form, defaultForm());
  dialog.value = true;
}

// =========================
// OPEN EDIT
// =========================
function openEditDialog(item: any) {
  isEditMode.value = true;

  Object.assign(form, {
    id: item.id,
    code: item.code,
    time: item.time.map((t: any) => ({
      dayCode: t.dayCode,
      time_in: t.time_in?.slice(0, 5) || "",
      time_out: t.time_out?.slice(0, 5) || "",
    })),
  });

  dialog.value = true;
}

// =========================
// SUBMIT
// =========================
async function submitForm() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  try {
    if (isEditMode.value) {
      const payload: WorkingHourParams = {
        code: form.code,
        time: JSON.stringify(form.time),
      };

      let result = await workingHourStore.updateWorkingHour(
        Number(form.id),
        payload,
      );
      if (result.success) {
        props.showSuccess(result.message || "Berhasil mengubah jam kerja");
      }
    }
  } catch (err: any) {
    props.showError(err?.message || "Error");
  } finally {
    closeDialog();
  }
}

// =========================
// CLOSE
// =========================
function closeDialog() {
  dialog.value = false;
  formRef.value?.reset();
  Object.keys(serverErrors).forEach((k) => delete serverErrors[k]);
}

// expose
defineExpose({
  openAddDialog,
  openEditDialog,
});
</script>
