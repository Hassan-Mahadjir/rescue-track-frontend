class BaseService {
  protected _query(params: string | Record<string, string>) {
    const query = new URLSearchParams(params);
    console.log(`from BaseService:?${query.toString()}`);
    return `?${query.toString()}`;
  }
}

export default BaseService;
