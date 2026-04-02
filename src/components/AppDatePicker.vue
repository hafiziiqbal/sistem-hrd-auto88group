<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="{ ...props, ...$attrs }"
        :model-value="formattedDate"
        readonly
        hide-details="auto"
        append-inner-icon="mdi-calendar"
        @click:clear="clearDate"
      ></v-text-field>
    </template>

    <v-date-picker
      v-model="selectedDate"
      @update:model-value="onDateSelected"
    ></v-date-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

// Definisi Props dengan TS
interface Props {
  modelValue?: string | Date | null;
}

const props = defineProps<Props>();

// Definisi Emits
const emit = defineEmits<{
  (e: "update:modelValue", value: Date | null): void;
}>();

const menu = ref(false);

// State internal untuk date picker
const selectedDate = ref<Date | null>(
  props.modelValue ? new Date(props.modelValue) : null,
);

// Sinkronisasi jika v-model eksternal berubah
watch(
  () => props.modelValue,
  (newVal) => {
    selectedDate.value = newVal ? new Date(newVal) : null;
  },
);

// Format tampilan string di Text Field
const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(selectedDate.value);
});

const onDateSelected = (val: unknown) => {
  const dateVal = val as Date;
  menu.value = false;
  emit("update:modelValue", dateVal);
};

const clearDate = () => {
  selectedDate.value = null;
  emit("update:modelValue", null);
};
</script>
<style scoped>
/* Menghilangkan efek transparan/pudar pada text field readonly */
:deep(.v-date-picker-month__day--selected button) {
  background: indigo;
  color: white;
}
</style>
