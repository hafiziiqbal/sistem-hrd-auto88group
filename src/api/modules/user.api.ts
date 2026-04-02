import api from "../axios";
export interface UserDatatablesParams {
  draw?: number;
  start?: number;
  length?: number;
  user_id?: number;
  master_position_id?: number;
  branch_id?: number;
  hrd_master_education_id?: number;
  status_id?: number;
  gender?: string;
  show_deleted?: boolean;
}
export interface UserDataParams {
  search?: string;
  branch_id?: number;
}

export interface UserSelectedParams {
  id?: string;
}

export interface UserDatatablesResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: User[];
}

export interface UserDataResponse {
  success: boolean;
  data: User[];
}

export interface UserSelectedResponse {
  success: boolean;
  data: User; // single object, bukan array
}

export interface User {
  DT_RowIndex: number;
  address_id_card: number;
  back_title: string;
  birth_date: string;
  birth_place: string;
  blood_type: {
    id: number;
    name: string;
  };
  bpjs_employment_number: string;
  bpjs_health_number: string;
  branch: {
    alias: string;
    code: string;
    id: number;
    name: string;
  };
  community_unit: string;
  current_address: string;
  device_id: string;
  disabled: number;
  disctrict: {
    id: number;
    name: string;
  };
  education: {
    id: number;
    name: string;
  };
  effective_end_date: string;
  effective_start_date: string;
  email: string;
  emergency_contact_name: string;
  emergency_phone_number: string;
  face_id: string;
  front_title: string;
  gender: "M" | "F";
  hrd_master_blood_type_id: string;
  hrd_master_education_id: string;
  hrd_master_religion_id: string;
  id: number;
  image: string;
  join_date: string;
  level: string;
  location_presensi: {
    accuracy: number;
    attendance: number;
    id: number;
    latitude: number;
    limitation: number;
    longitude: number;
    name: string;
    stock: number;
  };
  location_presensi_id: number;
  lock_device_attendance: number;
  lock_face_attendance: number;
  marital_status: {
    id: number;
    name: string;
  };
  master_area_district_id: number;
  master_area_province_id: number;
  master_area_regency_id: number;
  master_area_village_id: number;
  hrd_master_marital_status_id: number;
  master_position_id: number;
  name: string;
  neighborhood_unit: string;
  nik: string;
  number_of_children: number;
  phone_number: string;
  position: {
    code: string;
    name: string;
  };
  province: {
    id: number;
    name: string;
  };
  remaining_leave: number;
  religion: {
    id: number;
    name: string;
  };
  regency: {
    id: number;
    name: string;
  };
  status_id: number;
  telemarketing: {
    branch_id: number;
    disabled: number;
    id: number;
    inisial: string;
    nama: string;
    urutan: number;
    user_id: number;
  };
  village: {
    id: number;
    name: string;
  };
  zip_code: string;
}

export const userApi = {
  getDatatables(params: UserDatatablesParams): Promise<UserDatatablesResponse> {
    return api.get("/hrd/users", { params }).then((res) => res.data);
  },

  getData(params: UserDataParams): Promise<UserDataResponse> {
    return api.get("/hrd/users/data", { params }).then((res) => res.data);
  },

  getSelected(params: UserSelectedParams): Promise<UserSelectedResponse> {
    return api.get(`/hrd/users/${params.id}`).then((res) => res.data);
  },
};
