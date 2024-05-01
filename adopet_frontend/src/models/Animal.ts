import AgeChoiceMap from "./Choices/AgeChoiceMap";
import CoatChoiceMap from "./Choices/CoatChoiceMap";
import GenderChoiceMap from "./Choices/GenderChoiceMap";
import SizeChoiceMap from "./Choices/SizeChoiceMap";
import SpecieChoiceMap from "./Choices/SpecieChoiceMap";

import { validatedName } from "../utils/Verification";

interface AnimalFormData {
  donor?: number;
  name: string;
  age: string;
  gender: string;
  size: string;
  specie: string;
  coat?: string;
  temperament?: string;
  weight?: number;
  register_date?: string;
  description?: string;
  is_house_trained?: boolean;
  is_special_needs?: boolean;
  is_active?: boolean;
  is_vaccinated?: boolean;
  is_castrated?: boolean;
  is_adopted?: boolean;
}

export default class Animal {
  private ageMap: AgeChoiceMap = new AgeChoiceMap();
  private coatMap: CoatChoiceMap = new CoatChoiceMap();
  private genderMap: GenderChoiceMap = new GenderChoiceMap();
  private sizeMap: SizeChoiceMap = new SizeChoiceMap();
  private specieMap: SpecieChoiceMap = new SpecieChoiceMap();

  private donor?: number;
  private name: string;
  private age: string;
  private gender: string;
  private size: string;
  private specie: string;
  private coat?: string;
  private temperament?: string;
  private weight?: number;
  private register_date?: string;
  private description?: string;
  private is_house_trained?: boolean;
  private is_special_needs?: boolean;
  private is_active?: boolean;
  private is_vaccinated?: boolean;
  private is_castrated?: boolean;
  private is_adopted?: boolean;

  constructor(data: AnimalFormData) {
    if (data.donor !== undefined && data.donor < 0) {
      throw new Error("Doador não pode ter o id negativo");
    }

    if (validatedName(data.name, 100) === false) {
      throw new Error(`Nome inválido: ${data.name}`);
    }

    if (data.register_date !== undefined) {
      const dateValidate = new Date(data.register_date);
      if (!isNaN(dateValidate.getTime())) {
        this.register_date = data.register_date;
      } else {
        throw new Error(`Data de registro inválida: ${data.register_date}`);
      }
    }

    if (data.weight !== undefined && data.weight < 0) {
      throw new Error(`Peso não pode ser negativo.`);
    }

    this.donor = data.donor;
    this.name = data.name;
    this.weight = data.weight;

    if (data.is_house_trained !== undefined) {
      this.is_house_trained = data.is_house_trained;
    } else {
      this.is_house_trained = false;
    }

    if (data.is_special_needs !== undefined) {
      this.is_special_needs = data.is_special_needs;
    } else {
      this.is_special_needs = false;
    }

    if (data.is_active !== undefined) {
      this.is_active = data.is_active;
    } else {
      this.is_active = true;
    }

    if (data.is_vaccinated !== undefined) {
      this.is_vaccinated = data.is_vaccinated;
    } else {
      this.is_vaccinated = false;
    }

    if (data.is_castrated !== undefined) {
      this.is_castrated = data.is_castrated;
    } else {
      this.is_castrated = false;
    }

    if (data.is_adopted !== undefined) {
      this.is_adopted = data.is_adopted;
    } else {
      this.is_adopted = false;
    }

    const ageMapped = this.ageMap.getValue(data.age);
    const genderMapped = this.genderMap.getValue(data.gender);
    const sizeMapped = this.sizeMap.getValue(data.size);
    const specieMapped = this.specieMap.getValue(data.specie);

    if (data.coat !== undefined) {
      this.coat = this.coatMap.getValue(data?.coat);
    }

    this.age = ageMapped;
    this.gender = genderMapped;
    this.size = sizeMapped;
    this.specie = specieMapped;
  }

  getDonor(): number | undefined {
    return this.donor;
  }

  getName(): string {
    return this.name;
  }

  getAge(): string {
    return this.ageMap.getKey(this.age);
  }

  getGender(): string {
    return this.genderMap.getKey(this.gender);
  }

  getSize(): string {
    return this.sizeMap.getKey(this.size);
  }

  getSpecie(): string {
    return this.specieMap.getKey(this.specie);
  }

  getCoat(): string | undefined {
    if (this.coat !== undefined) {
      return this.coatMap.getKey(this.coat);
    } else {
      return undefined;
    }
  }

  getTemperament(): string | undefined {
    return this.temperament;
  }

  getWeight(): number | undefined {
    return this.weight;
  }

  getRegisterDate(): string | undefined {
    return this.register_date;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getIsHouseTrained(): boolean | undefined {
    return this.is_house_trained;
  }

  getIsSpecialNeeds(): boolean | undefined {
    return this.is_special_needs;
  }

  getIsActive(): boolean | undefined {
    return this.is_active;
  }

  getIsVaccinated(): boolean | undefined {
    return this.is_vaccinated;
  }

  getIsCastrated(): boolean | undefined {
    return this.is_castrated;
  }

  getIsAdopted(): boolean | undefined {
    return this.is_adopted;
  }

  setDonor(donor: number) {
    if (donor < 0) {
      throw new Error("Doador não pode ter o id negativo");
    }

    this.donor = donor;
  }

  setName(name: string) {
    if (validatedName(name, 100) === false) {
      throw new Error(`Nome inválido: ${name}`);
    }

    this.name = name;
  }

  setage(age: string) {
    const agemapped = this.agemap.getvalue(age);
    this.age = agemapped;
  }

  setGender(gender: string) {
    const genderMapped = this.genderMap.getValue(gender);
    this.gender = genderMapped;
  }

  setSize(size: string) {
    const sizeMapped = this.sizeMap.getValue(size);
    this.size = sizeMapped;
  }

  setSpecie(specie: string) {
    const specieMapped = this.specieMap.getValue(specie);
    this.specie = specieMapped;
  }

  setCoat(coat: string) {
    const coatMapped = this.coatMap.getValue(coat);
    this.coat = coatMapped;
  }

  settemperament(temperament: string) {
    this.temperament = temperament;
  }

  setRegisterDate(register_date: string) {
    const dateValidate = new Date(register_date);
    if (!isNaN(dateValidate.getTime())) {
      this.register_date = register_date;
    } else {
      throw new Error(`Data de registro inválida: ${register_date}`);
    }
  }

  setIsHouseTrained(is_house_trained: boolean) {
    this.is_house_trained = is_house_trained;
  }

  setIsSpecialNeeds(is_special_needs: boolean) {
    this.is_special_needs = is_special_needs;
  }

  setIsActive(is_active: boolean) {
    this.is_active = is_active;
  }

  setIsVaccinated(is_vaccinated: boolean) {
    this.is_vaccinated = is_vaccinated;
  }

  setIsCastrated(is_castrated: boolean) {
    this.is_castrated = is_castrated;
  }

  setIsAdopted(is_adopted: boolean) {
    this.is_adopted = is_adopted;
  }
}
