class BaseService {
  protected _query(params: string | Record<string, string>) {
    const query = new URLSearchParams(params);
    console.log(`from BaseService:?${query.toString()}`);
    return `?${query.toString()}`;
  }

  // protected checkAuth(endpoint: string): boolean {
  //   const token = Cookies.get("token");
  //   if (!token) return false;

  //   const role = getRoleFromToken(token);
  //   if (!role) return false;

  //   return canAccessEndpoint(role, endpoint);
  // }

  // protected async handleAuthError(endpoint: string) {
  //   if (!this.checkAuth(endpoint)) {
  //     throw new Error("Unauthorized access");
  //   }
  // }
}

export default BaseService;
