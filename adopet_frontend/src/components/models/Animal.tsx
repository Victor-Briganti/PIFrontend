export class Animal {
  id?: number;
  temperament?: string[];
  name?: string;
  age?: number;
  specie?: string;
  gender?: string;
  size?: string;
  coat?: string;
  weight?: number;
  adoption_date?: string;
  description?: string;
  is_house_trained?: boolean;
  is_special_needs?: boolean;
  is_active?: boolean;

  constructor(data: any | null) {
    if (data === null) return;

    this.id = data.id;
    this.temperament = data.temperament;
    this.name = data.name;
    this.age = data.age;
    this.specie = data.specie;
    this.gender = data.gender;
    this.size = data.size;
    this.coat = data.coat;
    this.weight = data.weight;
    this.adoption_date = data.adoption_date;
    this.description = data.description;
    this.is_house_trained = data.is_house_trained;
    this.is_special_needs = data.is_special_needs;
    this.is_active = data.is_active;
  }

  private verifyNegativeNum(label: string, value: string) {
    if (isNaN(Number(value))) throw new Error(label + " deve ser númerico");

    if (Number(value) < 0) throw new Error(label + " não pode ser negativo");
  }

  private stringValidator(label: string, value: string) {
    const stringValidation = /^[a-zA-Z]+$/;

    if (!stringValidation.test(value))
      throw new Error("Campo " + label + " inválido");
  }

  private numberValidator(label: string, value: string) {
    const numberValidation = /^[0-9]+$/;

    if (!numberValidation.test(value))
      throw new Error("Campo " + label + " inválido");
  }

  saveFormData(data: FormData | null) {
    if (data === null) return;

    const id = data.get("id");
    if (id !== null) {
      this.verifyNegativeNum("ID", id.toString());
      this.id = Number(id);
    }

    const name = data.get("name");
    if (name !== null) {
      this.stringValidator("Nome", name.toString());
      this.name = name.toString();
    }

    const age = data.get("age");
    if (age !== null) {
      this.verifyNegativeNum("Idade", age.toString());
      this.numberValidator("Idade", age.toString());
      this.age = Number(age);
    }

    const specie = data.get("specie");
    if (specie !== null) {
      this.specie = specie.toString();
    }

    const gender = data.get("gender");
    if (gender !== null) {
      this.gender = gender.toString();
    }

    const size = data.get("size");
    if (size !== null) {
      this.size = size.toString();
    }

    const weight = data.get("weight");
    if (weight !== null) {
      this.verifyNegativeNum("Peso", weight.toString());
      this.weight = Number(weight);
    }

    const coat = data.get("coat");
    if (coat !== null) {
      this.coat = coat.toString();
    }

    const adoption_date = data.get("adoption_date");
    if (adoption_date !== null) {
      this.adoption_date = adoption_date.toString();
    }

    const description = data.get("description");
    if (description !== null) {
      this.description = description.toString();
    }

    const is_house_trained = data.get("is_house_trained");
    if (is_house_trained !== null) {
      this.is_house_trained = is_house_trained === "true";
    }

    const is_special_needs = data.get("is_special_needs");
    if (is_special_needs !== null) {
      this.is_special_needs = is_special_needs === "true";
    } else {
      this.is_special_needs = false;
    }

    const is_active = data.get("is_active");
    if (is_active !== null) {
      this.is_active = is_active === "true";
    } else {
      this.is_active = true;
    }

    this.temperament = [];
  }

  getSpecie(): string | undefined {
    if (this.specie === "cat") {
      return "Gato";
    } else {
      return "Cachorro";
    }
  }

  getGender(): string | undefined {
    if (this.gender === "M") {
      return "Macho";
    } else {
      return "Fêmea";
    }
  }

  getSize(): string | undefined {
    switch (this.size) {
      case "small":
        return "Pequeno Porte";
      case "medium":
        return "Médio Porte";
      case "large":
        return "Grande Porte";
    }
  }

  validateRegister(): void {
    if (this.name === "") throw new Error("Nome é um campo obrigatório");

    if (this.age === undefined || isNaN(this.age))
      throw new Error("Idade é um campo obrigatório");

    if (this.weight !== undefined && !isNaN(this.weight)) {
      this.numberValidator("Peso", this.weight.toString());
    }

    if (this.coat !== undefined && this.coat !== "") {
      this.stringValidator("Pelagem", this.coat.toString());
    }

    if (this.specie === "") throw new Error("Espécie é um campo obrigatório");
    if (this.gender === "") throw new Error("Genêro é um campo obrigatório");
    if (this.size === "") throw new Error("Tamanho é um campo obrigatório");
  }
}
