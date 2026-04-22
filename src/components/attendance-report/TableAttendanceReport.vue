<template>
  <v-data-table-server
    :headers="headers as any"
    :items="employee"
    :items-length="employeeAttendanceStore.totalRecords"
    :items-per-page="employeeAttendanceStore.params.length"
    :loading="employeeAttendanceStore.isLoading"
    class="elevation-1 custom-header-table"
    @update:options="onTableOptionsChange"
  >
    <template #[`item.no`]="{ index }">
      {{ (employeeAttendanceStore.params.start ?? 0) + index + 1 }}
    </template>

    <template #[`item.created_at`]="{ item }">
      {{ toFullDateWithDay(item.created_at) }}
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { useDateFormatter } from "@/composables/UseDateFormatter";
import { useEmployeeAttendanceRequestStore } from "@/stores/employee-attendance.store";
import { computed } from "vue";

const employeeAttendanceStore = useEmployeeAttendanceRequestStore();
const employee = computed(() => employeeAttendanceStore.employeeAttendance);
const { toFullDateWithDay } = useDateFormatter();

const headers = [
  { title: "No", key: "no", sortable: false, align: "center" },
  { title: "Tanggal", key: "created_at", sortable: false },
  { title: "Nama", key: "user_name", sortable: false },
  { title: "Cabang", key: "branch_name", sortable: false },
  { title: "Kode", key: "code", sortable: false },
  { title: "Absen Masuk", key: "time_in", sortable: false },
  { title: "Foto Masuk", key: "image_in", sortable: false },
  { title: "Absen Pulang", key: "time_out", sortable: false },
  { title: "Foto Pulang", key: "image_out", sortable: false },
  { title: "Aksi", key: "actions", sortable: false, align: "end" },
];

function onTableOptionsChange(options: { page: number; itemsPerPage: number }) {
  employeeAttendanceStore.params.length = options.itemsPerPage;
  employeeAttendanceStore.params.start =
    (options.page - 1) * options.itemsPerPage;
  employeeAttendanceStore.fetchOvertimeRequest();
}
</script>

<style scoped>
/* Gunakan deep selector agar tembus ke dalam komponen Vuetify */
:deep(.v-data-table__thead) {
  background-color: #e3f2fd;
}

/* Penyesuaian untuk Dark Theme */
:deep(.v-theme--dark thead.v-data-table__thead) {
  background-color: #1a237e; /* Biru gelap yang lembut untuk mata */
}

:deep(thead.v-data-table__thead th) {
  font-weight: bold !important;
  /* Jika ingin warna teks biru tua di light mode */
  color: #1976d2 !important;
}

:deep(.v-theme--dark thead.v-data-table__thead th) {
  color: #bbdefb !important;
}
</style>
