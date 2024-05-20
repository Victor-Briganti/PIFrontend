import ModelCity from "./City";
import { validatedName, validatedNumber } from "../utils/Verification";

interface FormDataAddress {
  id?: number;
  city: ModelCity;
  zipCode: string;
  district: string;
  street: string;
  complement: string;
  houseNumber: string;
}

export default class ModelAddress {
  private id?: number;
  private city!: ModelCity;
  private zip_code!: string;
  private district!: string;
  private street!: string;
  private complement!: string;
  private house_number!: string;

  constructor(address: FormDataAddress) {
    if (address.id !== undefined && address.id < 0) {
      throw new Error("ID não pode ser negativo");
    }

    if (validatedNumber(address.zipCode) === false) {
      throw new Error(`CEP inválido: ${address.district}`);
    }

    if (validatedName(address.district, 100) === false) {
      throw new Error(`Bairro com nome inválido: ${address.district}`);
    }

    if (validatedName(address.street, 100) === false) {
      throw new Error(`Logradouro com nome inválido: ${address.district}`);
    }

    if (address.complement.length > 100) {
      throw new Error(`Complemento tem um limite de 100 caracteres`);
    }

    if (address.houseNumber === "") {
      throw new Error(`Número da casa não pode ser vazio`);
    }

    if (address.houseNumber.length > 10) {
      throw new Error(`Número da casa tem limite de 10 caracteres`);
    }

    this.id = address.id;
    this.city = address.city;
    this.zip_code = address.zipCode;
    this.district = address.district;
    this.street = address.street;
    this.complement = address.complement;
    this.house_number = address.houseNumber;
  }

  getId(): number | undefined {
    return this?.id;
  }

  getUF(): string {
    return this.city.getUF();
  }

  getCityName(): string {
    return this.city.getName();
  }

  getZipCode(): string {
    return this.zip_code;
  }

  getDistrict(): string {
    return this.district;
  }

  getStreet(): string {
    return this.street;
  }

  getComplement(): string {
    return this.complement;
  }

  getHouseNumber(): string {
    return this.house_number;
  }

  setId(id: number) {
    this.id = id;
  }

  setUF(uf: string) {
    this.city.setUF(uf);
  }

  setCityName(cityName: string) {
    this.city.setName(cityName);
  }

  setZipCode(zipCode: string) {
    if (validatedNumber(zipCode) === false) {
      throw new Error(`CEP inválido: ${zipCode}`);
    }

    this.zip_code = zipCode;
  }

  setDistrict(district: string) {
    if (validatedName(district, 100) === false) {
      throw new Error(`Bairro com nome inválido: ${district}`);
    }

    this.district = district;
  }

  setStreet(street: string) {
    if (validatedName(street, 100) === false) {
      throw new Error(`Logradouro com nome inválido: ${street}`);
    }

    this.street;
  }

  setComplement(complement: string) {
    if (complement.length > 100) {
      throw new Error(`Complemento tem um limite de 100 caracteres`);
    }

    this.complement;
  }

  setHouseNumber(houseNumber: string) {
    if (houseNumber === "") {
      throw new Error(`Número da casa não pode ser vazio`);
    }

    if (houseNumber.length > 10) {
      throw new Error(`Número da casa tem limite de 10 caracteres`);
    }

    this.house_number;
  }
}
