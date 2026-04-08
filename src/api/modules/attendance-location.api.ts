import api from "../axios";
export interface AttendanceLocationDataParams {
  search?: string;
}
export interface AttendanceLocationDataResponse {
  total: Number;
  data: AttendanceLocation[];
}

export interface AttendanceLocation {
  id: number;
  name: string;
}

export const attendanceLocationApi = {
  getData(
    params: AttendanceLocationDataParams,
  ): Promise<AttendanceLocationDataResponse> {
    return api
      .get("/hrd/attendance-locations", { params })
      .then((res) => res.data);
  },
};
