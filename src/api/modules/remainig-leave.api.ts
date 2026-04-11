import api from "../axios";
export interface RemainingLeaveDatatablesParams {
  draw?: number;
  start?: number;
  length?: number;
  user_id?: number;
  branch_id?: number;
}

export interface RemainingLeaveDetailParams {
  year?: string;
  change?: string;
  type?: string;
}

export interface RemainingLeaveDatatablesResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: RemainingLeave[];
}

export interface RemainingLeaveDetailResponse {
  success: boolean;
  message: string;
  recordsFiltered: number;
  data: {
    user: User;
    history: History;
  };
}

export interface User {
  id: number;
  name: string;
  full_name: string;
  employee_id: number;
  position: string;
  remaining_leave: number;
  branch_name: string;
  branch_code: string;
  branch_alias: string;
}

export interface History {
  id: number;
  user_id: number;
  change_amount: string;
  balance_before: number;
  balance_after: number;
  type: string;
  reference_id?: number;
  notes: string;
  created_by?: number;
  created_at: string;
  updated_at: string;
  created_name: string;
  created_full_name: string;
}

export interface RemainingLeave {
  id: number;
  name: string;
  full_name: string;
  email: string;
  position: string;
  remaining_leave: number;
  branch_name: string;
  branch_alias: string;
  branch_code: string;
  DT_RowIndex: 1;
}

export const remainingLeaveApi = {
  getDatatables(
    params: RemainingLeaveDatatablesParams,
  ): Promise<RemainingLeaveDatatablesResponse> {
    return api.get("/hrd/remaining-leave", { params }).then((res) => res.data);
  },

  getDetail(
    id: number,
    params: URLSearchParams | RemainingLeaveDetailParams,
  ): Promise<RemainingLeaveDetailResponse> {
    return api
      .get(`/hrd/remaining-leave/${id}/detail`, { params })
      .then((res) => res.data);
  },
};
