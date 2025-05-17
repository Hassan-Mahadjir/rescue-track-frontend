import { AppResponse } from "@/types/common.type";
import http from "./api/http";
import BaseService from "./base-service";
import { staff } from "@/types/staff.type";

class StaffService extends BaseService {
  async getStaff() {
    const response = await http.get<AppResponse<staff[]>>("user/staff");
    return response;
  }
}
const staffService = new StaffService();
export default staffService;
