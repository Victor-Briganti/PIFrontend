import axios from "axios";
import AxiosBase from "./AxiosBase";
import { Animal } from "../models/Animal";
import { ImageAnimal } from "../models/ImageAnimal";

class AxiosAnimalImage extends AxiosBase<ImageAnimal> {
  constructor() {
    super();
    this.host = this.host + "/animal/images/";
  }

  async register(image: ImageAnimal) {
    return await this.post("register/", image, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async filterBy(id: number) {
    return await this.get("filterby/" + id);
  }
}

class AxiosAnimal extends AxiosBase<Animal> {
  public axiosImage: AxiosAnimalImage;

  constructor() {
    super();
    this.host = this.host + "/animal/";
    this.axiosImage = new AxiosAnimalImage();
  }

  async listAnimals(page: number = 0) {
    if (page > 0) {
      return await this.get("?page=" + page);
    }
    return await this.get("");
  }
  
  async listImagesById(id: number) {
    return await this.axiosImage.filterBy(id);
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

  async uploadImage(image: ImageAnimal) {
    return this.axiosImage.register(image);
  }
}

export default AxiosAnimal;
