import axios from "axios";
import AxiosBase from "./AxiosBase";
import { Animal } from "../models/Animal";
import { ImageAnimal } from "../models/ImageAnimal";

class AxiosAnimalImage extends AxiosBase<ImageAnimal> {
  constructor() {
    super();
    this.host = this.host + "/animal/image/";
  }
}

class AxiosAnimal extends AxiosBase<Animal> {
  public axiosAnimalImage: AxiosAnimalImage;

  constructor() {
    super();
    this.host = this.host + "/animal/";
    this.axiosAnimalImage = new AxiosAnimalImage();
  }

  async registerAnimal(animal: Animal) {
    return await this.post("register/", animal);
  }

  async deleteAnimal(id: number) {
    return await this.delete("delete/" + id);
  }

  async updateAnimal(animal: Animal) {
    return await this.put("update/", animal);
  }

  async getChoices() {
    return await this.get("choices/");
  }
}

export default AxiosAnimal;
