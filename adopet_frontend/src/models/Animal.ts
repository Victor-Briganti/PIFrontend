export default interface InterfaceAnimal {
  id?: number;
  donor?: number;
  name: string;
  age: string;
  gender: string;
  size: string;
  specie: string;
  coat?: string;
  temperament?: string;
  weight?: number;
  register_date?: Date;
  description?: string;
  is_house_trained?: boolean;
  is_special_needs?: boolean;
  is_active?: boolean;
  is_vaccinated?: boolean;
  is_castrated?: boolean;
  is_adopted?: boolean;
}
