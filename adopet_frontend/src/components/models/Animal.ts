export class Animal {
  private id?: number;
  private temperament?: string;
  private name?: string;
  private age?: number;
  private specie?: string;
  private gender?: string;
  private size?: string;
  private coat?: string;
  private weight?: number;
  private adoption_date?: string;
  private register_date?: string;
  private description?: string;
  private is_house_trained?: boolean;
  private is_special_needs?: boolean;
  private is_vaccinated?: boolean;
  private is_castrated?: boolean;
  private is_active?: boolean;

  constructor(data: any | null) {
    if (data === null) return;

    this.id = data.id;
    this.temperament = data.temperament;
    this.name = data.name;
    this.age = data.age;
    this.specie = data.specie;
    this.gender = data.gender;
    this.size = data.size;
    this.coat = data.coat;
    this.weight = data.weight;
    this.adoption_date = data.adoption_date;
    this.register_date = data.register_date;
    this.description = data.description;
    this.is_house_trained = data.is_house_trained;
    this.is_special_needs = data.is_special_needs;
    this.is_vaccinated = data.is_vaccinated;
    this.is_castrated = data.is_castrated;
    this.is_active = data.is_active;
  }

  getId(): number | unknown {
    return this?.id;
  }

  getTemperament(): string | unknown {
    return this?.temperament;
  }

  getName(): string | unknown {
    return this?.name;
  }

  getAge(): number | unknown {
    return this?.age;
  }

  getSpecie(): string | unknown {
    return this?.specie;
  }

  getGender(): string | unknown {
    return this?.gender;
  }

  getSize(): string | unknown {
    return this?.size;
  }

  getCoat(): string | unknown {
    return this?.coat;
  }

  getWeight(): number | unknown {
    return this?.weight;
  }

  getAdoptionDate(): string | unknown {
    return this?.adoption_date;
  }

  getRegisterDate(): string | unknown {
    return this?.register_date;
  }

  getDescription(): string | unknown {
    return this?.description;
  }

  getHouseTrained(): boolean | unknown {
    return this?.is_house_trained;
  }

  getSpecialNeeds(): boolean | unknown {
    return this?.is_special_needs;
  }

  getVaccinated(): boolean | unknown {
    return this?.is_vaccinated;
  }

  getCastrated(): boolean | unknown {
    return this?.is_castrated;
  }

  getActive(): boolean | unknown {
    return this?.is_active;
  }

  setTemperament(value: string) {
    this.temperament = value;
  }

  setName(value: string) {
    this.name = value;
  }

  setAge(value: number) {
    this.age = value;
  }

  setSpecie(value: string) {
    this.specie = value;
  }

  setGender(value: string) {
    this.gender = value;
  }

  setSize(value: string) {
    this.size = value;
  }

  setCoat(value: string) {
    this.coat = value;
  }

  setWeight(value: number) {
    this.weight = value;
  }

  setAdoptionDate(value: string) {
    this.adoption_date = value;
  }

  setDescription(value: string) {
    this.description = value;
  }

  setHouseTrained(value: boolean) {
    this.is_house_trained = value;
  }

  setSpecialNeeds(value: boolean) {
    this.is_special_needs = value;
  }

  setVaccinated(value: boolean) {
    this.is_vaccinated = value;
  }

  setCastrated(value: boolean) {
    this.is_castrated = value;
  }

  setActive(value: boolean) {
    this.is_active = value;
  }
}
