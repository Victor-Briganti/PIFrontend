type AnimalFormData = {
  id?: number;
  temperament?: string;
  name?: string;
  age?: string;
  specie?: string;
  gender?: string;
  size?: string;
  coat?: string;
  weight?: number;
  adoption_date?: string;
  register_date?: string;
  description?: string;
  is_house_trained?: boolean;
  is_special_needs?: boolean;
  is_vaccinated?: boolean;
  is_castrated?: boolean;
  is_active?: boolean;
}

export class Animal {
  private id?: number;
  private temperament?: string;
  private name: string;
  private age: string;
  private specie: string;
  private gender: string;
  private size?: string;
  private coat?: string;
  private weight?: number;
  private adoption_date?: string;
  private register_date?: string;
  private description?: string;
  private is_house_trained: boolean;
  private is_special_needs: boolean;
  private is_vaccinated: boolean;
  private is_castrated: boolean;
  private is_active: boolean;

  constructor(data: AnimalFormData) {
    this.id = data.id;

    if (data.temperament !== undefined && data.temperament !== null) {
      if (data.temperament.length > 200)
        throw new Error("Temperamento tem um limite de 200 caracteres");

      this.temperament = data.temperament;
    } else {
      this.temperament = "";
    }

    if (data.name !== undefined && data.name !== null &&
      this.validateName(data.name) &&
      data.name !== "" && data.name.length <= 100) {
      this.name = data.name;
    } else {
      throw new Error("Campo nome inválido");
    }

    if (data.age !== undefined && data.age !== null) {
      this.age = data.age;
    } else {
      throw new Error("Campo idade inválido");
    }

    if (data.specie !== undefined && data.specie !== null) {
      this.specie = data.specie;
    } else {
      throw new Error("Campo espécie inválido");
    }

    if (data.gender !== undefined && data.gender !== null) {
      this.gender = data.gender;
    } else {
      throw new Error("Campo genêro inválido");
    }

    if (data.weight !== undefined && data.weight !== null) {
      if (data.weight < 0)
        throw new Error("Campo peso inválido");

      this.weight = data.weight;
    } else {
      this.weight = undefined;
    }

    this.size = data.size;
    this.coat = data.coat;
    this.adoption_date = data.adoption_date;
    this.register_date = data.register_date;
    this.description = data.description;

    if (data.is_house_trained !== undefined && data.is_house_trained !== null) {
    this.is_house_trained = data.is_house_trained;
    } else {
      this.is_house_trained = false;
    }

    if (data.is_special_needs !== undefined && data.is_special_needs !== null) {
    this.is_special_needs = data.is_special_needs;
    } else {
      this.is_special_needs = false;
    }

    if (data.is_castrated !== undefined && data.is_castrated !== null) {
    this.is_castrated = data.is_castrated;
    } else {
      this.is_castrated = false;
    }

    if (data.is_vaccinated !== undefined && data.is_vaccinated !== null) {
    this.is_vaccinated = data.is_vaccinated;
    } else {
      this.is_vaccinated = false;
    }

    if (data.is_active !== undefined && data.is_active !== null) {
    this.is_active = data.is_active;
    } else {
      this.is_active = true;
    }
  }

  private validateName(value: string): boolean {
    const numberRegex = /{0-9}/;
    if(numberRegex.test(value) || !value.trim())
      return false;

    return true;
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
    if (value.length > 100)
      throw new Error("Temperamento tem um limite de 100 caracteres")

    this.temperament = value;
  }

  setName(value: string) {
    if (!this.validateName(value))
      throw new Error("Nome inválido")

    this.name = value;
  }

  setAge(value: string) {
    this.age = value;
  }

  setSpecie(value: string) {
    if (!this.validateName(value))
      throw new Error("Espécie inválida")

    this.specie = value;
  }

  setGender(value: string) {
    if (!this.validateName(value))
      throw new Error("Genêro inválido")

    this.gender = value;
  }

  setSize(value: string) {
    this.size = value;
  }

  setCoat(value: string) {
    this.coat = value;
  }

  setWeight(value: number) {
    if (value < 0)
      throw new Error("Peso inválido");

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
