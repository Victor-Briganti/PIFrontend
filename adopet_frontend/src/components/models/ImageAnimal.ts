type ImageFormData = {
  id?: number;
  image?: string;
  animal?: number;
};

export class ImageAnimal {
  private id?: number;
  private image?: string;
  private animalId?: number;

  constructor(data: ImageFormData) {
    if (data === null) return;

    this.id = data.id;
    this.image = data.image;
    this.animalId = data.animal;
  }

  getId(): number | unknown {
    return this?.id;
  }

  getImage(): string | unknown {
    return this?.image;
  }

  getAnimalId(): string | unknown {
    return this?.animalId;
  }
}
