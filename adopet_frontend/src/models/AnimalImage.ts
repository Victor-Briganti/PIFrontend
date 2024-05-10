interface FormDataAnimalImage {
  id?: number;
  animal: number;
  image: string;
}

export default class ModelAnimalImage {
  private id?: number;
  private animal: number;
  private image: string;

  constructor(data: FormDataAnimalImage) {
    if (data.id !== undefined && data.id < 0) {
      throw new Error("AnimalImage não pode ter um ID negativo");
    }

    if (data.animal < 0) {
      throw new Error("Animal não pode ter um ID negativo");
    }

    if (data.image === "") {
      throw new Error("Imagem não pode ser vazia");
    }

    this.id = data.id;
    this.animal = data.animal;
    this.image = data.image;
  }

  getId(): number | undefined {
    return this.id;
  }

  getAnimal(): number {
    return this.animal;
  }

  getImage(): string {
    return this.image;
  }

  setId(id: number) {
    if (id < 0) {
      throw new Error("AnimalImage não pode ter um ID negativo");
    }

    this.id = id;
  }

  setAnimal(animal: number) {
    if (animal < 0) {
      throw new Error("Animal não pode ter um ID negativo");
    }
    this.animal = animal;
  }

  setImage(image: string) {
    if (image !== "") {
      throw new Error("Image não pode ser vazia");
    }

    this.image = image;
  }
}
