import api from "../axios";
export interface EducationDataParams {
  search?: string;
}
export interface EducationDataResponse {
  success: boolean;
  data: Education[];
}

export interface Education {
  id: number;
  name: string;
}

export const educationApi = {
  getData(params: EducationDataParams): Promise<EducationDataResponse> {
    return api
      .get("/hrd/master-education/data", { params })
      .then((res) => res.data);
  },
};
