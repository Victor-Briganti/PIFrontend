import InterfaceAddress from "../interfaces/address/InterfaceAddress";
import StateChoiceMap from "../../models/map_choices/StateChoiceMap";
import { validatedString, validatedNumber } from "../../utils/Verification";

export default function validatedAddress(
  address: InterfaceAddress,
): InterfaceAddress {
  const mapState = new StateChoiceMap();

  const uf = mapState.getKeyByValue(address.city.state.uf);
  if (uf === undefined) {
    throw new Error("Estado não pode ser definido");
  }

  address.city.state.uf = uf;

  if (address.id !== undefined && address.id < 0) {
    throw new Error("ID não pode ser negativo");
  }

  if (validatedString(address.city.name, 50) === false) {
    throw new Error(`Cidade com nome inválido: ${address.city.name}`);
  }

  if (validatedNumber(address.zip_code) === false) {
    throw new Error(`CEP inválido: ${address.zip_code}`);
  }

  if (address.street === "") {
    throw new Error(`Logradouro com nome inválido: ${address.city.name}`);
  }

  if (address.house_number === "") {
    throw new Error(`Número da casa não pode ser vazio`);
  }

  if (address.house_number.length > 10) {
    throw new Error(`Número da casa tem limite de 10 caracteres`);
  }

  return address;
}
