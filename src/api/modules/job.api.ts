import api from "../axios";
export interface JobDataParams {
  search?: string;
}
export interface JobDataResponse {
  success: boolean;
  data: Job[];
}

export interface Job {
  id: number;
  name: string;
}

export const jobApi = {
  getData(params: JobDataParams): Promise<JobDataResponse> {
    return api.get("/hrd/master-job/data", { params }).then((res) => res.data);
  },
};
