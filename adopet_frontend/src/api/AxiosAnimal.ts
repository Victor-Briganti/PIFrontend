import InterfaceAnimal from "../models/Animal";
import InterfaceAnimalImage from "../models/AnimalImage";
import SuperAxios from "./super/SuperAxios";

class AxiosAnimalImage extends SuperAxios<InterfaceAnimalImage> {
  constructor() {
    super();
    this.host = this.host + "/animal/images/";
  }

  async uploadImage(
    image: InterfaceAnimalImage
  ): Promise<InterfaceAnimalImage> {
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

  async updateImage(
    image: InterfaceAnimalImage
  ): Promise<InterfaceAnimalImage> {
    if (image.id === undefined || (image.id ?? -1) < 0) {
      throw new Error("Imagem de Animal com ID inválido: " + image.id);
    }

    return await this.put("update/" + image.id, image, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async filterBy(id: number): Promise<InterfaceAnimalImage[]> {
    return await this.get("filterby/" + id);
  }
}

class AxiosAnimal extends SuperAxios<InterfaceAnimal> {
  private axiosImage: AxiosAnimalImage;

  constructor() {
    super();
    this.host = this.host + "/animal/";
    this.axiosImage = new AxiosAnimalImage();
  }

  async listAnimals(page: number = 0) {
    return await this.get(page > 0 ? `?page=${page}` : "");
  }

  async getAnimalByID(id: number): Promise<InterfaceAnimal> {
    if (id < 0) {
      throw new Error("Animal com ID inválido: " + id);
    }

    return await this.get(id.toString());
  }

  async registerAnimal(animal: InterfaceAnimal): Promise<InterfaceAnimal> {
    return await this.post("register/", animal);
  }

  async deleteAnimal(id: number) {
    if (id < 0) {
      throw new Error("Animal com ID inválido: " + id);
    }

    return await this.delete("delete/" + id);
  }

  async updateAnimal(animal: InterfaceAnimal): Promise<InterfaceAnimal> {
    if (animal.id === undefined || (animal.id ?? -1) < 0) {
      throw new Error("Animal com ID inválido: " + animal.id);
    }

    return await this.put("update/" + animal.id, animal);
  }

  async uploadImage(
    image: InterfaceAnimalImage
  ): Promise<InterfaceAnimalImage> {
    return this.axiosImage.uploadImage(image);
  }

  async deleteImage(id: number) {
    return this.axiosImage.deleteImage(id);
  }

  async updateImage(
    image: InterfaceAnimalImage
  ): Promise<InterfaceAnimalImage> {
    return this.axiosImage.updateImage(image);
  }

  async listImageByID(id: number): Promise<InterfaceAnimalImage[]> {
    return this.axiosImage.filterBy(id);
  }
}

export default AxiosAnimal;
