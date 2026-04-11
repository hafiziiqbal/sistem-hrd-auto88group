<template>
  <div class="space-y-3">
    <v-data-table-server
      v-model:items-per-page="store.params.length"
      :headers="headers as any"
      :items="store.remainingLeave"
      :items-length="store.totalRecords"
      :loading="store.isLoading"
      item-value="user_id"
      class="elevation-1 custom-header-table"
      @update:options="onTableOptionsChange"
    >
      <template #[`item.no`]="{ index }">
        {{ (store.params.start ?? 0) + index + 1 }}
      </template>

      <template #[`item.name`]="{ item }">
        <span class="font-bold text-blue-500 dark:text-blue-300">{{
          formatName(item)
        }}</span>
      </template>

      <template #[`item.branch_name`]="{ item }">
        <div class="flex flex-col whitespace-nowrap">
          <span class="font-bold">
            {{ item.branch_alias }} ({{ item.branch_code }})
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-300">{{
            item.branch_name
          }}</span>
        </div>
      </template>

      <template #[`item.remaining_leave`]="{ item }">
        <span class="font-bold">{{ item.remaining_leave }}</span>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn
          icon
          color="text-blue-500"
          variant="tonal"
          size="x-small"
          :to="'/master/remaining-leave/' + item.id + '/detail/'"
          router
        >
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { useFormatName } from "@/composables/useFormatName";
import { useRemainingLeaveStore } from "@/stores/remaining-leave.store";
import { onMounted } from "vue";
const store = useRemainingLeaveStore();
const { formatName } = useFormatName();

const headers = [
  { title: "No", key: "no", sortable: false, width: "60px" },
  { title: "Nama", key: "name", sortable: false },
  { title: "Cabang", key: "branch_name", sortable: false },
  { title: "Jabatan", key: "position", sortable: false },
  { title: "Saldo Cuti", key: "remaining_leave", sortable: false },
  { title: "Aksi", key: "actions", sortable: false, align: "end" },
];

function onTableOptionsChange(options: { page: number; itemsPerPage: number }) {
  store.params.length = options.itemsPerPage;
  store.params.start = (options.page - 1) * options.itemsPerPage;
  store.fetchRemainingLeave();
}

onMounted(() => store.fetchRemainingLeave());
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
