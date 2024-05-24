import {
  validatedEmail,
  validatedString,
  validatedCPF,
  validatedNumber,
} from "../../utils/Verification";
import InterfaceUserCommon from "../interfaces/user/InterfaceUserCommon";
import InterfaceUserMetadata from "../interfaces/user/InterfaceUserMetadata";

export function getFormattedBirthDate(birth_date: Date): string {
  const year = birth_date.getFullYear();
  const month = String(birth_date.getMonth() + 1).padStart(2, "0");
  const day = String(birth_date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validatedUserCommon(
  userCommon: InterfaceUserCommon
): InterfaceUserCommon {
  if (userCommon.id !== undefined && userCommon.id < 0) {
    throw new Error(`ID não pode ser negativo`);
  }

  if (validatedEmail(userCommon.email) === false) {
    throw new Error(`Email inválido: ${userCommon.email}`);
  }

  if (validatedString(userCommon.firstname, 100) === false) {
    throw new Error(`Primeiro nome inválido: ${userCommon.firstname}`);
  }

  if (validatedString(userCommon.lastname, 100) === false) {
    throw new Error(`Último nome inválido: ${userCommon.lastname}`);
  }

  if (userCommon.is_active === undefined) {
    userCommon.is_active = true;
  }

  if (userCommon.is_superuser === undefined) {
    userCommon.is_superuser = true;
  }

  if (userCommon.is_staff === undefined) {
    userCommon.is_staff = true;
  }

  if (
    userCommon.password !== undefined &&
    (userCommon.password === "" || userCommon.password?.length < 8)
  ) {
    throw new Error("Senha inválida");
  }

  return userCommon;
}

export function validatedUserMetadata(
  userMetadata: InterfaceUserMetadata
): InterfaceUserMetadata {
  if (userMetadata.user < 0) {
    throw new Error("Usuário não pode ser um id negativo");
  }

  if (userMetadata.address < 0) {
    throw new Error("Endereço não pode ser um id negativo");
  }

  if (validatedCPF(userMetadata.cpf) === false) {
    throw new Error(`CPF inválido: ${userMetadata.cpf}`);
  }

  if (validatedNumber(userMetadata.phone) === false) {
    throw new Error(`Telefone inválido: ${userMetadata.phone}`);
  }

  if (userMetadata.is_active === undefined) {
    userMetadata.is_active = true;
  }

  if (userMetadata.birth_date instanceof Date) {
    userMetadata.birth_date = getFormattedBirthDate(userMetadata.birth_date);
  } else {
    throw new Error("Data de aniversário precisa estar no formato 'Date'");
  }

  return userMetadata;
}
