<template>
  <v-data-table-server
    :headers="headers as any"
    :items="leaveRequest"
    :items-length="leaveRequestStore.totalRecords"
    :items-per-page="leaveRequestStore.params.length"
    :loading="leaveRequestStore.isLoading"
    class="elevation-1 custom-header-table"
    @update:options="onTableOptionsChange"
  >
    <template #[`item.no`]="{ index }">
      {{ (leaveRequestStore.params.start ?? 0) + index + 1 }}
    </template>
    <template #[`item.code`]="{ item }">
      <span class="font-bold">{{ item.code }}</span>
    </template>
    <template #[`item.is_full_day`]="{ item }">
      <div
        class="font-bold text-sm inline-block px-2 py-0.5 rounded w-fit"
        :class="statusYesOrNoColor(item.is_full_day)"
      >
        {{ statusYesOrNoLabel(item.is_full_day) }}
      </div>
    </template>
    <template #[`item.max_hour`]="{ item }">
      {{ item.max_hour ?? "-" }}
    </template>
    <template #[`item.max_day`]="{ item }">
      {{ item.max_day ?? "-" }}
    </template>
    <template #[`item.file_upload`]="{ item }">
      <div
        class="font-bold text-sm inline-block px-2 py-0.5 rounded w-fit"
        :class="statusYesOrNoColor(item.file_upload)"
      >
        {{ statusYesOrNoLabel(item.file_upload) }}
      </div>
    </template>
    <template #[`item.deduct_leave`]="{ item }">
      <div
        class="font-bold text-sm inline-block px-2 py-0.5 rounded w-fit"
        :class="statusYesOrNoColor(item.deduct_leave)"
      >
        {{ statusYesOrNoLabel(item.deduct_leave) }}
      </div>
    </template>

    <template #[`item.actions`]="{ item }">
      <div class="flex justify-end items-center gap-1">
        <v-btn
          icon="mdi-file-edit-outline"
          variant="text"
          density="comfortable"
          class="!text-amber-600 hover:!bg-amber-50 transition-all duration-300"
          @click="handleEdit(item)"
        />

        <v-btn
          v-if="item.can_delete"
          icon="mdi-delete-outline"
          variant="text"
          density="comfortable"
          @click="handleDelete(item.id)"
          :loading="leaveRequestStore.isLoadingDestroy"
          class="!text-red-500 hover:!bg-red-50 transition-all duration-300"
        />
      </div>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useLeaveRequestStore } from "@/stores/leave-request.store";

const leaveRequestStore = useLeaveRequestStore();
const leaveRequest = computed(() => leaveRequestStore.leaveRequest);

const props = defineProps<{
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  ask: (options: any) => Promise<boolean>;
}>();

const emit = defineEmits(["edit"]);

const headers = [
  { title: "No", key: "no", sortable: false, width: "60px" },
  { title: "Nama", key: "user_name", sortable: false },
  { title: "Jenis", key: "leave_type_name", sortable: false },
  { title: "Tanggal Pengajuan", key: "created_at", sortable: false },
  { title: "Max Izin (Jam)", key: "max_hour", sortable: false },
  { title: "Max Izin (Hari)", key: "max_day", sortable: false },
  { title: "Back Date", key: "back_date", sortable: false },
  { title: "File Upload", key: "file_upload", sortable: false },
  { title: "Mengurangi Cuti", key: "deduct_leave", sortable: false },
  { title: "Aksi", key: "actions", sortable: false, align: "end" },
];

function onTableOptionsChange(options: { page: number; itemsPerPage: number }) {
  leaveRequestStore.params.length = options.itemsPerPage;
  leaveRequestStore.params.start = (options.page - 1) * options.itemsPerPage;
  leaveRequestStore.fetchLeaveRequest();
}

function handleEdit(item: any) {
  emit("edit", item);
}

async function handleDelete(id: number) {
  const confirmed = await props.ask({
    title: "Hapus Pengajuan Izin",
    message: "Data ini akan dihapus. Lanjutkan?",
    confirmText: "Ya, Hapus",
    color: "red-darken-1",
  });
  if (confirmed) deleteWorkExperience(id);
}

async function deleteWorkExperience(id: number) {
  try {
    // await leaveRequestStore.destroyLeaveType(id);
    props.showSuccess("Data jenis izin berhasil dihapus.");
  } catch (err: any) {
    props.showError(err?.message ?? "Gagal menghapus data jenis izin.");
  }
}

onMounted(() => leaveRequestStore.fetchLeaveRequest());
</script>
<style scoped>
/* Gunakan deep selector agar tembus ke dalam komponen Vuetify */
:deep(.custom-header-table thead) {
  background-color: #e3f2fd; /* Blue lighten-5 (sangat lembut) */
}

/* Penyesuaian untuk Dark Theme */
:deep(.v-theme--dark .custom-header-table thead) {
  background-color: #1a237e; /* Biru gelap yang lembut untuk mata */
}

:deep(.custom-header-table thead th) {
  font-weight: bold !important;
  /* Jika ingin warna teks biru tua di light mode */
  color: #1976d2 !important;
}

:deep(.v-theme--dark .custom-header-table thead th) {
  color: #bbdefb !important;
}
</style>
