import api from "../axios";
export interface EmployeeRelationDataParams {
  search?: string;
}
export interface EmployeeRelationDataResponse {
  success: boolean;
  data: EmployeeRelation[];
}

export interface EmployeeRelation {
  id: number;
  name: string;
}

export const employeeRelationApi = {
  getData(
    params: EmployeeRelationDataParams,
  ): Promise<EmployeeRelationDataResponse> {
    return api
      .get("/hrd/master-employee-relation/data", { params })
      .then((res) => res.data);
  },
};
