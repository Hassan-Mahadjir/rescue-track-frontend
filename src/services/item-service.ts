import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import {
  EquipmentFormValues,
  MedicationFormValues,
} from "@/types/schema/medication-equipmentSchema";

class itemService extends BaseService {
  async getAllItems() {
    const response = await http.get<AppResponse<InventoryData>>("item");
    return response;
  }

  async postMedication(data: any) {
    const response = await http.post<AppResponse<MedicationFormValues>>(
      "item/medication",
      data
    );
    return response;
  }

  async postEquipment(data: any) {
    const response = await http.post<AppResponse<EquipmentFormValues>>(
      "item/equipment",
      data
    );
    return response;
  }
}

export default new itemService();
