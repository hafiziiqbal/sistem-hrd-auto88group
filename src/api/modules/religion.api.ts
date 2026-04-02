import api from "../axios";
export interface ReligionDataParams {
  search?: string;
}
export interface ReligionResponse {
  success: boolean;
  data: Religion[];
}

export interface Religion {
  id: number;
  name: string;
}

export const religionApi = {
  getData(params: ReligionDataParams): Promise<ReligionResponse> {
    return api
      .get("/hrd/master-religion/data", { params })
      .then((res) => res.data);
  },
};
