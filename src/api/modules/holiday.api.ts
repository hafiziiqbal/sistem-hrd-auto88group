import api from "../axios";
export interface HolidayDatatablesParams {
  draw?: number;
  start?: number;
  length?: number;
  search?: string;
}

export interface HolidayParams {
  tanggal: string;
  note: string;
}
export type HolidayBulkParams = HolidayParams[];

export interface leaveTypeCreateUpdateResponse {
  success: boolean;
  message: string;
  data: Holiday;
}

export interface HolidayDatatablesResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Holiday[];
}

export interface HolidayDefaultResponse {
  success: boolean;
  message: string;
}

export interface Holiday {
  DT_RowIndex: number;
  id: number;
  tanggal: string;
  note: string;
}

export const shiftApi = {
  getDatatables(
    params: HolidayDatatablesParams,
  ): Promise<HolidayDatatablesResponse> {
    return api.get("/hrd/holidays", { params }).then((res) => res.data);
  },

  createHoliday(
    params: HolidayBulkParams,
  ): Promise<leaveTypeCreateUpdateResponse> {
    return api
      .post(`/hrd/holidays/?_method=POST`, params)
      .then((res) => res.data);
  },

  destroyHoliday(id: number): Promise<HolidayDefaultResponse> {
    return api.delete(`/hrd/holidays/${id}`).then((res) => res.data);
  },
};
