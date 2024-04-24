import AxiosBase from "./AxiosBase";
import { Adopter } from "../models/Adopter";

class AxiosAdopter extends AxiosBase<Adopter> {
  constructor() {
    super();
    this.host = this.host + "/adopter/";
  }

  async getAdopterInfo() {
    return await this.get("");
  }

  async registerAdopter(adopter: Adopter) {
    return await this.post("register/", adopter);
  }

  async removeAdopter(id: number) {
    return await this.delete("register/", id);
  }

  async updateAdopter(adopter: Adopter) {
    return await this.delete("update/", adopter);
  }
}

export default AxiosAdopter;
