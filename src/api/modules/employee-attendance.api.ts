import api from "../axios";

export interface EmployeeAttendanceParams {
  draw?: number;
  start?: number;
  length?: number;
}

export interface EmployeeAttendanceResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: EmployeeAttendance[];
}

export interface EmployeeAttendance {
  id: number;
  user_id: number;
  working_hour: string;
  time_in: string;
  image_in: string;
  device_in: string;
  latitude_in: number;
  longitude_in: number;
  in_coordinate_id: number;
  in_coordinate_name: string;
  note_in: string | null;
  time_out: string | null;
  image_out: string | null;
  device_out: string | null;
  latitude_out: number | null;
  longitude_out: number | null;
  out_coordinate_id: number | null;
  out_coordinate_name: string | null;
  note_out: string | null;
  overtime_status: string | null;
  overtime_note: string | null;
  overtime_approved_by: string | null;
  overtime_approved_at: string | null;
  overtime_status_2: string | null;
  overtime_note_2: string | null;
  overtime_approved_by_2: string | null;
  overtime_approved_at_2: string | null;
  overtime_status_hrd: string | null;
  overtime_note_hrd: string | null;
  overtime_approved_by_hrd: string | null;
  overtime_approved_at_hrd: string | null;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_full_name: string;
  user_email: string;
  branch_id: number;
  branch_name: string;
  branch_alias: string;
}

export const employeeAttendanceRequestApi = {
  getDatatables(
    params: EmployeeAttendanceParams,
  ): Promise<EmployeeAttendanceResponse> {
    return api
      .get("/hrd/employee-attendance", { params })
      .then((res) => res.data);
  },
};
