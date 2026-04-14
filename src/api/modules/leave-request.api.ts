import api from "../axios";
export interface LeaveRequestDatatablesParams {
  draw?: number;
  start?: number;
  length?: number;
  period?: string;
  status?: string;
  user_id?: number;
  branch_id?: number;
  hrd_leave_type_id?: number;
}

export interface LeaveRequestDatatablesResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: LeaveRequest[];
}

export interface LeaveRequest {
  id: number;
  user_id: number;
  hrd_leave_type_id: number;
  start_date: string;
  end_date: string;
  total_days?: number;
  status: string;
  approved_by?: number;
  approved_at?: string;
  approved_by_2?: number;
  approved_at_2?: string;
  approved_by_hrd?: number;
  approved_at_hrd?: string;
  attachment?: string;
  reason: string;
  created_at: string;
  user_name: string;
  user_full_name?: string;
  leave_type_name: string;
  leave_type: string;
  approver_name: string;
  approver_full_name: string;
  approver_2_name: string;
  approver_2_full_name: string;
  approver_hrd_name: string;
  approver_hrd_full_name: string;
  DT_RowIndex: 1;
}

export const leaveRequestApi = {
  getDatatables(
    params: LeaveRequestDatatablesParams,
  ): Promise<LeaveRequestDatatablesResponse> {
    return api.get("/hrd/leave-request", { params }).then((res) => res.data);
  },
};
