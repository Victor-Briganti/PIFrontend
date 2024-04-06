export class ImageAnimal {
  id?: number;
  image?: string;
  animal?: number;

  constructor(data: any) {
    this.id = data.id;
    this.image = data.image;
    this.animal = data.animal;
  }
}
