<template>
  <div class="space-y-5">
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

    <header-leave-type @add="handleAdd" />
    <table-leave-type
      @edit="handleEdit"
      :show-error="showError"
      :show-success="showSuccess"
      :ask="ask"
    />
    <form-dialog-leave-type
      ref="formDialogRef"
      :show-error="showError"
      :show-success="showSuccess"
    />
  </div>
</template>
<script setup lang="ts">
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import FormDialogLeaveType from "@/components/leave-type/FormDialogLeaveType.vue";
import HeaderLeaveType from "@/components/leave-type/HeaderLeaveType.vue";
import TableLeaveType from "@/components/leave-type/TableLeaveType.vue";
import { useConfirmDialog } from "@/composables/useConfirmDialog";

import { ref } from "vue";

const { ask } = useConfirmDialog();
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

function handleAdd() {
  formDialogRef.value.openAddDialog();
}
function handleEdit(item: any) {
  formDialogRef.value.openEditDialog(item);
}
</script>
