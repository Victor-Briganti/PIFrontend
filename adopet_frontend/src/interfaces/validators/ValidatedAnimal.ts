import InterfaceAnimal from "../animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../animal/InterfaceAnimalImage";
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
