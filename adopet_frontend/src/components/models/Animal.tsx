type Choice = {
  value: string;
  label: string;
};

export class Animal {
  id?: number;
  // temperament?: string[];
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
  is_special_neeeds?: boolean;
  is_active?: boolean;

  specie_choices?: Choice[];
  size_choices?: Choice[];
  gender_choices?: Choice[];

  constructor(data: any | null) {
    if (data === null) return;

    this.id = data.id;
    // this.temperament = data.temperament;
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
    this.is_special_neeeds = data.is_special_neeeds;
    this.is_active = data.is_active;

    this.specie_choices = data.specie_choices;
    this.size_choices = data.size_choices;
    this.gender_choices = data.gender_choices;
  }

  saveFormData(data: FormData | null) {
    if (data === null) {
      console.log("Nullo 1");
      return;
    }

    const id = data.get("id");
    if (id !== null) {
      this.id = Number(id);
    }

    const name = data.get("name");
    if (name !== null) {
      this.name = name.toString();
    }

    const age = data.get("age");
    if (age !== null) {
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

    const coat = data.get("coat");
    if (coat !== null) {
      this.coat = coat.toString();
    }

    const weight = data.get("weight");
    if (weight !== null) {
      this.weight = Number(weight);
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

    const is_special_neeeds = data.get("is_special_neeeds");
    if (is_special_neeeds !== null) {
      this.is_special_neeeds = is_special_neeeds === "true";
    }

    const is_active = data.get("is_active");
    if (is_active !== null) {
      this.is_active = is_active === "true";
    }
  }

  saveChoices(data: FormData) {
    if (data === null) {
      console.log("Nullo 2");
      return;
    }

    const specieChoices = data.get("specieChoices");
    if (specieChoices !== null) {
      this.specie_choices = JSON.parse(specieChoices as string).map(
        ([value, label]: [string, string]) => ({ value, label })
      );
    }

    const sizeChoices = data.get("sizeChoices");
    if (sizeChoices !== null) {
      this.size_choices = JSON.parse(sizeChoices as string).map(
        ([value, label]: [string, string]) => ({ value, label })
      );
    }

    const genderChoices = data.get("genderChoices");
    if (genderChoices !== null) {
      this.gender_choices = JSON.parse(genderChoices as string).map(
        ([value, label]: [string, string]) => ({ value, label })
      );
    }
  }
}
