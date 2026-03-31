<template>
  <v-card
    class="w-full !rounded-[24px] !p-3 border border-slate-100 dark:border-slate-900 transition-all duration-300 hover:shadow-xl shadow-md"
    variant="flat"
  >
    <div class="flex items-center justify-between">
      <h2
        class="text-md font-bold text-slate-800 dark:text-slate-200 tracking-tight"
      >
        Status Kepegawaian
      </h2>
      <button
        @click="showFilter = !showFilter"
        :class="
          showFilter
            ? 'bg-indigo-600 text-white'
            : 'bg-indigo-50 text-indigo-600'
        "
        class="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
      >
        <v-icon size="18">{{
          showFilter ? "mdi-close" : "mdi-filter-variant"
        }}</v-icon>
        Filter
      </button>
    </div>

    <v-expand-transition>
      <div v-if="showFilter" class="mb-4 px-1">
        <v-select
          v-model="selectedFilter"
          :items="filterOptions"
          label="Pilih Cabang"
          variant="outlined"
          density="compact"
          class="mt-2"
          hide-details
          rounded="xl"
        ></v-select>
      </div>
    </v-expand-transition>
    <div class="mt-2 w-full">
      <apexchart
        type="donut"
        width="100%"
        height="300"
        :options="chartOptions as any"
        :series="series"
      ></apexchart>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-4">
      <div
        v-for="(item, index) in chartData"
        :key="index"
        class="flex flex-col p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
      >
        <span class="text-xs text-slate-500 dark:text-slate-200 font-medium">{{
          item.status
        }}</span>
        <span class="text-lg font-bold text-slate-800 dark:text-white"
          >{{ item.jumlah }}
          <small
            class="text-[10px] font-normal text-slate-400 dark:text-slate-200"
            >Orang</small
          ></span
        >
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useTheme } from "vuetify";

const theme = useTheme();

const apexchart = VueApexCharts;

const showFilter = ref(false);
const selectedFilter = ref(null);
const filterOptions = [
  "Semua Cabang",
  "Autoplaza 88 (Pontianak)",
  "Auto 88 Kuburaya",
  "Auto 88 Sintang",
];

const chartData = [
  { status: "Kontrak", jumlah: 93 },
  { status: "Tetap", jumlah: 23 },
];

const series = computed(() => chartData.map((item) => item.jumlah));
const chartOptions = computed(() => ({
  chart: {
    type: "donut",
    fontFamily: "Inter, sans-serif",
    foreColor: theme.global.current.value.dark ? "#cbd5e1" : "#64748b",
  },
  // theme: {
  //   mode: theme.global.current.value.dark ? "dark" : "light",
  // },
  labels: chartData.map((item) => item.status),
  colors: ["#6366f1", "#10b981"], // Indigo untuk Kontrak, Emerald untuk Tetap
  stroke: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "75%",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: 600,
            color: theme.global.current.value.dark ? "#94a3b8" : "#64748b",
          },
          value: {
            show: true,
            fontSize: "24px",
            fontWeight: 700,
            color: theme.global.current.value.dark ? "#f8fafc" : "#1e293b",
            formatter: (val: string) => val,
          },
          total: {
            show: true,
            label: "Total",
            color: theme.global.current.value.dark ? "#94a3b8" : "#64748b",
            formatter: (w: any) => {
              return w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0,
              );
            },
          },
        },
      },
    },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "12px",
    labels: {
      colors: theme.global.current.value.dark ? "#cbd5e1" : "#64748b",
    },
    markers: {
      radius: 12,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (val: number) => `${val} Pegawai`,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 250,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));
</script>
