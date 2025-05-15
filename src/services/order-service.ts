import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";

class orderService extends BaseService {
  async getOrders() {
    const response = await http.get<AppResponse<any>>("order");
    return response;
  }

  async getOrder(id: number) {
    const response = await http.get<AppResponse<any>>(`order/${id}`);
    return response;
  }

  async postOrder(data: any) {
    const response = await http.post<AppResponse<any>>("order", data);
    return response;
  }

  async updateOrder(data: any, id: number) {
    const response = await http.patch<AppResponse<any>>(`order/${id}`, data);
    return response;
  }

  async deleteOrder(id: number) {
    const response = await http.delete<AppResponse<any>>(`order/${id}`);
    return response;
  }
}

export default new orderService();
