import * as MUI from "@mui/material";
import * as React from "react";
import FormControlField from "./form_control/FormControlField";
import AgeChoiceMap from "../../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../../models/map_choices/SpecieChoiceMap";

interface FilterProps {
  age: string;
  gender: string;
  size: string;
  specie: string;
  coat: string;
  handleAge: (event: MUI.SelectChangeEvent) => void;
  handleGender: (event: MUI.SelectChangeEvent) => void;
  handleSize: (event: MUI.SelectChangeEvent) => void;
  handleSpecie: (event: MUI.SelectChangeEvent) => void;
  handleCoat: (event: MUI.SelectChangeEvent) => void;
}

export default function Filter({
  age,
  gender,
  size,
  specie,
  coat,
  handleAge,
  handleGender,
  handleSize,
  handleSpecie,
  handleCoat,
}: FilterProps) {
  const genderMap = new GenderChoiceMap();
  const ageMap = new AgeChoiceMap();
  const coatMap = new CoatChoiceMap();
  const sizeMap = new SizeChoiceMap();
  const specieMap = new SpecieChoiceMap();

  return (
    <React.Fragment>
      <MUI.Grid container>
        <MUI.Grid item xs={12}>
          <FormControlField
            id={"specie"}
            label={"Éspecie"}
            name={"specie"}
            value={specie}
            handleValue={handleSpecie}
            map={specieMap}
            required={false}
            noneOption={true}
          />
        </MUI.Grid>
      </MUI.Grid>
      <MUI.Grid container>
        <MUI.Grid item xs={6}>
          <FormControlField
            id={"age"}
            label={"Idade"}
            name={"age"}
            value={age}
            handleValue={handleAge}
            map={ageMap}
            required={false}
            noneOption={true}
          />
        </MUI.Grid>
        <MUI.Grid item xs={6}>
          <FormControlField
            id={"gender"}
            label={"Gênero"}
            name={"gender"}
            value={gender}
            handleValue={handleGender}
            map={genderMap}
            required={false}
            noneOption={true}
          />
        </MUI.Grid>
      </MUI.Grid>
      <MUI.Grid container>
        <MUI.Grid item xs={6}>
          <FormControlField
            id={"size"}
            label={"Tamanho"}
            name={"size"}
            value={size}
            handleValue={handleSize}
            map={sizeMap}
            required={false}
            noneOption={true}
          />
        </MUI.Grid>
        <MUI.Grid item xs={6}>
          <FormControlField
            id={"coat"}
            label={"Pelagem"}
            name={"coat"}
            value={coat}
            handleValue={handleCoat}
            map={coatMap}
            required={false}
            noneOption={true}
          />
        </MUI.Grid>
      </MUI.Grid>
    </React.Fragment>
  );
}
