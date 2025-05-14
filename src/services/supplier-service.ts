import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";

class supplierService extends BaseService {
  async getSuppliers() {
    const response = await http.get<AppResponse<any>>("supplier");
    return response;
  }

  async getSupplier(id: number) {
    const response = await http.get<AppResponse<any>>(`supplier/${id}`);
    return response;
  }

  async postSupplier(data: any) {
    const response = await http.post<AppResponse<any>>("supplier", data);
    return response;
  }

  async updateSupplier(data: any, id: number) {
    const response = await http.patch<AppResponse<any>>(`supplier/${id}`, data);
    return response;
  }
}

export default new supplierService();
