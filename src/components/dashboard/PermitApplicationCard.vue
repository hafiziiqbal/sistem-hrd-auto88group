<template>
  <v-card
    class="w-full !rounded-[24px] !p-3 border border-slate-100 dark:border-slate-900 transition-all duration-300 hover:shadow-xl shadow-md"
    variant="flat"
  >
    <div class="flex items-center justify-between">
      <h2
        class="text-md font-bold text-slate-800 dark:text-slate-200 tracking-tight"
      >
        Daftar Pengajuan
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

        <v-select
          v-model="selectedPermit"
          :items="permitOptions"
          label="Perizinan"
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
    <div
      class="overflow-scroll h-[400px] md:h-[400px] custom-scrollbar space-y-3 pb-20"
    >
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="p-4 shadow-md rounded-[20px] border border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-colors group"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex gap-3">
            <div
              class="bg-white dark:bg-slate-700 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600"
            >
              <v-icon color="indigo">mdi-clock-time-eight-outline</v-icon>
            </div>
            <div>
              <div class="text-xs text-slate-500">Pengajuan</div>
              <div
                class="font-bold text-slate-800 dark:text-white leading-tight"
              >
                {{ formatDate(employee.createdAt) }}
                <v-chip
                  size="small"
                  :color="getPermitColor(employee.permit)"
                  variant="flat"
                  class="font-bold text-uppercase"
                  style="font-size: 10px; height: 18px"
                >
                  {{ employee.permit }}
                </v-chip>
              </div>
            </div>
          </div>
          <v-btn
            variant="tonal"
            size="small"
            rounded="pill"
            class="text-none"
            color="indigo"
          >
            Detail
          </v-btn>
        </div>

        <div class="space-y-3">
          <p
            class="text-[15px] font-bold text-slate-800 dark:text-slate-100 truncate leading-none"
          >
            {{ employee.name }}
          </p>
          <div class="flex items-center gap-4 text-xs">
            <div class="flex items-center gap-1">
              <span class="text-green-600 font-medium">Mulai:</span>
              <span class="text-slate-900 dark:text-slate-300">{{
                employee.startDate
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-red-500 font-medium">Berakhir:</span>
              <span class="text-slate-900 dark:text-slate-300">{{
                employee.endDate
              }}</span>
            </div>
          </div>

          <div class="mb-3">
            <span
              v-if="employee.approve == 1"
              class="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[11px] font-bold rounded-full border border-green-100 dark:border-green-800"
            >
              Sudah Disetujui Oleh Admin
            </span>

            <span
              v-else
              class="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[11px] font-bold rounded-full border border-red-100 dark:border-red-800"
            >
              Belum Disetujui Oleh Admin
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="border-t border-slate-100 dark:border-slate-800 backdrop-blur-md rounded-b-[24px]"
    >
      <v-btn
        block
        color="#6962e9"
        variant="flat"
        rounded="xl"
        size="large"
        class="text-none cursor-pointer !text-white font-bold"
      >
        Lihat Semua
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const showFilter = ref(false);
// Filter States
const selectedBranch = ref("Semua Cabang");
const branchOptions = [
  "Semua Cabang",
  "Autoplaza 88 (Pontianak)",
  "Auto 88 Kuburaya",
  "Auto 88 Sintang",
];

const selectedPermit = ref("Semua");
const permitOptions = ["Semua", "Cuti", "Sakit", "Izin"];
// Generate 50 dummy data
const employees = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Karyawan Ke-${i + 1}`,
  createdAt: `2026-03-30 15:18:16`,
  permit: `Cuti`,
  email: `user${i + 1}@auto88.co.id`,
  branch: "Autoplaza 88",
  startDate: "29-06-2020",
  endDate: "31-03-2026",
  approve: 0,
  daysLeft: Math.floor(Math.random() * 10) + 1,
}));

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getPermitColor = (permit: string) => {
  if (!permit) return "grey";

  const status = permit.toLowerCase();
  if (status.includes("sakit")) return "warning"; // Kuning
  if (status.includes("izin")) return "info"; // Biru
  if (status.includes("cuti")) return "bg-red-700 text-white";

  return "primary"; // Default Biru Vuetify
};
</script>

<style scoped>
/* Opsional: Membuat scrollbar lebih rapi */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
}
</style>
