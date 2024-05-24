import InterfaceAnimal from "../../interfaces/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../../interfaces/InterfaceAnimalImage";
import {
  MapAgeChoice,
  MapCoatChoice,
  MapGenderChoice,
  MapSizeChoice,
  MapSpecieChoice,
} from "../../models/map_choices/MapChoices";
const ageMap = new MapAgeChoice();
const coatMap = new MapCoatChoice();
const genderMap = new MapGenderChoice();
const sizeMap = new MapSizeChoice();
const specieMap = new MapSpecieChoice();

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

  animal.age = ageMap.getKeyByValue(animal.age);
  animal.size = sizeMap.getKeyByValue(animal.size);
  animal.gender = genderMap.getKeyByValue(animal.gender);
  animal.specie = specieMap.getKeyByValue(animal.specie);

  if (animal.coat !== undefined) {
    animal.coat = coatMap.getKeyByValue(animal.coat);
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

  ageMap.getValueByKey(animal.age);
  sizeMap.getValueByKey(animal.size);
  genderMap.getValueByKey(animal.gender);
  specieMap.getValueByKey(animal.specie);

  if (animal.coat !== undefined) {
    animal.coat = coatMap.getValueByKey(animal.coat);
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
