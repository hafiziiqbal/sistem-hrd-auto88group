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

export interface User {
  id: number;
  DT_RowIndex: number;
  image: string; // untuk item.image di slot foto
  name: string;
  email: string;
  level: string;
  gender: "M" | "F";
  status_id: number;
  disabled: number;
  branch: {
    alias: string;
    code: string;
    name: string;
  };
  position?: {
    name: string;
    code: string;
  };
  telemarketing?: {
    disabled: number;
  };
}

export interface LocationPresensi {
  id: number;
  name: string;
}
export interface Telemarketing {
  id: number;
  name: string;
}

export const userApi = {
  getDatatables(params: UserDatatablesParams): Promise<UserDatatablesResponse> {
    return api.get("/hrd/users", { params }).then((res) => res.data);
  },

  getData(params: UserDataParams): Promise<UserDataResponse> {
    return api.get("/hrd/users/data", { params }).then((res) => res.data);
  },
};
