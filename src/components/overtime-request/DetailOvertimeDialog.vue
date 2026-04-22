<template>
  <v-dialog
    v-model="overtimeRequestStore.detailOvertimeDialog"
    max-width="900"
    scrollable
    persistent
  >
    <v-card rounded="lg">
      <v-card-title class="flex items-center gap-2 px-6 pt-5 pb-3">
        <v-icon icon="mdi-tune-variant" color="primary" size="small"></v-icon>
        <span class="text-base font-bold"> Detail Lembur</span>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="close"
        ></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="p-4">
        <v-row class="mb-5">
          <!-- KIRI -->
          <v-col cols="12" md="6">
            <!-- NAMA -->
            <v-row class="m-1">
              <v-col cols="5">Nama</v-col>
              <v-col cols="7" class="flex gap-3 font-bold"
                >:
                <span>{{
                  formatName({
                    name: overtimeRequest?.user_name,
                    full_name: overtimeRequest?.user_full_name,
                  })
                }}</span></v-col
              >
            </v-row>

            <!-- LOKASI -->
            <v-row class="m-1">
              <v-col cols="5">Lokasi</v-col>
              <v-col cols="7" class="flex gap-3 font-bold"
                >:
                <span>{{ overtimeRequest?.out_coordinate_name }}</span></v-col
              >
            </v-row>

            <!-- JAM LEMBUR -->
            <v-row class="m-1">
              <v-col cols="5">Jam Lembur Selesai</v-col>
              <v-col cols="7" class="flex gap-3 font-bold"
                >: <span>{{ overtimeRequest?.time_out }}</span></v-col
              >
            </v-row>
          </v-col>

          <!-- KANAN -->
          <v-col cols="12" md="6">
            <!-- TANGGAL ABSEN-->
            <v-row class="m-1">
              <v-col cols="5">Tanggal Absen</v-col>
              <v-col cols="7" class="flex gap-3 font-bold"
                >:
                <span>{{
                  toFullDateWithDay(overtimeRequest?.created_at)
                }}</span></v-col
              >
            </v-row>

            <!-- KETERANGAN-->
            <v-row class="m-1">
              <v-col cols="5">Keterangan</v-col>
              <v-col cols="7" class="flex gap-3 font-bold"
                >: <span>{{ overtimeRequest?.note_out }}</span></v-col
              >
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="6">
            <p class="text-center">Peta Lokasi</p>
            <v-card class="pa-0" position="relative">
              <iframe
                width="100%"
                height="300"
                style="border: 0"
                loading="lazy"
                :src="`https://maps.google.com/maps?q=${overtimeRequest?.latitude_out},${overtimeRequest?.longitude_out}&z=15&output=embed`"
              ></iframe>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <p class="text-center">Gambar</p>
            <a
              :href="`${baseUrl}/image/employee-attendance/${overtimeRequest?.user_id}/${overtimeRequest?.image_out}`"
              target="_blank"
              class="text-decoration-none"
            >
              <v-img
                :src="`${baseUrl}/image/employee-attendance/${overtimeRequest?.user_id}/${overtimeRequest?.image_out}`"
                alt="Gambar Lembur"
                class="mx-auto rounded-xl shadow-xl cursor-pointer"
                height="300"
                aspect-ratio="16/9"
                cover
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </a>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useDateFormatter } from "@/composables/UseDateFormatter";
import { useFormatName } from "@/composables/useFormatName";
import { useOvertimeRequestStore } from "@/stores/overtime-request.store";
import { computed } from "vue";

const baseUrl = import.meta.env.VITE_API_URL;
const { formatName } = useFormatName();
const { toFullDateWithDay } = useDateFormatter();
const overtimeRequestStore = useOvertimeRequestStore();
const overtimeRequest = computed(
  () => overtimeRequestStore.overtimeRequestSelected,
);

function close() {
  overtimeRequestStore.detailOvertimeDialog = false;
  overtimeRequestStore.overtimeRequestSelected = null;
}
</script>
