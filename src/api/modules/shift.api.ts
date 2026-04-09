import api from "../axios";
export interface ShiftDatatablesParams {
  draw?: number;
  start?: number;
  length?: number;
  search?: string;
}

export interface ShiftParams {
  name: string;
  code: string;
  time_in: string;
  time_out: string;
  note: string;
}

export interface leaveTypeCreateUpdateResponse {
  success: boolean;
  message: string;
  data: Shift;
}

export interface ShiftDatatablesResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Shift[];
}

export interface ShiftDefaultResponse {
  success: boolean;
  message: string;
}

export interface Shift {
  DT_RowIndex: number;
  id: number;
  name: string;
  code: string;
  time_in: string;
  time_out: string;
  note: string;
  is_holiday: number;
}

export const shiftApi = {
  getDatatables(
    params: ShiftDatatablesParams,
  ): Promise<ShiftDatatablesResponse> {
    return api.get("/hrd/shift", { params }).then((res) => res.data);
  },

  createShift(params: ShiftParams): Promise<leaveTypeCreateUpdateResponse> {
    return api.post(`/hrd/shift/?_method=POST`, params).then((res) => res.data);
  },

  updateShift(
    id: number,
    params: ShiftParams,
  ): Promise<leaveTypeCreateUpdateResponse> {
    return api
      .post(`/hrd/shift/${id}?_method=POST`, params)
      .then((res) => res.data);
  },

  destroyShift(id: number): Promise<ShiftDefaultResponse> {
    return api.delete(`/hrd/shift/${id}`).then((res) => res.data);
  },
};
