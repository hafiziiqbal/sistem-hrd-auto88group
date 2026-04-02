import api from "../axios";
export interface MaritalStatusDataParams {
  search?: string;
}
export interface MaritalStatusResponse {
  success: boolean;
  data: MaritalStatus[];
}

export interface MaritalStatus {
  id: number;
  name: string;
}

export const maritalStatusApi = {
  getData(params: MaritalStatusDataParams): Promise<MaritalStatusResponse> {
    return api
      .get("/hrd/master-marital-status/data", { params })
      .then((res) => res.data);
  },
};
