<template>
  <v-card class="p-4 rounded-xl shadow-md border border-slate-100 w-full">
    <v-skeleton-loader
      v-if="userStore.isLoadingSelected"
      type="list-item-three-line, rounded-xl"
      class="bg-transparent"
    >
      <v-row class="m-0" align="center">
        <v-col cols="12" md="7">
          <div class="space-y-4">
            <v-skeleton-loader type="text" width="80%"></v-skeleton-loader>
            <v-skeleton-loader type="text" width="60%"></v-skeleton-loader>
            <v-skeleton-loader type="text" width="70%"></v-skeleton-loader>
            <v-skeleton-loader type="text" width="50%"></v-skeleton-loader>
          </div>
        </v-col>
        <v-col cols="12" md="5" class="flex justify-start md:justify-end">
          <v-skeleton-loader
            type="image"
            width="200"
            height="100"
            class="rounded-2xl"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-skeleton-loader>

    <v-row v-else class="m-0" align="center">
      <v-col
        cols="12"
        md="7"
        class="text-slate-600 dark:text-slate-300 text-sm md:text-base"
      >
        <div class="space-y-2">
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-4 font-bold">Nama</div>
            <div class="col-span-8">
              :
              {{
                formatName({
                  name: userStore.usersSelected?.name,
                  full_name: userStore.usersSelected?.full_name,
                })
              }}
            </div>
          </div>

          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-4 font-bold">ID Karyawan</div>
            <div class="col-span-8">
              : {{ userStore.usersSelected?.employee_id }}
            </div>
          </div>

          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-4 font-bold">Jabatan</div>
            <div class="col-span-8">
              : {{ userStore.usersSelected?.position }}
            </div>
          </div>

          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-4 font-bold">Cabang</div>
            <div class="col-span-8 lowercase first-letter:uppercase">
              : {{ userStore.usersSelected?.branch?.alias }} -
              {{ userStore.usersSelected?.branch?.name }}
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="5" class="flex justify-start md:justify-end">
        <div
          class="bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-1 w-full sm:max-w-[200px] text-center flex flex-col justify-center items-center shadow-sm"
        >
          <div>
            <p
              class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest m-0 sm:mb-1"
            >
              Sisa Cuti
            </p>
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-5xl font-black text-slate-800 dark:text-white">
                {{ userStore.usersSelected?.remaining_leave ?? 0 }}
              </span>
              <span class="text-sm font-medium text-slate-500">Hari</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
import { useFormatName } from "@/composables/useFormatName";
import { useUserStore } from "@/stores/user.store";
import { onMounted } from "vue";

const { formatName } = useFormatName();
const userStore = useUserStore();

onMounted(() => {});
</script>
