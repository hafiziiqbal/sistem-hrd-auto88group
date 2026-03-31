<template>
  <v-card
    class="w-full !rounded-[24px] !p-3 border border-slate-100 dark:border-slate-900 transition-all duration-300 hover:shadow-xl shadow-md"
    variant="flat"
  >
    <div class="flex items-center justify-between">
      <h2
        class="text-md font-bold text-slate-800 dark:text-slate-200 tracking-tight"
      >
        Rasio Keterlambatan
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
        <v-menu v-model="menuDate" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="dateRangeText"
              label="Rentang Tanggal"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="props"
              variant="outlined"
              density="compact"
              hide-details
              rounded="xl"
              class="flex-1"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="selectedDates"
            multiple="range"
            @update:model-value="onDateChange"
            color="indigo-600"
          ></v-date-picker>
        </v-menu>
      </div>
    </v-expand-transition>
    <div class="w-full">
      <vue-apex-charts
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useTheme } from "vuetify";

const theme = useTheme();

const isDark = computed(() => theme.global.name.value === "dark");

interface ApexTooltipOpts {
  series: any[];
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
}
// Data dari JSON Anda
// 1. Definisikan struktur data agar TypeScript tenang
interface DataCabang {
  cabang: string;
  persentase_penilaian_dan_total_kehadiran_persen: number | null;
  total_kehadiran: number;
  keterangan: string; // Pastikan ini ada
}

interface ApiData {
  judul: string;
  data_cabang: DataCabang[];
}

// 2. Gunakan interface tersebut pada ref
const apiData = ref<ApiData>({
  judul: "Rasio Keterlambatan",
  data_cabang: [
    {
      cabang: "AM",
      persentase_penilaian_dan_total_kehadiran_persen: 8,
      total_kehadiran: 283,
      keterangan: "283 Kehadiran dari 31 Karyawan",
    },
    {
      cabang: "AF",
      persentase_penilaian_dan_total_kehadiran_persen: 8,
      total_kehadiran: 214,
      keterangan: "214 Kehadiran dari 23 Karyawan",
    },
    // ... Pastikan semua objek di bawah juga memiliki properti 'keterangan'
    {
      cabang: "KIP",
      persentase_penilaian_dan_total_kehadiran_persen: null,
      total_kehadiran: 87,
      keterangan: "87 Kehadiran dari 8 Karyawan",
    },
    {
      cabang: "PAR",
      persentase_penilaian_dan_total_kehadiran_persen: 54,
      total_kehadiran: 87,
      keterangan: "87 Kehadiran dari 8 Karyawan",
    },
    {
      cabang: "SAT",
      persentase_penilaian_dan_total_kehadiran_persen: null,
      total_kehadiran: 24,
      keterangan: "24 Kehadiran dari 2 Karyawan",
    },
    {
      cabang: "STD",
      persentase_penilaian_dan_total_kehadiran_persen: null,
      total_kehadiran: 190,
      keterangan: "190 Kehadiran dari 21 Karyawan",
    },
  ],
});
const showFilter = ref(false);
const menuDate = ref(false);
const selectedBranch = ref("Semua Cabang");
const branchOptions = [
  "Semua Cabang",
  "AM",
  "AF",
  "AS",
  "BK",
  "HC",
  "KIP",
  "PAR",
  "SAT",
  "STD",
];
const selectedDates = ref<Date[]>([]);

// Konfigurasi Chart
const chartOptions = computed<ApexOptions>(() => ({
  legend: {
    position: "top",
    horizontalAlign: "center",
    markers: {
      // Ganti 'radius' menjadi 'borderRadius'
      borderRadius: 4,
      width: 12,
      height: 12,
      ...({ borderRadius: 4 } as any),
    },
    labels: {
      colors: isDark.value ? "#cbd5e1" : "#475569", // Warna teks legend
    },
  },
  chart: {
    type: "bar",
    stacked: true, // WAJIB: Agar batang bertumpuk seperti di gambar
    toolbar: { show: false },
    fontFamily: "Inter, sans-serif",
    background: "transparent",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "50%", // Sesuaikan ketebalan batang
      dataLabels: {
        total: {
          enabled: true, // Menampilkan teks di ujung kanan batang
          offsetX: 10,
          style: {
            color: isDark.value ? "#60a5fa" : "#2563eb", // Warna biru untuk teks keterangan
            fontSize: "11px",
            fontWeight: 500,
          },
          formatter: function (val: any, opts?: any) {
            const index = opts?.dataPointIndex;
            if (index !== undefined && apiData.value.data_cabang[index]) {
              return apiData.value.data_cabang[index].keterangan;
            }
            return "";
          },
        },
      },
    },
  },
  colors: isDark.value ? ["#475569", "#38bdf8"] : ["#8492a6", "#075985"],
  grid: {
    show: true,
    xaxis: { lines: { show: true } }, // Garis vertikal tipis seperti di gambar
    yaxis: { lines: { show: false } },
    borderColor: isDark.value ? "#334155" : "#f1f5f9",
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: apiData.value.data_cabang.map((d) => d.cabang),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: isDark.value ? "#94a3b8" : "#64748b" } },
  },
  yaxis: {
    title: { text: "Kode Cabang", style: { fontWeight: 400 } },
    labels: {
      style: { fontWeight: 600, colors: isDark.value ? "#94a3b8" : "#64748b" },
    },
  },

  dataLabels: {
    enabled: true,
    formatter: (val, opts) => {
      // Hanya munculkan persentase di bagian "Terlambat" (series index 0)
      return opts?.seriesIndex === 0 ? `${val}%` : "";
    },
    style: {
      fontSize: "10px",
      colors: ["#fff"],
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: isDark.value ? "dark" : "light",
  },
}));

const series = computed(() => [
  {
    name: "Persentase Terlambat",
    // Kita ambil nilai persentase untuk bagian abu-abu
    data: apiData.value.data_cabang.map(
      (d) => d.persentase_penilaian_dan_total_kehadiran_persen ?? 0,
    ),
  },
  {
    name: "Total Kehadiran",
    // Bagian biru merepresentasikan sisa dari total kehadiran
    data: apiData.value.data_cabang.map((d) => d.total_kehadiran),
  },
]);

// --- Logic Date Filter (Tetap seperti kode awal Anda) ---
const dateRangeText = computed(() => {
  if (!selectedDates.value || selectedDates.value.length === 0) return "";
  const sortedDates = [...selectedDates.value].sort(
    (a, b) => a.getTime() - b.getTime(),
  );
  const format = (d: Date) =>
    d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  if (sortedDates.length === 1) return format(sortedDates[0]);
  return `${format(sortedDates[0])} - ${format(sortedDates[sortedDates.length - 1])}`;
});

const onDateChange = (val: any) => {
  if (val.length === 2) menuDate.value = false;
};
</script>

<style scoped>
/* Transisi halus saat ganti theme */
.v-card {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}
</style>
