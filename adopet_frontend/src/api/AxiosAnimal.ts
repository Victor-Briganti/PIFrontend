import Animal from "../models/Animal";
import AnimalImage from "../models/AnimalImage";
import SuperAxios from "./super/SuperAxios";
import Pagination from "../models/Pagination";

class AxiosAnimalImage extends SuperAxios<AnimalImage> {
  constructor() {
    super();
    this.host = this.host + "/animal/images/";
  }

  async uploadImage(image: AnimalImage): Promise<AnimalImage> {
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

  async updateImage(image: AnimalImage): Promise<AnimalImage> {
    if (image.getId() === undefined || (image.getId() ?? -1) < 0) {
      throw new Error("Imagem de Animal com ID inválido: " + image.getId());
    }

    return await this.put("update/" + image.getId(), image, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async filterBy(id: number): Promise<AnimalImage[]> {
    return await this.get("filterby/" + id);
  }
}

class AxiosAnimal extends SuperAxios<Animal> {
  private axiosImage: AxiosAnimalImage;

  constructor() {
    super();
    this.host = this.host + "/animal/";
    this.axiosImage = new AxiosAnimalImage();
  }

  async listAnimals(page: number = 0): Promise<Pagination<Animal>> {
    const response = await this.get(page > 0 ? "?page=${page}" : "");
    return new Pagination<Animal>(response);
  }

  async getAnimalByID(id: number): Promise<Animal> {
    if (id < 0) {
      throw new Error("Animal com ID inválido: " + id);
    }

    return await this.get(id.toString());
  }

  async registerAnimal(animal: Animal): Promise<Animal> {
    return await this.post("register/", animal);
  }

  async deleteAnimal(id: number) {
    if (id < 0) {
      throw new Error("Animal com ID inválido: " + id);
    }

    return await this.delete("delete/" + id);
  }

  async updateAnimal(animal: Animal): Promise<Animal> {
    if (animal.getId() === undefined || (animal.getId() ?? -1) < 0) {
      throw new Error("Animal com ID inválido: " + animal.getId());
    }

    return await this.put("update/" + animal.getId(), animal);
  }

  async getChoices(animal: Animal): Promise<Animal> {
    if (animal.getId() === undefined || (animal.getId() ?? -1) < 0) {
      throw new Error("Animal com ID inválido: " + animal.getId());
    }

    return await this.put("update/" + animal.getId(), animal);
  }

  async uploadImage(image: AnimalImage): Promise<AnimalImage> {
    return this.axiosImage.updateImage(image);
  }

  async deleteImage(id: number) {
    return this.axiosImage.deleteImage(id);
  }

  async updateImage(image: AnimalImage): Promise<AnimalImage> {
    return this.axiosImage.updateImage(image);
  }

  async listImageByID(id: number): Promise<AnimalImage[]> {
    return this.axiosImage.filterBy(id);
  }
}

export default AxiosAnimal;
