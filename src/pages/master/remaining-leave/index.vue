<template>
  <div class="space-y-5">
    <!-- ───── Snackbar Error ───── -->
    <v-snackbar
      v-model="showErrorSnackbar"
      color="bg-red-600"
      elevation="0"
      location="top"
      timeout="4000"
      rounded="lg"
    >
      <div class="d-flex align-center gap-3">
        <v-icon icon="mdi-alert-circle-outline" size="20" />
        <span class="text-sm font-medium">{{ snackbarMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          icon="mdi-close"
          size="small"
          @click="showErrorSnackbar = false"
        />
      </template>
    </v-snackbar>

    <!-- ───── Snackbar Success ───── -->
    <v-snackbar
      v-model="showSuccessSnackbar"
      color="bg-emerald-600"
      elevation="0"
      location="top"
      timeout="4000"
      rounded="lg"
    >
      <div class="d-flex align-center gap-3">
        <v-icon icon="mdi-check-circle-outline" size="20" />
        <span class="text-sm font-medium">{{ successMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          icon="mdi-close"
          size="small"
          @click="showSuccessSnackbar = false"
        />
      </template>
    </v-snackbar>
    <!-- ───── Snackbar Partial Error (beberapa user gagal) ───── -->
    <v-snackbar
      v-model="showPartialErrorSnackbar"
      color="#E65100"
      elevation="0"
      location="top"
      timeout="-1"
      rounded="lg"
    >
      <div class="d-flex align-center gap-3">
        <v-icon icon="mdi-alert-outline" size="20" />
        <span class="text-sm font-medium">{{ partialErrorMessage }}</span>
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          size="small"
          @click="
            showPartialErrorSnackbar = false;
            showPartialErrorDialog = true;
          "
        >
          Lihat Detail
        </v-btn>
        <v-btn
          variant="text"
          icon="mdi-close"
          size="small"
          @click="showPartialErrorSnackbar = false"
        />
      </template>
    </v-snackbar>

    <!-- ───── Dialog Detail Partial Error ───── -->
    <v-dialog v-model="showPartialErrorDialog" max-width="500" scrollable>
      <v-card rounded="lg">
        <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
          <v-icon
            icon="mdi-alert-circle-outline"
            color="warning"
            size="small"
          />
          <span class="text-base font-bold"
            >Beberapa User Gagal Diperbarui</span
          >
          <v-spacer />
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="showPartialErrorDialog = false"
          />
        </v-card-title>

        <v-card-text class="px-6 pb-4">
          <p class="text-sm text-gray-500 mb-3">
            User berikut tidak berhasil diperbarui karena validasi saldo:
          </p>
          <v-list density="compact" rounded="lg" border>
            <template v-for="(err, index) in partialErrors" :key="err.user_id">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon
                    icon="mdi-account-alert-outline"
                    color="warning"
                    size="20"
                  />
                </template>
                <v-list-item-title class="text-sm font-medium">
                  {{ err.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-xs">
                  {{ err.message }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-divider v-if="index < partialErrors.length - 1" />
            </template>
          </v-list>
        </v-card-text>

        <v-card-actions class="px-6 pb-5">
          <v-spacer />
          <v-btn variant="tonal" @click="showPartialErrorDialog = false"
            >Tutup</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <header-remaining-leave
      @add="formRef.openDialog('add')"
      @subtract="formRef.openDialog('subtract')"
      @reset="formRef.openDialog('reset')"
    />
    <table-remaining-leave />
    <form-add-edit-reset-balance
      ref="formRef"
      :show-error="showError"
      :show-success="showSuccess"
      :show-partial-error="showPartialError"
    />
  </div>
</template>

<script setup lang="ts">
import type { RemainingLeaveSettingError } from "@/api/modules/remainig-leave.api";
import FormAddEditResetBalance from "@/components/remaining-leave/FormAddEditResetBalance.vue";
import HeaderRemainingLeave from "@/components/remaining-leave/HeaderRemainingLeave.vue";
import TableRemainingLeave from "@/components/remaining-leave/TableRemainingLeave.vue";

import { ref } from "vue";

// snackbar existing
const showErrorSnackbar = ref(false);
const snackbarMessage = ref("");
const showSuccessSnackbar = ref(false);
const successMessage = ref("");

// snackbar & dialog partial error
const showPartialErrorSnackbar = ref(false);
const showPartialErrorDialog = ref(false);
const partialErrorMessage = ref("");
const partialErrors = ref<RemainingLeaveSettingError[]>([]);

const formRef = ref();

function showSuccess(msg: string) {
  successMessage.value = msg;
  showSuccessSnackbar.value = true;
}

function showError(msg: string) {
  console.log(msg);
  snackbarMessage.value = msg;
  showErrorSnackbar.value = true;
}
function showPartialError(msg: string, errors: RemainingLeaveSettingError[]) {
  console.log(msg);
  partialErrorMessage.value = msg;
  partialErrors.value = errors;
  showPartialErrorSnackbar.value = true;
}
</script>
