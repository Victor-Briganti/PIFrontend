import SuperAxios from "./super/SuperAxios";
import Address from "../models/Address";

class AxiosAddress extends SuperAxios<Address> {
  constructor() {
    super();
    this.host = this.host + "/address/";
  }

  async getAddressList(): Promise<Address[]> {
    return await this.get("");
  }

  async getAddressDetail(id: number): Promise<Address> {
    return await this.get(`${id}`);
  }

  async registerAddress(address: Address): Promise<Address> {
    return await this.post("register/", address);
  }
}

export default AxiosAddress;
