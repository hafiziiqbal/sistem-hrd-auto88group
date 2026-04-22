import api from "../axios";
export interface WorkingHourDatatablesParams {
  draw?: number;
  start?: number;
  length?: number;
  search?: string;
}

export interface WorkingHourParams {
  code: string;
  time: string;
}

export interface WorkingHourDatatablesResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: WorkingHour[];
}
export interface WorkingHourCreateUpdateResponse {
  success: boolean;
  message: string;
  data: WorkingHour;
}

export interface WorkingHour {
  DT_RowIndex: number;
  id: number;
  name: string;
  alias: string;
  code: string;
  time: WorkingHourTime[]; // <- hasil parse
  created_at: string;
}

export interface WorkingHourTime {
  dayCode: string;
  time_in: string;
  time_out: string;
}

const normalizeTime = (t: string) => t.slice(0, 5);

export const workingHourApi = {
  getDatatables(
    params: WorkingHourDatatablesParams,
  ): Promise<WorkingHourDatatablesResponse> {
    return api.get("/hrd/working-hour", { params }).then((res) => {
      const response = res.data;

      return {
        ...response,
        data: response.data.map((item: any) => {
          let parsedTime: WorkingHourTime[] = [];

          try {
            parsedTime = JSON.parse(item.time).map((t: any) => ({
              dayCode: t.dayCode,
              time_in: normalizeTime(t.time_in),
              time_out: normalizeTime(t.time_out),
            }));
          } catch {
            parsedTime = [];
          }

          return {
            ...item,
            time: parsedTime,
          };
        }),
      };
    });
  },

  updateWorkingHour(
    id: number,
    params: WorkingHourParams,
  ): Promise<WorkingHourCreateUpdateResponse> {
    return api
      .post(`/hrd/working-hour/${id}  `, params)
      .then((res) => res.data);
  },
};
