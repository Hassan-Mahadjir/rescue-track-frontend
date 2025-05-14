import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";

class itemService extends BaseService {
  async getAllItems() {
    const response = await http.get<AppResponse<any>>("item");
    return response;
  }

  async postMedication(data: any) {
    const response = await http.post<AppResponse<any>>("item/medication", data);
    return response;
  }

  async postEquipment(data: any) {
    const response = await http.post<AppResponse<any>>("item/equipment", data);
    return response;
  }
}

export default new itemService();
