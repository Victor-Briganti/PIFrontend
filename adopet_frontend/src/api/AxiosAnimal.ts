import InterfaceAnimal from "../interfaces/InterfaceAnimal";
import {
  InterfaceAnimalImageFile,
  InterfaceAnimalImageLink,
} from "../interfaces/InterfaceAnimalImage";
import SuperAxios from "./super/SuperAxios";
import {
  validatedRegisterAnimal,
  validatedUpdateAnimal,
  validatedAnimalImage,
} from "../interfaces/validators/ValidatedAnimal";

class AxiosAnimalImage extends SuperAxios<
  InterfaceAnimalImageFile | InterfaceAnimalImageLink
> {
  constructor() {
    super();
    this.host = this.host + "/animal/images/";
  }

  async uploadImage(
    image: InterfaceAnimalImageFile
  ): Promise<InterfaceAnimalImageLink> {
    const validAnimalImage = validatedAnimalImage(image);
    return await this.post("upload/", validAnimalImage, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async deleteImage(id: number) {
    if (id < 0) {
      throw new Error("Imagem de Animal com id inválido: " + id);
    }

    return await this.delete("delete/" + id);
  }

  async updateImage(
    image: InterfaceAnimalImageFile
  ): Promise<InterfaceAnimalImageLink> {
    if (image.id === undefined) {
      throw new Error("Imagem de animal com id inválido");
    }

    const validAnimalImage = validatedAnimalImage(image);
    return await this.put("update/" + validAnimalImage.id, validAnimalImage, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  async filterBy(id: number): Promise<InterfaceAnimalImageLink[]> {
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
      throw new Error("Animal com id inválido: " + id);
    }

    return await this.get(id.toString());
  }

  async registerAnimal(animal: InterfaceAnimal): Promise<InterfaceAnimal> {
    const validAnimal = validatedRegisterAnimal(animal);
    return await this.post("register/", validAnimal);
  }

  async deleteAnimal(id: number) {
    if (id < 0) {
      throw new Error("Animal com id inválido: " + id);
    }

    return await this.delete("delete/" + id);
  }

  async updateAnimal(animal: InterfaceAnimal): Promise<InterfaceAnimal> {
    if (animal.id === undefined) {
      throw new Error("Animal com id inválido");
    }

    const validAnimal = validatedUpdateAnimal(animal);
    return await this.put("update/" + validAnimal.id, validAnimal);
  }

  async uploadImage(
    image: InterfaceAnimalImageFile
  ): Promise<InterfaceAnimalImageLink> {
    return this.axiosImage.uploadImage(image);
  }

  async deleteImage(id: number) {
    return this.axiosImage.deleteImage(id);
  }

  async updateImage(
    image: InterfaceAnimalImageFile
  ): Promise<InterfaceAnimalImageLink> {
    return this.axiosImage.updateImage(image);
  }

  async listImageById(id: number): Promise<InterfaceAnimalImageLink[]> {
    return this.axiosImage.filterBy(id);
  }
}

export default AxiosAnimal;
