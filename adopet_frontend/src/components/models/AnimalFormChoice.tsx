import * as MUI from "@mui/material";

type AnimalTypeChoice = {
  label: string;
  value: string;
};

export class AnimalFormChoice {
  specie_choices: AnimalTypeChoice[] = [];
  size_choices: AnimalTypeChoice[] = [];
  gender_choices: AnimalTypeChoice[] = [];

  constructor(data: any | null) {
    if (data === null) return;

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

    for (let i = 0; i < data.gender_choices.length; i++) {
      this.gender_choices.push({
        label: data.gender_choices[i][0],
        value: data.gender_choices[i][1],
      });
    }
  }

  mapSpecies() {
    return this.specie_choices.map((choice: AnimalTypeChoice) => (
      <MUI.MenuItem key={choice.label} value={choice.label}>
        {choice.value}
      </MUI.MenuItem>
    ));
  }

  mapSize() {
    return this.size_choices.map((choice: AnimalTypeChoice) => (
      <MUI.MenuItem key={choice.label} value={choice.label}>
        {choice.value}
      </MUI.MenuItem>
    ));
  }

  mapGender() {
    return this.gender_choices.map((choice: AnimalTypeChoice) => (
      <MUI.MenuItem key={choice.label} value={choice.label}>
        {choice.value}
      </MUI.MenuItem>
    ));
  }
}
