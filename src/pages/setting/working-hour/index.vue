<template>
  <div class="space-y-5">
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

    <header-working-hour />
    <table-working-hour
      @edit="handleEdit"
      :show-error="showError"
      :show-success="showSuccess"
    />
    <form-dialog-working-hour
      ref="formDialogRef"
      :show-error="showError"
      :show-success="showSuccess"
    />
  </div>
</template>
<script setup lang="ts">
import FormDialogWorkingHour from "@/components/working-hour/FormDialogWorkingHour.vue";
import HeaderWorkingHour from "@/components/working-hour/HeaderWorkingHour.vue";
import TableWorkingHour from "@/components/working-hour/TableWorkingHour.vue";

import { ref } from "vue";

const formDialogRef = ref();

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

function handleEdit(item: any) {
  formDialogRef.value.openEditDialog(item);
}
</script>
