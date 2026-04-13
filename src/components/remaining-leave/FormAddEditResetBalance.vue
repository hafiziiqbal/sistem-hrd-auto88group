<template>
  <v-dialog v-model="dialog" max-width="700" scrollable persistent>
    <v-card rounded="lg">
      <!-- HEADER -->
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon icon="mdi-tune-variant" color="primary" size="small" />
        <span class="text-base font-bold">
          {{ title }}
        </span>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="closeDialog"
        />
      </v-card-title>

      <!-- BODY -->
      <v-card-text class="px-6 pb-2">
        <v-form ref="formRef">
          <v-row>
            <!-- AMOUNT -->
            <v-col cols="12">
              <v-text-field
                type="number"
                variant="outlined"
                density="compact"
                hide-details="auto"
                v-model="form.amount"
                :rules="[rules.required]"
                :error-messages="serverErrors.amount"
              >
                <template v-slot:label>
                  Jumlah<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Catatan"
                v-model="form.notes"
                rows="4"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :error-messages="serverErrors.notes"
              >
                <template v-slot:label>
                  Keterangan<span class="text-red-500">*</span>
                </template>
              </v-textarea>
            </v-col>

            <!-- FOR -->
            <v-col cols="12">
              <v-select
                variant="outlined"
                density="compact"
                hide-details="auto"
                v-model="form.for"
                :items="forOptions"
                item-title="label"
                item-value="value"
                :rules="[rules.required]"
                :error-messages="serverErrors.for"
                @update:model-value="onForChange"
              >
                <template v-slot:label>
                  Target<span class="text-red-500">*</span>
                </template>
              </v-select>
            </v-col>

            <!-- FOR ID (conditional) -->
            <v-col cols="12" v-if="form.for == 'branch'">
              <v-autocomplete
                v-model="form.for_id"
                :items="listBranch"
                :loading="branchStore.isLoadingData"
                prepend-inner-icon="mdi-map-marker-outline"
                item-title="alias"
                item-value="value"
                placeholder="Pilih cabang"
                variant="outlined"
                density="compact"
                color="primary"
                class="custom-input"
                hide-details="auto"
                clearable
                no-filter
                @update:search="onSearchBranch"
                :rules="[rules.required]"
                :error-messages="serverErrors.for_id"
              >
                <template v-slot:label>
                  Cabang <span class="text-red-500">*</span>
                </template>
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item.alias"
                    :subtitle="item.title"
                  >
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" v-if="form.for == 'user'">
              <v-autocomplete
                v-model="form.for_id"
                :items="listUser"
                :loading="userStore.isLoadingData"
                item-title="name"
                item-value="value"
                prepend-inner-icon="mdi-account"
                placeholder="Cari nama..."
                variant="outlined"
                density="compact"
                color="primary"
                class="custom-input"
                hide-details="auto"
                clearable
                no-filter
                @update:search="onSearchUser"
                :error-messages="serverErrors.for_id"
                :rules="[rules.required]"
              >
                <template v-slot:label>
                  Karyawan <span class="text-red-500">*</span>
                </template>
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="formatName(item)"
                    :subtitle="item.email"
                  />
                </template>
                <template v-slot:selection="{ item }">
                  {{ formatName(item) }}
                </template>
              </v-autocomplete>
            </v-col>

            <!-- NOTES -->
          </v-row>
        </v-form>
      </v-card-text>

      <!-- FOOTER -->
      <v-card-actions class="px-6 pb-5">
        <v-spacer />
        <v-btn
          color="text-blue-700"
          variant="tonal"
          :loading="remainingLeaveStore.isLoadingSetting"
          @click="submit"
        >
          Simpan
        </v-btn>
        <v-btn
          variant="tonal"
          :disabled="remainingLeaveStore.isLoadingSetting"
          @click="closeDialog"
        >
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type {
  RemainingLeaveSettingError,
  RemainingLeaveSettingPayload,
} from "@/api/modules/remainig-leave.api";
import { useDebounceFn } from "@/composables/UseDebounce";
import { useFormatName } from "@/composables/useFormatName";
import { useBranchStore } from "@/stores/branch.store";
import { useRemainingLeaveStore } from "@/stores/remaining-leave.store";
import { useUserStore } from "@/stores/user.store";
import { reactive, ref, computed, onMounted } from "vue";

const { formatName } = useFormatName();

const remainingLeaveStore = useRemainingLeaveStore();
const branchStore = useBranchStore();
const dialog = ref(false);
const formRef = ref();
const serverErrors = reactive<Record<string, string>>({});
const userStore = useUserStore();

const isSelectingUser = ref(false);
const selectedUserText = ref<string>("");
const searchBranch = ref("");

const listBranch = computed(() => {
  const keyword = searchBranch.value.toLowerCase();
  return branchStore.branchData
    .filter((b) =>
      keyword
        ? b.name.toLowerCase().includes(keyword) ||
          b.alias.toLowerCase().includes(keyword)
        : true,
    )
    .map((b) => ({ title: b.name, alias: b.alias, value: b.id }));
});

const listUser = computed(() =>
  userStore.usersData.map((u) => ({
    value: u.id,
    name: u.name,
    full_name: u.full_name,
    email: u.email,
  })),
);

const onSearchUser = useDebounceFn(async (val: string) => {
  if (isSelectingUser.value) return;
  if (val === selectedUserText.value) return;
  userStore.usersData = await userStore.fetchUsersDataWithParams({
    search: val ?? "",
  });
}, 400);

function onForChange(val: any) {
  form.for_id = undefined;
}

const onSearchBranch = (val: any) => {
  searchBranch.value = val ?? "";
};

const props = defineProps<{
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showPartialError: (
    message: string,
    errors: RemainingLeaveSettingError[],
  ) => void;
}>();

const emit = defineEmits(["submit"]);

// ================= FORM =================
const defaultForm = () => ({
  change: undefined as "add" | "subtract" | "reset" | undefined,
  amount: 0 as number,
  notes: undefined,
  for: undefined as "all" | "branch" | "user" | undefined,
  for_id: undefined as number | undefined,
});

const form = reactive(defaultForm());

// ================= OPTIONS =================
const changeOptions = [
  { label: "Tambah", value: "add" },
  { label: "Kurangi", value: "subtract" },
  { label: "Reset", value: "reset" },
];

const forOptions = [
  { label: "Semua Karyawan", value: "all" },
  { label: "Cabang", value: "branch" },
  { label: "Karyawan Tertentu", value: "user" },
];

// ================= TITLE =================
const title = computed(() => {
  if (form.change === "add") return "Tambah Saldo Cuti";
  if (form.change === "subtract") return "Kurangi Saldo Cuti";
  if (form.change === "reset") return "Reset Saldo Cuti";
  return "Sesuaikan Saldo Cuti";
});

// ================= VALIDATION =================
const rules = {
  required: (v: any) =>
    (v !== null && v !== undefined && v !== "") || "Wajib diisi",
};

// ================= METHODS =================
function closeDialog() {
  userStore.usersSelected = null;
  userStore.userDataParams.search = "";
  userStore.userDataParams.is_less_than_one_year = undefined;
  userStore.fetchUsersData();
  dialog.value = false;
  formRef.value?.reset();
  Object.keys(serverErrors).forEach((key) => delete serverErrors[key]);
}

function openDialog(type?: "add" | "subtract" | "reset") {
  userStore.usersSelected = null;
  userStore.userDataParams.is_less_than_one_year = 1;
  userStore.userDataParams.search = "";
  userStore.fetchUsersData();
  Object.assign(form, defaultForm());
  if (type) form.change = type;
  dialog.value = true;
}

async function submit() {
  const { valid } = await formRef.value?.validate();
  if (!valid) return;

  try {
    const payload: RemainingLeaveSettingPayload = {
      change: form.change!,
      amount: Number(form.amount),
      notes: form.notes!,
      for: form.for!,
      ...(form.for !== "all" && { for_id: form.for_id }),
    };

    const response = await remainingLeaveStore.storeSetting(payload);

    if (response.success) {
      props.showSuccess(response.message ?? "Berhasil disimpan");
      emit("submit");
      closeDialog();
    } else if (response.errors?.length) {
      // Partial: sebagian user gagal — dialog tidak ditutup
      props.showPartialError(
        response.message ?? "Beberapa user gagal diperbarui",
        response.errors,
      );
    } else {
      props.showError(response.message ?? "Terjadi kesalahan");
    }
  } catch (e: any) {
    const status = e.status;

    if (status === 422) {
      const data = e;

      // Cek apakah ada errors field (validasi per field)
      if (data.errors && Object.keys(data.errors).length > 0) {
        Object.keys(data.errors).forEach((key) => {
          serverErrors[key] = Array.isArray(data.errors[key])
            ? data.errors[key][0]
            : data.errors[key];
        });
      } else {
        // Pesan umum 422 seperti "Jumlah cuti tidak boleh lebih dari 12."
        props.showError(data.message ?? "Permintaan tidak valid.");
      }
    } else if (status === 404) {
      props.showError(e.message ?? "Tidak ada user yang ditemukan");
    } else if (status === 406) {
      if (e.errors?.length) {
        // Partial: sebagian user gagal — dialog tidak ditutup
        props.showPartialError(
          e.message ?? "Beberapa user gagal diperbarui",
          e.errors,
        );
      }
    } else if (status === 500) {
      props.showError("Terjadi kesalahan pada server. Silakan coba lagi.");
    } else {
      props.showError("Terjadi kesalahan. Periksa koneksi kamu.");
    }
  }
}

defineExpose({
  openDialog,
});

onMounted(async () => {
  branchStore.fetchBranchData();
});
</script>
