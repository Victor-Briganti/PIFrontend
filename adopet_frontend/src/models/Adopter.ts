import { Address } from "./Address";

type AdopterFormData = {
  user?: number;
  birth_date?: string;
  address?: string;
  phone?: string;
  cpf?: string;
  is_active?: boolean;
};

export class Adopter {
  private user: number;
  private birth_date: string;
  private phone: string;
  private cpf: string;
  private is_active: boolean;
  address: Address;

  constructor(data: AdopterFormData, address: Address) {
    if (data.user !== undefined && data.user !== null && !(data.user < 0)) {
      this.user = data.user;
    } else {
      throw new Error("Campo usuário inválido");
    }

    if (
      data.birth_date !== undefined &&
      data.birth_date !== null &&
      this.verifyBirthDate(data.birth_date)
    ) {
      this.birth_date = data.birth_date;
    } else {
      throw new Error("Campo aniversário inválido");
    }

    if (
      data.phone !== undefined &&
      data.phone !== null &&
      this.verifyPhone(data.phone)
    ) {
      this.phone = data.phone;
    } else {
      throw new Error("Campo telefone inválido");
    }

    if (
      data.cpf !== undefined &&
      data.cpf !== null &&
      this.verifyCPF(data.cpf)
    ) {
      this.cpf = data.cpf;
    } else {
      throw new Error("Campo CPF inválido");
    }

    if (data.is_active !== undefined && data.is_active !== null) {
      this.is_active = data.is_active;
    } else {
      throw new Error("Campo ativo inválido");
    }

    this.address = address;
  }

  private verifyCPF(value: string): boolean {
    if (!/[0-9]{11}/.test(value) || value === "00000000000") return false;

    let soma = 0;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(value.substring(i - 1, i)) * (11 - i);
    }

    let resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(value.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma += parseInt(value.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(value.substring(10, 11))) return false;

    return true;
  }

  private verifyBirthDate(value: string): boolean {
    if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(value)) return false;

    return true;
  }

  private verifyPhone(value: string): boolean {
    if (!/[0-9]{11}/.test(value)) return false;

    return true;
  }

  getUser(): number {
    return this.user;
  }

  getBirthDate(): string {
    return this.birth_date;
  }

  getPhone(): string {
    return this.phone;
  }

  getCPF(): string {
    return this.cpf;
  }

  getActive(): boolean {
    return this.is_active;
  }

  setUser(value: number) {
    if (value < 0) throw new Error("Usuário inválido");

    this.user = value;
  }

  setBirthDate(value: string) {
    if (!this.verifyBirthDate(value)) throw new Error("Aniversário inválido");

    this.birth_date = value;
  }

  setPhone(value: string) {
    if (!this.verifyPhone(value)) throw new Error("Telefone inválido");

    this.phone = value;
  }

  setCPF(value: string) {
    if (!this.verifyCPF(value)) throw new Error("CPF inválido");

    this.cpf = value;
  }

  toJSON(): any {
    return {
      user: this?.user,
      birth_date: this?.birth_date,
      phone: this?.phone,
      cpf: this?.cpf,
      is_active: this?.is_active,
      address: this?.address.toJSON(),
    };
  }
}
