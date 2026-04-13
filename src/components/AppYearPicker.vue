<template>
  <div class="year-picker-wrapper" v-click-outside="close">
    <v-text-field
      variant="outlined"
      density="compact"
      v-bind="$attrs"
      :model-value="modelValue"
      :rules="rules"
      :disabled="disabled"
      :error-messages="errorMessages"
      :bg-color="bgColor"
      readonly
      placeholder="Pilih Tahun"
      hide-details="auto"
      append-inner-icon="mdi-calendar"
      @click="toggle"
      @click:clear="clearDate"
    >
      <template v-if="$slots.label" #label>
        <slot name="label"></slot>
      </template>
    </v-text-field>

    <div v-if="menu" class="year-dropdown">
      <div class="year-list" ref="listRef">
        <button
          v-for="year in years"
          :key="year"
          :ref="(el) => setYearRef(el, year)"
          class="year-item"
          :class="{
            'year-item--selected': String(year) === String(modelValue),
            'year-item--current': year === currentYear,
          }"
          @click="selectYear(year)"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from "vue";

interface Props {
  modelValue?: string | number | null;
  rules?: any[];
  disabled?: boolean;
  min?: string | number;
  errorMessages?: string | string[];
  bgColor?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

const menu = ref(false);
const listRef = ref<HTMLElement | null>(null);
const yearRefs: Record<number, HTMLElement> = {};

const currentYear = new Date().getFullYear();

const minYear = computed(() => (props.min ? Number(props.min) : 1900));
const maxYear = currentYear + 10;

const years = computed(() => {
  const arr: number[] = [];
  for (let y = maxYear; y >= minYear.value; y--) {
    arr.push(y);
  }
  return arr;
});

const setYearRef = (el: any, year: number) => {
  if (el) yearRefs[year] = el;
};

const scrollToYear = async (year: number) => {
  await nextTick();
  const el = yearRefs[year];
  if (el) {
    el.scrollIntoView({ block: "center", behavior: "auto" });
  }
};

const toggle = () => {
  if (props.disabled) return;
  menu.value = !menu.value;
  if (menu.value) {
    const targetYear = modelValue.value
      ? Number(props.modelValue)
      : currentYear;
    scrollToYear(targetYear);
  }
};

const modelValue = computed(() => props.modelValue);

const close = () => {
  menu.value = false;
};

const selectYear = (year: number) => {
  emit("update:modelValue", String(year));
  menu.value = false;
};

const clearDate = () => {
  emit("update:modelValue", null);
};
</script>

<style scoped>
.year-picker-wrapper {
  position: relative;
}

.year-dropdown {
  position: absolute;
  z-index: 2000;
  top: calc(100% + 4px);
  left: 0;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  width: 180px;
  overflow: hidden;
}

.year-list {
  height: 280px;
  overflow-y: auto;
  padding: 8px 0;
  scroll-behavior: auto;
}

.year-item {
  display: block;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface));
  border-radius: 0;
  transition: background 0.15s;
}

.year-item:hover {
  background: rgba(var(--v-theme-on-surface), 0.06);
}

.year-item--current {
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.year-item--selected {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-weight: 600;
}

.year-item--selected:hover {
  background: rgb(var(--v-theme-primary));
  opacity: 0.9;
}
</style>
