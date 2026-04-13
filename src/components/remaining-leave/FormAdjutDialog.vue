<template>
  <v-dialog v-model="dialog" max-width="700" scrollable>
    <v-card rounded="lg">
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon icon="mdi-tune-variant" color="primary" size="small"></v-icon>
        <span class="text-base font-bold">
          {{ "Sesuaikan Data " }}
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
            <v-col cols="12">
              <v-select
                id="change"
                variant="outlined"
                density="compact"
                hide-details="auto"
                v-model="form.change"
                :rules="[rules.required]"
                :items="[
                  { title: 'Penambahan', value: '+' },
                  { title: 'Pengurangan', value: '-' },
                ]"
                :error-messages="serverErrors.change"
                clearable
              >
                <template v-slot:label>
                  Penambahan/Pengurangan<span class="text-red-500">*</span>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                id="amount"
                type="number"
                v-model="form.amount"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :rules="[rules.required]"
                :error-messages="serverErrors.amount"
              >
                <template v-slot:label>
                  Jumlah Saldo<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                id="notes"
                v-model="form.notes"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :rules="[rules.required]"
                :error-messages="serverErrors.notes"
              >
                <template v-slot:label>
                  Keterangan<span class="text-red-500">*</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="px-6 py-4 gap-2 justify-end">
        <v-btn variant="outlined" @click="closeDialog">Batal</v-btn>
        <v-btn
          color="bg-blue-300 dark:bg-blue-500"
          variant="flat"
          prepend-icon="mdi-content-save"
          :loading="remainingLeaveStore.isLoadingAdjustmant"
          @click="submitForm"
        >
          {{ "Simpan Perubahan" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useRemainingLeaveStore } from "@/stores/remaining-leave.store";
import { useUserStore } from "@/stores/user.store";
import { reactive, ref } from "vue";

const props = defineProps<{
  userId: number;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}>();

const remainingLeaveStore = useRemainingLeaveStore();
const userStore = useUserStore();
const rules = {
  required: (v: any) =>
    (v !== null && v !== undefined && v !== "") || "Wajib diisi",
};

async function submitForm() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  Object.keys(serverErrors).forEach((key) => delete serverErrors[key]);

  try {
    await remainingLeaveStore.storeAdjustment({
      user_id: props.userId,
      change: form.change as "+" | "-",
      amount: form.amount,
      notes: form.notes,
    });

    props.showSuccess("Data berhasil ditambahkan.");
    userStore.userSelectedParams.id = props.userId.toString();
    remainingLeaveStore.fetchRemainingLeaveDetail(props.userId);
    userStore.fetchUsersSelected();
    closeDialog();
  } catch (err: any) {
    handleServerErrors(err);
  }
}

function handleServerErrors(err: any) {
  if (err?.status === 422) {
    props.showError(err?.message ?? "Terjadi kesalahan, coba lagi.");
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

const defaultForm = () => ({
  change: "+",
  amount: 0 as number,
  notes: "",
});

const form = reactive(defaultForm());

const dialog = ref(false);
const formRef = ref();
const serverErrors = reactive<Record<string, string>>({});

function openAddDialog() {
  Object.assign(form, defaultForm());
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
  formRef.value?.reset();
  Object.keys(serverErrors).forEach((key) => delete serverErrors[key]);
}

defineExpose({
  openAddDialog,
});
</script>
