import InterfaceAdoption from "../adoption/InterfaceAdoption";
import AdoptionStatusChoiceMap from "../../models/map_choices/AdoptionStatusChoiceMap";

const statusMap = new AdoptionStatusChoiceMap();

export function validatedRegisterAdoption(
  adoption: InterfaceAdoption
): InterfaceAdoption {
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

  adoption.request_status = statusMap.getValueByKey(adoption.request_status);

  return adoption;
}
