import SuperAxios from "./super/SuperAxios";
import InterfaceAdoption from "../models/interfaces/adoption/InterfaceAdoption";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { validatedRegisterAdoption } from "../models/validators/ValidateAdoption";

export default class AxiosAdoption extends SuperAxios<InterfaceAdoption> {
  constructor() {
    super();
    this.host = this.host + "/adoption/";
  }

  async getAdoptionList(): Promise<InterfaceAdoption[]> {
    return await this.get("");
  }

  async getAdoptionAnimalsList(page: number): Promise<InterfaceAnimal[]> {
    return await this.get(page > 0 ? `animals/?page=${page}` : "animals/");
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
