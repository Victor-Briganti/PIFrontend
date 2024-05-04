import SuperAxios from "./super/SuperAxios";
import City from "../models/City";

class AxiosCity extends SuperAxios<City> {
  constructor() {
    super();
    this.host = this.host + "/address/city/";
  }

  async getCityList(): Promise<City[]> {
    return await this.get("");
  }

  async getCityDetail(id: number): Promise<City> {
    return await this.get(`${id}`);
  }

  async registerCity(city: City): Promise<City> {
    return await this.post("register/", city);
  }
}

export default AxiosCity;
