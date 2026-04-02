import api from "../axios";
export interface BloodTypeDataParams {
  search?: string;
}
export interface BloodTypeResponse {
  success: boolean;
  data: BloodType[];
}

export interface BloodType {
  id: number;
  name: string;
}

export const bloodTypeApi = {
  getData(params: BloodTypeDataParams): Promise<BloodTypeResponse> {
    return api
      .get("/hrd/master-blood-type/data", { params })
      .then((res) => res.data);
  },
};
