import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { SupplierFormValues } from "@/types/schema/supplierFormSchema";
import { Supplier } from "@/types/supplier";

class SupplierService extends BaseService {
  async getSuppliers() {
    const response = await http.get<AppResponse<Supplier[]>>("supplier");
    return response;
  }

  async getSupplier(id: number) {
    const response = await http.get<AppResponse<Supplier>>(`supplier/${id}`);
    return response;
  }

  async postSupplier(data: SupplierFormValues) {
    const response = await http.post<AppResponse<SupplierFormValues>>(
      "supplier",
      data
    );
    return response;
  }

  async updateSupplier(data: SupplierFormValues, id: number) {
    const response = await http.patch<AppResponse<SupplierFormValues>>(
      `supplier/${id}`,
      data
    );
    return response;
  }
}
const supplierService = new SupplierService();
export default supplierService;
