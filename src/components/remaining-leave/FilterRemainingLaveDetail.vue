<template>
  <v-row no-gutters class="space-y-3 md:gap-3">
    <v-col cols="12" md="2">
      <app-year-picker
        v-model="form.year"
        label="Filter Tahun"
        clearable
        @update:model-value="onSearchYear"
      />
    </v-col>
    <v-col cols="12" md="2"
      ><v-select
        @update:model-value="onSearchChange"
        append-inner-icon="mdi-plus-minus"
        variant="outlined"
        density="compact"
        hide-details="auto"
        v-model="form.change"
        :items="[
          { title: 'Penambahan', value: '+' },
          { title: 'Pengurangan', value: '-' },
        ]"
        label="Filter Operasi"
        clearable
    /></v-col>
    <v-col cols="12" md="2"
      ><v-select
        @update:model-value="onSearchType"
        append-inner-icon="mdi-plus-minus"
        variant="outlined"
        density="compact"
        hide-details="auto"
        v-model="form.type"
        :items="[
          { title: 'Reset Tahunan', value: 'annual_reset' },
          { title: 'Ambil Cuti', value: 'leave_taken' },
          { title: 'Atur Manual', value: 'manual_adjustment' },
        ]"
        label="Filter Aksi"
        clearable
    /></v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { RemainingLeaveDetailParams } from "@/api/modules/remainig-leave.api";
import { useDebounceFn } from "@/composables/UseDebounce";
import { useRemainingLeaveStore } from "@/stores/remaining-leave.store";
import { reactive } from "vue";
import AppYearPicker from "../AppYearPicker.vue";
const remainingLeaveStore = useRemainingLeaveStore();

const props = defineProps({
  employeeId: {
    type: Number,
    required: true,
  },
});

const form = reactive<Partial<RemainingLeaveDetailParams>>({
  year: undefined,
  change: undefined,
  type: undefined,
});

const onSearchYear = useDebounceFn((val: string | null) => {
  remainingLeaveStore.detailParams.year = val ?? "";
  remainingLeaveStore.fetchRemainingLeaveDetail(props.employeeId);
}, 400);
const onSearchChange = useDebounceFn((val: string | null) => {
  remainingLeaveStore.detailParams.change = val ?? "";
  remainingLeaveStore.fetchRemainingLeaveDetail(props.employeeId);
}, 400);
const onSearchType = useDebounceFn((val: string | null) => {
  remainingLeaveStore.detailParams.type = val ?? "";
  remainingLeaveStore.fetchRemainingLeaveDetail(props.employeeId);
}, 400);
</script>
