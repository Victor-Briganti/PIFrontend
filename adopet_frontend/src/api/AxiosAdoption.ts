import SuperAxios from "./super/SuperAxios";
import InterfaceAdoption from "../models/interfaces/adoption/InterfaceAdoption";
import { validatedRegisterAdoption } from "../models/validators/ValidateAdoption";

export default class AxiosAdoption extends SuperAxios<InterfaceAdoption> {
  constructor() {
    super();
    this.host = this.host + "/adoption/";
  }

  async getAdoptionList(): Promise<InterfaceAdoption[]> {
    return await this.get("");
  }

  async getAdoptionDetailById(id: number): Promise<InterfaceAdoption> {
    return await this.get(`${id}`);
  }

  async getAdoptionDetailByAnimalId(id: number): Promise<InterfaceAdoption> {
    return await this.get(`animal/${id}`);
  }

  async getUserAdoptionDetail(id: number): Promise<InterfaceAdoption> {
    return await this.get(`adopter/${id}`);
  }

  async registerAdoption(
    adoption: InterfaceAdoption
  ): Promise<InterfaceAdoption> {
    const requestAdoption = validatedRegisterAdoption(adoption);
    return await this.post("register/", requestAdoption);
  }
}
