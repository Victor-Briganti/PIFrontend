import SuperAxios from "./super/SuperAxios";
import InterfaceAddress from "../interfaces/InterfaceAddress";
import validatedAddress from "../interfaces/validators/ValidatedAddress";

export default class AxiosAddress extends SuperAxios<InterfaceAddress> {
  constructor() {
    super();
    this.host = this.host + "/address/";
  }

  async getAddressList(): Promise<InterfaceAddress[]> {
    return await this.get("");
  }

  async getAddressDetail(id: number): Promise<InterfaceAddress> {
    return await this.get(`${id}`);
  }

  async registerAddress(address: InterfaceAddress): Promise<InterfaceAddress> {
    const requestAddress = validatedAddress(address);
    return await this.post("register/", requestAddress);
  }
}
