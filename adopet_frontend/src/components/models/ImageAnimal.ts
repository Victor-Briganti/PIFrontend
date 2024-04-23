export class ImageAnimal {
  private id?: number;
  private image?: string;
  private animalId?: number;

  constructor(data: any) {
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
