import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import {
  InterfaceAnimalImageFile,
  InterfaceAnimalImageLink,
} from "../models/interfaces/animal/InterfaceAnimalImage";
import InterfaceUser from "../models/interfaces/user/InterfaceUser";
import {
  validatedAnimalImage,
  validatedRegisterAnimal,
  validatedUpdateAnimal,
} from "../models/validators/ValidatedAnimal";
import SuperAxios from "./super/SuperAxios";

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

  async listAnimals(search: string[] = [], page: number = 1) {
    console.log(search);
    let listSearch: string = "?search=";
    for (let i = 0; i < search.length; i++) {
      if (i === 0) {
        listSearch += `${search[i]}`;
      } else if (search[i] !== "") {
        listSearch += `,${search[i]}`;
      }
    }
    listSearch += `&page=${page}`;
    console.log(listSearch);

    return await this.get(listSearch);
  }

  async listAnimalsByDonor(page: number = 0): Promise<InterfaceAnimal[]> {
    return await this.get(page > 0 ? `donor/?page=${page}` : "donor/");
  }

  async listAnimalsCarousel(): Promise<InterfaceAnimal[]> {
    return await this.get("carousel/");
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

  async getUserDonor(id: number): Promise<InterfaceUser> {
    return await this.get(id + "/donor/");
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
