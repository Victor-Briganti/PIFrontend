export class Animal {
  id: number;
  temperament: string[];
  name: string;
  age: number;
  specie: string;
  genre: string;
  size: string;
  coat: string;
  weight: number;
  adoption_date: string;
  description: string;
  is_house_trained: boolean;
  is_special_neeeds: boolean;
  is_active: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.temperament = data.temperament;
    this.name = data.name;
    this.age = data.age;
    this.specie = data.specie;
    this.genre = data.genre;
    this.size = data.size;
    this.coat = data.coat;
    this.weight = data.weight;
    this.adoption_date = data.adoption_date;
    this.description = data.description;
    this.is_house_trained = data.is_house_trained;
    this.is_special_neeeds = data.is_special_neeeds;
    this.is_active = data.is_active;
  }
}
