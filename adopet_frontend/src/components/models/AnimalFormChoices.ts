type AnimalTypeChoice = {
  label: string;
  value: string;
};

type AnimalFormData = {
  age_choices: [string, string][];
  coat_choices: [string, string][];
  gender_choices: [string, string][];
  specie_choices: [string, string][];
  size_choices: [string, string][];
};

export class AnimalFormChoice {
  age_choices: AnimalTypeChoice[] = [];
  coat_choices: AnimalTypeChoice[] = [];
  gender_choices: AnimalTypeChoice[] = [];
  specie_choices: AnimalTypeChoice[] = [];
  size_choices: AnimalTypeChoice[] = [];

  constructor(data: AnimalFormData | null) {
    if (data === null) return;

    for (let i = 0; i < data.age_choices.length; i++) {
      this.age_choices.push({
        label: data.age_choices[i][0],
        value: data.age_choices[i][1],
      });
    }

    for (let i = 0; i < data.coat_choices.length; i++) {
      this.coat_choices.push({
        label: data.coat_choices[i][0],
        value: data.coat_choices[i][1],
      });
    }

    for (let i = 0; i < data.gender_choices.length; i++) {
      this.gender_choices.push({
        label: data.gender_choices[i][0],
        value: data.gender_choices[i][1],
      });
    }

    for (let i = 0; i < data.specie_choices.length; i++) {
      this.specie_choices.push({
        label: data.specie_choices[i][0],
        value: data.specie_choices[i][1],
      });
    }

    for (let i = 0; i < data.size_choices.length; i++) {
      this.size_choices.push({
        label: data.size_choices[i][0],
        value: data.size_choices[i][1],
      });
    }
  }

  getAges(): { label: string; value: string }[] {
    return this.age_choices;
  }

  getCoats(): { label: string; value: string }[] {
    return this.coat_choices;
  }

  getGenders(): { label: string; value: string }[] {
    return this.gender_choices;
  }

  getSizes(): { label: string; value: string }[] {
    return this.size_choices;
  }
}
