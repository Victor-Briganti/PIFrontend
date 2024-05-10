import SuperAxios from "./super/SuperAxios";
import ModelAddress from "../models/Address";

class AxiosAddress extends SuperAxios<ModelAddress> {
  constructor() {
    super();
    this.host = this.host + "/address/";
  }

  async getAddressList(): Promise<ModelAddress[]> {
    return await this.get("");
  }

  async getAddressDetail(id: number): Promise<ModelAddress> {
    return await this.get(`${id}`);
  }

  async registerAddress(address: ModelAddress): Promise<ModelAddress> {
    return await this.post("register/", address);
  }
}

export default AxiosAddress;
