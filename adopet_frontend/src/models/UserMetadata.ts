import { validatedNumber, validatedCPF } from "../utils/Verification";

interface FormDataUserMetadata {
  user: number;
  address: number;
  cpf: string;
  birth_date: Date;
  phone: string;
  is_active?: boolean;
}

export default class ModelUserMetadata {
  private user: number;
  private address: number;
  private cpf: string;
  private birth_date: string;
  private phone: string;
  private is_active?: boolean;

  constructor(data: FormDataUserMetadata) {
    if (data.user < 0) {
      throw new Error("Usuário não pode ser um id negativo");
    }

    if (data.address < 0) {
      throw new Error("Endereço não pode ser um id negativo");
    }

    if (validatedCPF(data.cpf) === false) {
      throw new Error(`CPF inválido: ${data.cpf}`);
    }

    if (validatedNumber(data.phone) === false) {
      throw new Error(`Telefone inválido: ${data.phone}`);
    }

    if (data.is_active !== undefined) {
      this.is_active = data.is_active;
    } else {
      this.is_active = true;
    }

    this.user = data.user;
    this.address = data.address;
    this.cpf = data.cpf;
    this.birth_date = this.getFormattedBirthDate(data.birth_date);
    this.phone = data.phone;
  }

  private getFormattedBirthDate(birth_date: Date): string {
    const year = birth_date.getFullYear();
    const month = String(birth_date.getMonth() + 1).padStart(2, "0");
    const day = String(birth_date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

  getbirthDate(): string {
    return this.birth_date;
  }

  getPhone(): string {
    return this.phone;
  }

  getIsActive(): boolean | undefined {
    return this.is_active;
  }

  setUser(user: number) {
    if (user < 0) {
      throw new Error("Usuário não poder ser um id negativo");
    }

    this.user = user;
  }

  setAddress(address: number) {
    if (address < 0) {
      throw new Error("Endereço não poder ser um id negativo");
    }

    this.address = address;
  }

  setCpf(cpf: string) {
    if (validatedCPF(cpf) === false) {
      throw new Error(`CPF inválido: ${cpf}`);
    }

    this.cpf = cpf;
  }

  setbirthDate(birth_date: Date) {
    this.birth_date = this.getFormattedBirthDate(birth_date);
  }

  setPhone(phone: string) {
    if (validatedNumber(phone) === false) {
      throw new Error(`Telefone inválido: ${phone}`);
    }

    this.phone = phone;
  }

  setIsActive(is_active: boolean) {
    this.is_active = is_active;
  }
}
