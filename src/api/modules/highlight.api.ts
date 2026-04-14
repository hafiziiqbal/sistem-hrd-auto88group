import api from "../axios";

export interface LeaveRequestParams {
  branch_id?: number;
  hrd_leave_type_id?: number;
}
export interface LeaveRequestResponse {
  success: boolean;
  message: string;
  data: LeaveRequest[];
}
export interface LeaveRequest {
  id: number;
  user_id: number;
  hrd_leave_type_id: number;
  start_date: string;
  end_date: string;
  total_days: string;
  status: string;
  approved_by: string;
  approver_name: string;
  approver_full_name: string;
  approved_at: string;
  attachment: string;
  reason: string;
  created_at: string;
  user_name: string;
  user_full_name: string;
  leave_type_name: string;
  leave_type: string;
}

export const highlightApi = {
  getLeaveRequest(params: LeaveRequestParams): Promise<LeaveRequestResponse> {
    return api
      .get(`/hrd/highlight/leave-request`, { params })
      .then((res) => res.data);
  },
};
