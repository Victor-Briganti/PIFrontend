import * as React from "react";
import * as MUI from "@mui/material";
import AbstractChoiceMap from "../../../models/map_choices/interfaces/AbstractChoiceMap";
import MenuItems from "../../MenuItems";

interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  handleValue: (event: MUI.SelectChangeEvent) => void;
  map: AbstractChoiceMap;
  readOnly?: boolean;
  required?: boolean;
  noneOption?: boolean;
}

export default function FormControlField({
  id,
  label,
  name,
  value,
  handleValue,
  map,
  readOnly = false,
  required = true,
  noneOption = false,
}: FormFieldProps) {
  return (
    <React.Fragment>
      <MUI.Grid item xs={12} sm={12}>
        <MUI.FormControl sx={{ m: 1, minWidth: 400 }}>
          <MUI.InputLabel id={`${id}Input`}>{label}</MUI.InputLabel>
          <MenuItems
            map={map}
            handleValue={handleValue}
            label={label}
            value={value}
            name={name}
            readOnly={readOnly}
            noneOption={noneOption}
          />
          {required && (
            <MUI.FormHelperText>Campo Obrigatório</MUI.FormHelperText>
          )}
        </MUI.FormControl>
      </MUI.Grid>
    </React.Fragment>
  );
}
