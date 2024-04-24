type AddressFormData = {
  id?: number;
  zip_code?: string;
  street?: string;
  house_number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
}

export class Address {
  private id?: number;
  private zip_code: string;
  private street: string;
  private house_number: string;
  private complement: string;
  private district: string;
  private city: string;
  private state: string;

  constructor(data: AddressFormData) {
    this.id = data.id;

    if (data.zip_code !== undefined && data.zip_code !== null && this.validatedNumber(data.zip_code)) {
      this.zip_code = data.zip_code;
    } else {
      throw new Error("Campo CEP inválido");
    }

    if (data.street !== undefined && data.street !== null &&
      data.street !== "" && data.street.length < 100)
    {
      this.street = data.street;
    } else {
      throw new Error("Campo logradouro inválido");
    }

    if (data.house_number !== undefined && data.house_number !== null) {
      this.house_number = data.house_number;
    } else {
      throw new Error("Campo número da casa inválido");
    }

    if (data.complement !== undefined && data.complement !== null &&
      data.complement !== "" && data.complement.length < 100) {
      this.complement = data.complement;
    } else {
      throw new Error("Campo complemento inválido");
    }

    if (data.district !== undefined && data.district !== null &&
      data.complement !== "" && data.complement.length < 100) {
      this.district = data.district;
    } else {
      throw new Error("Campo bairro inválido");
    }

    if (data.city !== undefined && data.city !== null &&
      data.city !== "" && data.city.length < 100) {
      this.city = data.city;
    } else {
      throw new Error("Campo cidade inválido");
    }

    if (data.state !== undefined && data.state !== null &&
      data.state !== "" && data.state.length !== 2) {
      this.state = data.state;
    } else {
      throw new Error("Campo estado inválido");
    }
  }

  private validatedNumber(value: string): boolean {
    const numberRegex = /{[0-9]}/;
    if (numberRegex.test(value) || !value.trim())
      return false;

    return true;
  }

  getId(): number | undefined {
    return this?.id
  }

  getZipCode(): string {
    return this.zip_code;
  }

  getStreet(): string {
    return this.street;
  }

  getHouseNumber(): string {
    return this.house_number;
  }

  getComplement(): string {
    return this.complement;
  }

  getDistrict(): string {
    return this.district;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  setZipCode(value: string) {
    if(this.validatedNumber(value) && value.length > 100)
      throw new Error("CEP inválido");

    this.zip_code = value;
  }

  setStreet(value: string) {
    if (value !== "" && value.length < 100)
      throw new Error("Rua inválida");

    this.street = value;
  }

  setHouseNumber(value: string) {
    this.house_number = value;
  }

  setComplement(value: string){
    if (value !== "" && value.length < 100)
      throw new Error("Logradouro inválido");

    this.complement = value;
  }

  setDistrict(value: string){
    if (value !== "" && value.length < 100)
      throw new Error("Bairro inválido");

    this.district = value;
  }

  setCity(value: string) {
    if (value !== "" && value.length < 100)
      throw new Error("Cidade inválida");

    this.city = value;
  }

  setState(value: string){
    if (value !== "" && value.length !== 2)
      throw new Error("Estado inválida");

    this.state = value;
  }
}
