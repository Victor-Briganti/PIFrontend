import { validatedNumber, validatedCPF } from "../utils/Verification";

interface UserMetadataFormData {
  user: number;
  address: number;
  cpf: string;
  birth_date: Date;
  phone: string;
  is_active?: boolean;
}

export default class UserMetadata {
  private user: number;
  private address: number;
  private cpf: string;
  private birth_date: Date;
  private phone: string;
  private is_active?: boolean;

  constructor(data: UserMetadataFormData) {
    if (data.user < 0) {
      throw new Error("Usuário não pode ser um id negativo");
    }

    if (data.address < 0) {
      throw new Error("Endereço não pode ser um id negativo");
    }

    if (validatedCPF(data.cpf)) {
      throw new Error(`CPF inválido: ${data.cpf}`);
    }

    if (validatedNumber(data.phone)) {
      throw new Error(`Telefone inválido: ${data.phone}`);
    }

    this.birth_date = data.birth_date;

    if (data.is_active !== undefined) {
      this.is_active = data.is_active;
    } else {
      this.is_active = true;
    }

    this.user = data.user;
    this.address = data.address;
    this.cpf = data.cpf;
    this.birth_date = data.birth_date;
    this.phone = data.phone;
  }

  getUser(): number {
    return this.user;
  }

  getAddress(): number {
    return this.address;
  }

  getCpf(): string {
    return this.cpf;
  }

  getbirthDate(): Date {
    return this.birth_date;
  }

  getPhone(): string {
    return this.phone;
  }

  getIsActive(): boolean | undefined {
    return this.is_active;
  }

  setAddress(address: number) {
    if (address < 0) {
      throw new Error("Endereço não poder ser um id negativo");
    }

    this.address = address;
  }

  setCpf(cpf: string) {
    if (validatedCPF(cpf)) {
      throw new Error(`CPF inválido: ${cpf}`);
    }

    this.cpf = cpf;
  }

  setbirthDate(birth_date: Date) {
    this.birth_date = birth_date;
  }

  setPhone(phone: string) {
    if (validatedNumber(phone)) {
      throw new Error(`Telefone inválido: ${phone}`);
    }

    this.phone = phone;
  }

  setIsActive(is_active: boolean) {
    this.is_active = is_active;
  }
}
