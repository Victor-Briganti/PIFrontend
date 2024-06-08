import InterfaceAdoption from "../models/interfaces/adoption/InterfaceAdoption";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { validatedUpdateAdoption } from "../models/validators/ValidateAdoption";
import SuperAxios from "./super/SuperAxios";

export default class AxiosDonor extends SuperAxios<InterfaceAdoption> {
  constructor() {
    super();
    this.host = this.host + "/donor/";
  }

  async getAdoptionList(): Promise<InterfaceAdoption[]> {
    return await this.get("");
  }

  async getRequestList(): Promise<InterfaceAdoption[]> {
    return await this.get("requests/");
  }

  async getRequestDetailById(id: number): Promise<InterfaceAdoption> {
    return await this.get(`request/${id}`);
  }

  async acceptRequest(id: number): Promise<InterfaceAdoption> {
    return await this.post(`request/accept/${id}`);
  }

  async rejectRequest(id: number): Promise<InterfaceAdoption> {
    return await this.post(`request/reject/${id}`);
  }

  async getAdoptionAnimalList(page: number = 0): Promise<InterfaceAnimal[]> {
    return await this.get(
      page > 0 ? `animal/list/?page=${page}` : "animal/list/"
    );
  }

  async getAdoptionDetailById(id: number): Promise<InterfaceAdoption> {
    return await this.get(`${id}`);
  }

  async getAdoptionDetailByAnimalId(id: number): Promise<InterfaceAdoption[]> {
    return await this.get(`animal/${id}`);
  }

  async deleteAdoption(id: number): Promise<InterfaceAdoption> {
    return await this.get(`delete/${id}`);
  }

  async updateAdoption(
    adoption: InterfaceAdoption
  ): Promise<InterfaceAdoption> {
    const requestAdoption = validatedUpdateAdoption(adoption);
    return await this.post(`update/${requestAdoption.id}`, requestAdoption);
  }
}
