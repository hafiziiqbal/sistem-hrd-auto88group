<template>
  <v-card class="p-3 rounded-lg shadow-md space-y-5 w-full">
    <div class="space-y-3 md:space-y-0 md:flex items-center justify-between">
      <div>
        <p class="text-lg font-bold m-0 text-indigo-500">Saldo Cuti</p>
        <v-breadcrumbs
          :items="items"
          class="m-0 p-0 text-gray-500 dark:text-gray-300 text-sm"
        ></v-breadcrumbs>
      </div>

      <div
        class="space-y-1 space-x-1 md:space-y-1 md:space-x-1 md:flex gap-2 justify-start"
      >
        <v-btn
          prepend-icon="mdi-plus"
          variant="flat"
          @click="emit('add')"
          class="bg-blue-500 dark:bg-blue-800 text-sm text-white"
        >
          Tambah Saldo Cuti</v-btn
        ><v-btn
          prepend-icon="mdi-minus"
          variant="flat"
          @click="emit('subtract')"
          class="bg-amber-500 dark:bg-amber-800 text-sm text-white"
        >
          Kurangi Saldo Cuti</v-btn
        >
        <v-btn
          prepend-icon="mdi-reload"
          variant="flat"
          @click="emit('reset')"
          class="bg-red-500 dark:bg-red-800 text-sm text-white"
        >
          Reset Saldo Cuti</v-btn
        >
      </div>
    </div>
    <filter-remaining-leave />
  </v-card>
</template>

<script setup lang="ts">
import FilterRemainingLeave from "./FilterRemainingLeave.vue";

const emit = defineEmits(["add", "subtract", "reset"]);
const items = [
  { title: "Master", disabled: false, href: "/master" },
  { title: "Saldo Cuti", disabled: true, href: "/master/remaining-leave" },
];
</script>

<style scoped>
:deep(.v-breadcrumbs-item--disabled) {
  color: #615fff !important;
  opacity: 1;
}
:deep(.v-breadcrumbs-item) {
  padding: 0;
}
</style>
