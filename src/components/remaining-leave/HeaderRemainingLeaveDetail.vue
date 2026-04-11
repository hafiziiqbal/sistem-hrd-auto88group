<template>
  <v-card class="p-3 rounded-lg shadow-md space-y-5 w-full">
    <div class="md:flex items-center justify-between mb-0">
      <div>
        <p class="text-lg font-bold m-0 text-indigo-500">Detail History Cuti</p>
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
          class="bg-blue-500 dark:bg-blue-800 text-sm text-white"
        >
          Tambah Data</v-btn
        >
        <v-btn
          to="/master/remaining-leave"
          prepend-icon="mdi-arrow-left"
          variant="flat"
          class="bg-gray-500 dark:bg-gray-800 text-sm text-white"
        >
          Kembali</v-btn
        >
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const items = [
  { title: "Master", disabled: false, href: "/master" },
  {
    title: "Detail History Cuti",
    disabled: true,
    href: "/master/leave-history/detail",
  },
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
