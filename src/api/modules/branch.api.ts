import api from "../axios";
export interface BranchDataParams {
  search?: string;
}
export interface BranchDataResponse {
  total: Number;
  data: Branch[];
}

export interface Branch {
  id: number;
  name: string;
  alias: string;
}

export const branchApi = {
  getData(params: BranchDataParams): Promise<BranchDataResponse> {
    return api.get("/branch", { params }).then((res) => res.data);
  },
};
