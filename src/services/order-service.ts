import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { Order } from "@/types/order.type";
import { CreateOrderValues } from "@/types/schema/orderFormSchema";

class orderService extends BaseService {
  async getOrders() {
    const response = await http.get<AppResponse<Order[]>>("order");
    return response;
  }

  async getOrder(id: number) {
    const response = await http.get<AppResponse<Order>>(`order/${id}`);
    return response;
  }

  async postOrder(data: CreateOrderValues) {
    const response = await http.post<AppResponse<CreateOrderValues>>(
      "order",
      data
    );
    return response;
  }

  async updateOrder(data: CreateOrderValues, id: number) {
    const response = await http.patch<AppResponse<CreateOrderValues>>(
      `order/${id}`,
      data
    );
    return response;
  }

  async deleteOrder(id: number) {
    const response = await http.delete<AppResponse<CreateOrderValues>>(
      `order/${id}`
    );
    return response;
  }
}

export default new orderService();
