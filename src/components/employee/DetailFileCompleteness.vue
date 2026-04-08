<template>
  <v-sheet elevation="0">
    <v-tabs v-model="subTabPerFileCompleteness" color="primary" class="text-sm">
      <v-tab value="verification">Verifikasi</v-tab>
      <v-tab value="submission">Pengajuan</v-tab>
      <v-tab value="history">Histori</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs-window v-model="subTabPerFileCompleteness">
      <v-tabs-window-item value="verification">
        <preview-file-completeness />
      </v-tabs-window-item>
      <v-tabs-window-item value="submission">
        <v-sheet class="pa-5" color="orange">No Data</v-sheet>
      </v-tabs-window-item>
      <v-tabs-window-item value="history">
        <v-sheet class="pa-5" color="brown">No Data</v-sheet>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-sheet>
</template>
<script setup lang="ts">
import { ref } from "vue";
import PreviewFileCompleteness from "./PreviewFileCompleteness.vue";
const subTabPerFileCompleteness = ref("verification");
</script>
