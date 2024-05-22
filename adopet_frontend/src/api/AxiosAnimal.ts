import ModelAnimal from "../models/Animal";
import ModelAnimalImage from "../models/AnimalImage";
import SuperAxios from "./super/SuperAxios";
import Pagination from "../models/Pagination";

class AxiosAnimalImage extends SuperAxios<ModelAnimalImage> {
  constructor() {
    super();
    this.host = this.host + "/animal/images/";
  }

  async uploadImage(image: ModelAnimalImage): Promise<ModelAnimalImage> {
    return await this.post("upload/", image, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async deleteImage(id: number) {
    if (id < 0) {
      throw new Error("Imagem de Animal com ID inválido: " + id);
    }

    return await this.delete("delete/" + id);
  }

  async updateImage(image: ModelAnimalImage): Promise<ModelAnimalImage> {
    if (image.getId() === undefined || (image.getId() ?? -1) < 0) {
      throw new Error("Imagem de Animal com ID inválido: " + image.getId());
    }

    return await this.put("update/" + image.getId(), image, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async filterBy(id: number): Promise<ModelAnimalImage[]> {
    return await this.get("filterby/" + id);
  }
}

class AxiosAnimal extends SuperAxios<ModelAnimal> {
  private axiosImage: AxiosAnimalImage;

  constructor() {
    super();
    this.host = this.host + "/animal/";
    this.axiosImage = new AxiosAnimalImage();
  }

  async listAnimals(page: number = 0) {
    return await this.get(page > 0 ? `?page=${page}` : "");
  }

  async getAnimalByID(id: number): Promise<ModelAnimal> {
    if (id < 0) {
      throw new Error("Animal com ID inválido: " + id);
    }

    return await this.get(id.toString());
  }

  async registerAnimal(animal: ModelAnimal): Promise<ModelAnimal> {
    return await this.post("register/", animal);
  }

  async deleteAnimal(id: number) {
    if (id < 0) {
      throw new Error("Animal com ID inválido: " + id);
    }

    return await this.delete("delete/" + id);
  }

  async updateAnimal(animal: ModelAnimal): Promise<ModelAnimal> {
    if (animal.getId() === undefined || (animal.getId() ?? -1) < 0) {
      throw new Error("Animal com ID inválido: " + animal.getId());
    }

    return await this.put("update/" + animal.getId(), animal);
  }

  async getChoices(animal: ModelAnimal): Promise<ModelAnimal> {
    if (animal.getId() === undefined || (animal.getId() ?? -1) < 0) {
      throw new Error("Animal com ID inválido: " + animal.getId());
    }

    return await this.put("update/" + animal.getId(), animal);
  }

  async uploadImage(image: ModelAnimalImage): Promise<ModelAnimalImage> {
    return this.axiosImage.uploadImage(image);
  }

  async deleteImage(id: number) {
    return this.axiosImage.deleteImage(id);
  }

  async updateImage(image: ModelAnimalImage): Promise<ModelAnimalImage> {
    return this.axiosImage.updateImage(image);
  }

  async listImageByID(id: number): Promise<ModelAnimalImage[]> {
    return this.axiosImage.filterBy(id);
  }
}

export default AxiosAnimal;
