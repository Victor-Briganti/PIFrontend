import InterfaceAnimal from "../interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../interfaces/animal/InterfaceAnimalImage";
import AgeChoiceMap from "../../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../../models/map_choices/SpecieChoiceMap";

const ageMap = new AgeChoiceMap();
const coatMap = new CoatChoiceMap();
const genderMap = new GenderChoiceMap();
const sizeMap = new SizeChoiceMap();
const specieMap = new SpecieChoiceMap();

export function validatedRegisterAnimal(
  animal: InterfaceAnimal
): InterfaceAnimal {
  if (animal.id !== undefined && animal.id < 0) {
    throw new Error("Animal não pode ter o id negativo");
  }

  if (animal.donor !== undefined && animal.donor < 0) {
    throw new Error("Doador não pode ter o id negativo");
  }

  if (animal.weight !== undefined && animal.weight < 0) {
    throw new Error("Peso não pode ser negativo");
  }

  if (animal.is_house_trained === undefined) {
    animal.is_house_trained = false;
  }

  if (animal.is_special_needs === undefined) {
    animal.is_special_needs = false;
  }

  if (animal.is_active === undefined) {
    animal.is_active = true;
  }

  if (animal.is_adopted === undefined) {
    animal.is_adopted = false;
  }

  const age = ageMap.getKeyByValue(animal.age);
  if (age === undefined) {
    throw new Error("Idade não pode ser definida");
  }
  animal.age = age;

  const size = sizeMap.getKeyByValue(animal.size);
  if (size === undefined) {
    throw new Error("Tamanho não pode ser definido");
  }
  animal.size = size;

  const gender = genderMap.getKeyByValue(animal.gender);
  if (gender === undefined) {
    throw new Error("Genêro não pode ser definido");
  }
  animal.gender = gender;

  const specie = specieMap.getKeyByValue(animal.specie);
  if (specie === undefined) {
    throw new Error("Espécie não pode ser definido");
  }
  animal.specie = specie;

  if (animal.coat !== undefined) {
    const coat = coatMap.getKeyByValue(animal.coat);
    if (coat === undefined) {
      throw new Error("Pelagem não pode ser definido");
    }

    animal.coat = coat;
  }

  return animal;
}

export function validatedUpdateAnimal(
  animal: InterfaceAnimal
): InterfaceAnimal {
  if (animal.id !== undefined && animal.id < 0) {
    throw new Error("Animal não pode ter o id negativo");
  }

  if (animal.donor !== undefined && animal.donor < 0) {
    throw new Error("Doador não pode ter o id negativo");
  }

  if (animal.weight !== undefined && animal.weight < 0) {
    throw new Error("Peso não pode ser negativo");
  }

  if (animal.is_house_trained === undefined) {
    animal.is_house_trained = false;
  }

  if (animal.is_special_needs === undefined) {
    animal.is_special_needs = false;
  }

  if (animal.is_active === undefined) {
    animal.is_active = true;
  }

  if (animal.is_adopted === undefined) {
    animal.is_adopted = false;
  }

  const age = ageMap.getValueByKey(animal.age);
  if (age === undefined) {
    throw new Error("Idade não pode ser definido");
  }

  const size = sizeMap.getValueByKey(animal.size);
  if (size === undefined) {
    throw new Error("Tamanho não pode ser definido");
  }

  const gender = genderMap.getValueByKey(animal.gender);
  if (gender === undefined) {
    throw new Error("Genêro não pode ser definido");
  }

  const specie = specieMap.getValueByKey(animal.specie);
  if (specie === undefined) {
    throw new Error("Espécie não pode ser definido");
  }

  if (animal.coat !== undefined) {
    const coat = coatMap.getValueByKey(animal.coat);
    if (coat === undefined) {
      throw new Error("Pelagem não pode ser definido");
    }
  }

  return animal;
}

export function validatedAnimalImage(
  animalImage: InterfaceAnimalImageFile
): InterfaceAnimalImageFile {
  if (animalImage.id !== undefined && animalImage.id < 0) {
    throw new Error("Imagem de animal não pode ter um id negativo");
  }

  if (animalImage.animal < 0) {
    throw new Error("Animal não pode ter um id negativo");
  }

  return animalImage;
}
