import SuperAxios from "./super/SuperAxios";
import ModelCity from "../interfaces/address/InterfaceCity";

class AxiosCity extends SuperAxios<ModelCity> {
  constructor() {
    super();
    this.host = this.host + "/address/city/";
  }

  async getCityList(): Promise<ModelCity[]> {
    return await this.get("");
  }

  async getCityDetail(id: number): Promise<ModelCity> {
    return await this.get(`${id}`);
  }

  async registerCity(city: ModelCity): Promise<ModelCity> {
    return await this.post("register/", city);
  }
}

export default AxiosCity;
