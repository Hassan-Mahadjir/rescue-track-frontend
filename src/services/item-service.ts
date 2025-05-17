import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import {
  EquipmentFormValues,
  MedicationFormValues,
} from "@/types/schema/medication-equipmentSchema";
import { InventoryData } from "@/types/medication-equipment";

class ItemService extends BaseService {
  async getAllItems() {
    const response = await http.get<AppResponse<InventoryData>>("item");
    return response;
  }

  async postMedication(data: MedicationFormValues) {
    const response = await http.post<AppResponse<MedicationFormValues>>(
      "item/medication",
      data
    );
    return response;
  }

  async postEquipment(data: EquipmentFormValues) {
    const response = await http.post<AppResponse<EquipmentFormValues>>(
      "item/equipment",
      data
    );
    return response;
  }
}
const itemService = new ItemService();
export default itemService;
