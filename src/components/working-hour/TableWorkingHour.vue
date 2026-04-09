<template>
  <div class="space-y-3">
    <div class="flex justify-end">
      <v-text-field
        v-model="searchQuery"
        placeholder="Cari kode/nama..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        clearable
        hide-details
        class="max-w-xs"
        @update:model-value="onSearch"
        @click:clear="onClear"
      />
    </div>
    <v-data-table-server
      :headers="headers as any"
      :items="workingHour"
      :items-length="workingHourStore.totalRecords"
      :items-per-page="workingHourStore.params.length"
      :loading="workingHourStore.isLoading"
      class="elevation-1 custom-header-table"
      @update:options="onTableOptionsChange"
    >
      <template #[`item.no`]="{ index }">
        {{ (workingHourStore.params.start ?? 0) + index + 1 }}
      </template>
      <template #[`item.code`]="{ item }">
        <span class="font-bold">{{ item.code }}</span>
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
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useWorkingHourStore } from "@/stores/working-hour.store";

const workingHourStore = useWorkingHourStore();

const workingHour = computed(() => workingHourStore.workingHour);

const props = defineProps<{
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}>();

const emit = defineEmits(["edit"]);

const searchQuery = ref("");
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

function onSearch(value: string | null) {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    workingHourStore.params.search = value ?? "";
    workingHourStore.params.start = 0;
    workingHourStore.fetchWorkingHour();
  }, 400);
}

function onClear() {
  searchQuery.value = "";
  workingHourStore.params.search = "";
  workingHourStore.params.start = 0;
  workingHourStore.fetchWorkingHour();
}

const headers = [
  { title: "No", key: "no", sortable: false, width: "60px" },
  { title: "code", key: "code", sortable: false },
  { title: "Departemen/Team", key: "name", sortable: false },
  { title: "Cabang", key: "alias", sortable: false },
  { title: "Aksi", key: "actions", sortable: false, align: "end" },
];

function onTableOptionsChange(options: { page: number; itemsPerPage: number }) {
  workingHourStore.params.length = options.itemsPerPage;
  workingHourStore.params.start = (options.page - 1) * options.itemsPerPage;
  workingHourStore.fetchWorkingHour();
}

function handleEdit(item: any) {
  emit("edit", item);
}

onMounted(() => {
  workingHourStore.fetchWorkingHour();
  console.log(workingHour.value);
});
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
