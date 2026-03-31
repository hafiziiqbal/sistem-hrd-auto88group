<template>
  <v-card
    class="w-full !rounded-[24px] !p-3 border border-slate-100 dark:border-slate-900 transition-all duration-300 hover:shadow-xl shadow-md"
    variant="flat"
  >
    <div class="flex items-center justify-between">
      <h2
        class="text-md font-bold text-slate-800 dark:text-slate-200 tracking-tight"
      >
        Rekap Absensi Hari Ini
      </h2>
      <div class="flex gap-3">
        <button
          class="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
        >
          <v-icon size="18">mdi-eye-outline</v-icon>
          <span class="hidden sm:inline">Detail</span>
        </button>
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
    </div>

    <v-expand-transition>
      <div
        v-if="showFilter"
        class="mb-4 px-1 space-y-4 md:space-y-0 md:flex gap-2"
      >
        <v-select
          v-model="selectedBranch"
          :items="branchOptions"
          label="Pilih Cabang"
          variant="outlined"
          density="compact"
          hide-details
          rounded="xl"
        ></v-select>

        <v-select
          v-model="selectedShift"
          :items="shiftOptions"
          label="Jam Kerja"
          variant="outlined"
          density="compact"
          hide-details
          rounded="xl"
        >
          <template v-slot:prepend-inner>
            <v-icon size="small" class="mr-1">mdi-clock-outline</v-icon>
          </template>
        </v-select>
      </div>
    </v-expand-transition>
    <div class="space-y-3 w-full md:h-100 md:flex md:space-y-0 items-center">
      <div class="w-full">
        <apexchart
          width="100%"
          height="320"
          type="donut"
          :options="chartOptions as any"
          :series="series"
        ></apexchart>
      </div>
      <div
        class="py-3 w-full h-70 overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:hover:bg-indigo-500"
      >
        <table class="w-full text-left">
          <thead>
            <tr
              class="text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800"
            >
              <th class="pb-2 font-semibold">Status</th>
              <th class="pb-2 font-semibold text-right">Jumlah</th>
              <th class="pb-2 font-semibold text-right text-indigo-500">%</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 dark:divide-slate-900">
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="group even:bg-slate-50/50 dark:even:bg-slate-800/30"
            >
              <td class="pl-2 py-2.5 flex items-center gap-3">
                <div
                  class="w-3 h-3 rounded-full shrink-0"
                  :style="{ backgroundColor: chartColors[index] }"
                ></div>
                <span
                  class="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors"
                >
                  {{ item.label }}
                </span>
              </td>
              <td
                class="py-2.5 text-sm font-bold text-slate-800 dark:text-slate-200 text-right"
              >
                {{ item.value }}
              </td>
              <td
                class="pr-2 py-2.5 text-xs font-medium text-slate-400 dark:text-slate-500 text-right"
              >
                {{ calculatePercentage(item.value) }}%
              </td>
            </tr>
          </tbody>
        </table>
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
// Filter States
const selectedBranch = ref("Semua Cabang");
const branchOptions = [
  "Semua Cabang",
  "Autoplaza 88 (Pontianak)",
  "Auto 88 Kuburaya",
  "Auto 88 Sintang",
];

const selectedShift = ref("Semua Jam Kerja");
const shiftOptions = ["Semua Jam Kerja", "Reguler", "Piket"];

// Data Absensi Terbaru
const rawData = {
  hadir: 32,
  terlambat: 2,
  belum_absen: 0,
  cuti: 0,
  izin: 0,
  sakit: 0,
};

// Warna yang disesuaikan dengan status (Hadir=Hijau, Terlambat=Kuning, Belum=Abu, dsb)
const chartColors = [
  "#10b981", // hadir (Emerald)
  "#f59e0b", // terlambat (Amber)
  "#94a3b8", // belum_absen (Slate)
  "#6366f1", // cuti (Indigo)
  "#8b5cf6", // izin (Violet)
  "#f43f5e", // sakit (Rose)
];

// Transformasi data untuk ApexCharts
const series = computed(() => Object.values(rawData));
const totalData = computed(() => series.value.reduce((a, b) => a + b, 0));

const labels = computed(() => tableData.value.map((item) => item.label));

const tableData = computed(() => {
  return Object.keys(rawData).map((key, index) => {
    // Fungsi untuk mengubah 'belum_absen' menjadi 'Belum Absen'
    const formattedLabel = key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      name: key, // key asli (hadir)
      label: formattedLabel, // label rapi (Hadir)
      value: series.value[index],
    };
  });
});

const calculatePercentage = (value: number) => {
  if (totalData.value === 0) return 0;
  return ((value / totalData.value) * 100).toFixed(1);
};

const chartOptions = computed(() => {
  const isDark = theme.global.name.value === "dark";

  return {
    chart: {
      type: "donut",
      fontFamily: "Inter, sans-serif",
    },
    labels: labels.value,
    colors: chartColors,
    stroke: {
      show: true,
      width: 2,
      colors: [isDark ? "#0f172a" : "#ffffff"],
    },

    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Staff",
              fontSize: "14px",
              fontWeight: 600,
              color: isDark ? "#94a3b8" : "#64748b",
              formatter: () => totalData.value,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: isDark ? "#f8fafc" : "#1e293b",
              offsetY: 4,
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontWeight: 500,
      labels: {
        colors: isDark ? "#cbd5e1" : "#475569",
      },
      markers: {
        width: 10,
        height: 10,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (val: number) => `${val} Orang`,
      },
    },
  };
});
</script>

<style scoped>
/* Transisi halus saat ganti theme */
.v-card {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}
</style>
