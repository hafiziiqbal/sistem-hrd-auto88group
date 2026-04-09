<template>
  <v-card
    class="p-3 rounded-lg shadow-md space-y-3 md:space-y-0 md:flex w-full items-center justify-between"
  >
    <div>
      <p class="text-lg font-bold m-0 text-indigo-500">Jam Kerja</p>
      <v-breadcrumbs
        :items="items"
        class="m-0 p-0 text-gray-500 dark:text-gray-300 text-sm"
      ></v-breadcrumbs>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const items = [
  { title: "Pengaturan", disabled: false, href: "/setting" },
  { title: "Jam Kerja", disabled: true, href: "/setting/working-hour" },
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
