<template>
  <div class="space-y-5">
    <header-employee :hide-fields="['index']" />
    <v-card elevation="1" class="p-3 rounded-lg shadow-md w-full">
      <div class="md:flex w-full">
        <v-tabs
          v-model="tab"
          color="primary"
          direction="vertical"
          class="text-sm border-r-1 border-gray-200 dark:border-gray-600"
        >
          <v-tab text="Data Diri" value="personal"></v-tab>
          <v-tab text="Data Keluarga" value="family"></v-tab>
          <v-tab text="Data Pendidikan" value="education"></v-tab>
          <v-tab text="Data Pengalaman Kerja" value="work-experience"></v-tab>
          <v-tab text="Data Karir Pekerjaan" value="career-job"></v-tab>
          <v-tab
            text="Sertifikat/Pelatihan"
            value="training-certificate"
          ></v-tab>
          <v-tab text="Akses Akun" value="account-access"></v-tab>
          <v-tab text="Kelengkapan File" value="completement-file"></v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab" class="w-full">
          <v-tabs-window-item value="personal" class="w-full">
            <v-sheet elevation="0">
              <v-tabs v-model="subTabPersonal" color="primary" class="text-sm">
                <v-tab value="verification">Verifikasi</v-tab>
                <v-tab value="submission">Pengajuan</v-tab>
                <v-tab value="history">Histori</v-tab>
              </v-tabs>

              <v-divider></v-divider>

              <v-tabs-window v-model="subTabPersonal">
                <v-tabs-window-item value="verification">
                  <v-card flat class="p-3">
                    <div class="flex justify-end w-full gap-2">
                      <v-btn
                        color="bg-gray-300 dark:bg-gray-600 text-indigo-900 dark:text-indigo-100 text-sm"
                        prepend-icon="mdi-cloud-print"
                        variant="flat"
                        >Cetak Biodata</v-btn
                      >
                      <v-btn
                        color="bg-gray-300 dark:bg-gray-600 text-indigo-900 dark:text-indigo-100 text-sm"
                        prepend-icon="mdi-pencil-box"
                        variant="flat"
                        >Edit Data</v-btn
                      >
                    </div>

                    <div class="space-y-7">
                      <v-card elevation="0">
                        <v-card-title
                          class="text-indigo-600 dark:text-indigo-400 font-bold px-0 text-base"
                        >
                          Data Diri
                        </v-card-title>

                        <v-divider class="mb-6"></v-divider>
                        <v-row gap="15">
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">NIK</div>
                            <div class="font-bold text-sm">20260311</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Nama Lengkap
                            </div>
                            <div class="font-bold text-sm">Henry</div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Pendidikan Terakhir
                            </div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="6"> </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Gelar Depan</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Gelar Belakang
                            </div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Nomor HP</div>
                            <div class="font-bold text-sm">08951321231</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Email</div>
                            <div class="font-bold text-sm">
                              hafiziiqbal12343423@gmail.com
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Jenis Kelamin
                            </div>
                            <div class="font-bold text-sm">Laki - Laki</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Status Pernikahan
                            </div>
                            <div class="font-bold text-sm">Menikah</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Golongan Darah
                            </div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Tempat Lahir
                            </div>
                            <div class="font-bold text-sm">TELUK GELAM</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Tanggal Lahir
                            </div>
                            <div class="font-bold text-sm">27 Maret 2003</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Agama</div>
                            <div class="font-bold text-sm">Islam</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Nomor BPJS Kesehatan
                            </div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Nomor BPJS Ketenagakerjaan
                            </div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Jumlah Anak</div>
                            <div class="font-bold text-sm">0</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Nomor HP Darurat
                            </div>
                            <div class="font-bold text-sm">0123123</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">
                              Nama Kontak Darurat
                            </div>
                            <div class="font-bold text-sm">asdasda</div>
                          </v-col>
                        </v-row>
                      </v-card>

                      <v-card elevation="0">
                        <v-card-title
                          class="text-indigo-600 dark:text-indigo-400 font-bold px-0 text-base"
                        >
                          Data Alamat(Domisili)
                        </v-card-title>

                        <v-divider class="mb-6"></v-divider>
                        <v-row gap="15">
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Provinsi</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Kabupaten</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Kecamatan</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">Kelurahan</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">RT</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>

                          <v-col cols="12" md="6">
                            <div class="text-gray-500 text-sm">RW</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="12">
                            <div class="text-gray-500 text-sm">Alamat</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                          <v-col cols="12" md="12">
                            <div class="text-gray-500 text-sm">Kode Pos</div>
                            <div class="font-bold text-sm">-</div>
                          </v-col>
                        </v-row>
                      </v-card>
                    </div>
                  </v-card>
                </v-tabs-window-item>
                <v-tabs-window-item value="submission">
                  <v-sheet class="pa-5" color="orange">Two</v-sheet>
                </v-tabs-window-item>
                <v-tabs-window-item value="history">
                  <v-sheet class="pa-5" color="brown">Three</v-sheet>
                </v-tabs-window-item>
              </v-tabs-window>
            </v-sheet>
          </v-tabs-window-item>

          <v-tabs-window-item value="family">
            <v-card flat>
              <v-card-text>
                <p>
                  Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                  egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                  id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                  aliquam libero, non adipiscing dolor urna a orci. Curabitur
                  ligula sapien, tincidunt non, euismod vitae, posuere
                  imperdiet, leo. Nunc sed turpis.
                </p>

                <p>
                  Suspendisse feugiat. Suspendisse faucibus, nunc et
                  pellentesque egestas, lacus ante convallis tellus, vitae
                  iaculis lacus elit id tortor. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In hac habitasse platea dictumst. Fusce ac
                  felis sit amet ligula pharetra condimentum.
                </p>

                <p>
                  Sed consequat, leo eget bibendum sodales, augue velit cursus
                  nunc, quis gravida magna mi a libero. Nam commodo suscipit
                  quam. In consectetuer turpis ut velit. Sed cursus turpis vitae
                  tortor. Aliquam eu nunc.
                </p>

                <p>
                  Etiam ut purus mattis mauris sodales aliquam. Ut varius
                  tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce
                  fermentum odio nec arcu.
                </p>

                <p class="mb-0">
                  Donec venenatis vulputate lorem. Aenean viverra rhoncus pede.
                  In dui magna, posuere eget, vestibulum et, tempor auctor,
                  justo. Fusce commodo aliquam arcu. Suspendisse enim turpis,
                  dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="education">
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import HeaderEmployee from "@/components/employee/HeaderEmployee.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const employeeId = route.params.id;
const employee = history.state.employee ?? null;
const tab = ref("personal");
const subTabPersonal = ref("verification");

console.log(employeeId, employee);
</script>
<style scoped>
/* Memastikan tab yang aktif memiliki teks yang kontras */
.v-tab--selected {
  font-weight: bold !important;
  /* Jika di dark mode warna primary-mu kurang kontras, paksa warnanya di sini */
  color: #615fff !important; /* Contoh warna ungu terang untuk dark mode */
}

/* Mengatur warna slider (garis bawah) agar lebih menyala */
:deep(.v-tabs--density-default) {
  --v-tabs-height: 48px;
}
</style>
