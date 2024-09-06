import * as MUI from "@mui/material";
import * as React from "react";
import FormControlField from "./form_control/FormControlField";
import AgeChoiceMap from "../../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../../models/map_choices/SpecieChoiceMap";
import AbstractChoiceMap from "../../models/map_choices/interfaces/AbstractChoiceMap";

interface FilterProps {
  age: string;
  gender: string;
  size: string;
  specie: string;
  coat: string;
  handleAge: (age: string) => void;
  handleGender: (gender: string) => void;
  handleSize: (size: string) => void;
  handleSpecie: (specie: string) => void;
  handleCoat: (coat: string) => void;
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
  const [value, setValue] = React.useState<string[]>([]);
  const genderMap = new GenderChoiceMap();
  const ageMap = new AgeChoiceMap();
  const coatMap = new CoatChoiceMap();
  const sizeMap = new SizeChoiceMap();
  const specieMap = new SpecieChoiceMap();
  const [options, setOptions] = React.useState<string[]>(
    getOptions(specieMap, genderMap, ageMap, coatMap, sizeMap) || []
  );

  function getOptions(
    map1: AbstractChoiceMap,
    map2: AbstractChoiceMap,
    map3: AbstractChoiceMap,
    map4: AbstractChoiceMap,
    map5: AbstractChoiceMap
  ): string[] {
    const array = map1
      .getArray()
      .concat(
        map2.getArray(),
        map3.getArray(),
        map4.getArray(),
        map5.getArray()
      );
    let options: string[] = []; // Initialize options with an empty array
    for (const [key, value] of array) {
      options.push(value);
    }
    return options;
  }

  const handleFilter = (
    event: React.SyntheticEvent,
    value: string[] | undefined
  ) => {
    let Gender, Age, Coat, Size, Specie, index, mapKey;
    const val = value;
    let genderArr: string[] = [],
      ageArr: string[] = [],
      coatArr: string[] = [],
      sizeArr: string[] = [],
      specieArr: string[] = [];

    for (let x in val) {
      // Gender
      if (genderMap.getKeyByValue(val[x]) !== undefined) {
        Gender = val[x];
        genderArr.push(Gender);
        if (genderArr.length > 1) {
          genderArr.pop();
          mapKey = genderArr[0];
          // Remoção do valor Pertencente ao Map do Filtro
          index = value?.findIndex((map) => map === mapKey);
          if (index !== undefined && index !== -1) {
            value?.splice(index, 1);
          }
        }
      }
      // Age
      if (ageMap.getKeyByValue(val[x]) !== undefined) {
        Age = val[x];
        ageArr.push(Age);
        if (ageArr.length > 1) {
          ageArr.pop();
          mapKey = ageArr[0];
          // Remoção do valor Pertencente ao Map do Filtro
          // index = undefined;
          index = value?.findIndex((map) => map === mapKey);
          if (index !== undefined && index !== -1) {
            value?.splice(index, 1);
          }
        }
      }
      // Coat
      if (coatMap.getKeyByValue(val[x]) !== undefined) {
        Coat = val[x];
        coatArr.push(Coat);
        if (coatArr.length > 1) {
          coatArr.pop();
          mapKey = coatArr[0];
          // Remoção do valor Pertencente ao Map do Filtro
          // index = undefined;
          index = value?.findIndex((map) => map === mapKey);
          if (index !== undefined && index !== -1) {
            value?.splice(index, 1);
          }
        }
      }
      // Size
      if (sizeMap.getKeyByValue(val[x]) !== undefined) {
        Size = val[x];
        sizeArr.push(Size);
        if (sizeArr.length > 1) {
          sizeArr.pop();
          mapKey = sizeArr[0];
          // Remoção do valor Pertencente ao Map do Filtro
          // index = undefined;
          index = value?.findIndex((map) => map === mapKey);
          if (index !== undefined && index !== -1) {
            value?.splice(index, 1);
          }
        }
      }
      // Specie
      if (specieMap.getKeyByValue(val[x]) !== undefined) {
        Specie = val[x];
        specieArr.push(Specie);
        if (specieArr.length > 1) {
          specieArr.pop();
          mapKey = specieArr[0];
          // Remoção do valor Pertencente ao Map do Filtro
          // index = undefined;
          index = value?.findIndex((map) => map === mapKey);
          if (index !== undefined && index !== -1) {
            value?.splice(index, 1);
          }
        }
      }
    }
    handleAge(Age);
    handleCoat(Coat);
    handleGender(Gender);
    handleSize(Size);
    handleSpecie(Specie);
    setValue(value || []);
  };

  return (
    <React.Fragment>
      <MUI.Box
        width={"100%"}
        justifyContent={"center"}
        display={"flex"}
        padding={2}
      >
        <MUI.Autocomplete
          multiple
          disablePortal
          value={value}
          autoHighlight
          options={options}
          onChange={handleFilter}
          sx={{ width: "70%" }}
          filterSelectedOptions
          renderInput={(params) => (
            <MUI.TextField {...params} label={"Filtro"} />
          )}
        />
      </MUI.Box>
    </React.Fragment>
  );
}
