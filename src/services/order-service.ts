import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { Order, Status } from "@/types/order.type";
import { CreateOrderValues } from "@/types/schema/orderFormSchema";

class OrderService extends BaseService {
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

  async updateOrder(data: Status, id: number) {
    const response = await http.patch<AppResponse<Status>>(`order/${id}`, data);
    return response;
  }
}
const orderService = new OrderService();
export default orderService;
