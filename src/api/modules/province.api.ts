import api from "../axios";
export interface ProvinceParams {
  search?: string;
  branch_id?: number;
}
export interface ProvinceResponse {
  success: boolean;
  data: Province[];
}

export interface Province {
  id: number;
  name: string;
}

export const provinceApi = {
  getData(params: ProvinceParams): Promise<ProvinceResponse> {
    return api
      .get("/hrd/master-area/provinces", { params })
      .then((res) => res.data);
  },
};
