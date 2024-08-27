import { InterfaceAdoption } from "../interfaces/adoption/InterfaceAdoption";
import AdoptionStatusChoiceMap from "../../models/map_choices/AdoptionStatusChoiceMap";

const statusMap = new AdoptionStatusChoiceMap();

export function validatedRegisterAdoption(
  adoption: InterfaceAdoption
): InterfaceAdoption {
  if (adoption.id !== undefined) {
    throw new Error("Adoção para registro não pode ter um id");
  }

  if (adoption.donor < 0) {
    throw new Error("Doador não pode ter o id negativo");
  }

  if (adoption.adopter < 0) {
    throw new Error("Adodante não pode ter o id negativo");
  }

  if (adoption.animal < 0) {
    throw new Error("Animal não pode ter o id negativo");
  }

  adoption.request_status = statusMap.getKeyByValue(
    adoption.request_status ?? "Pendente"
  );

  return adoption;
}

export function validatedUpdateAdoption(
  adoption: InterfaceAdoption
): InterfaceAdoption {
  if (adoption.id === undefined) {
    throw new Error("Id da doação está indefinido");
  }

  if (adoption.id < 0) {
    throw new Error("Id da doação não pode ser negativo");
  }

  if (adoption.donor < 0) {
    throw new Error("Doador não pode ter o id negativo");
  }

  if (adoption.adopter < 0) {
    throw new Error("Adodante não pode ter o id negativo");
  }

  if (adoption.animal < 0) {
    throw new Error("Animal não pode ter o id negativo");
  }

  if (adoption.request_status === undefined) {
    throw new Error("Status de adoção não pode ser indefinido");
  }

  const status = statusMap.getValueByKey(adoption.request_status);
  if (status === undefined) {
    throw new Error("Status não pode ser definido");
  }

  adoption.request_status = status;
  return adoption;
}
