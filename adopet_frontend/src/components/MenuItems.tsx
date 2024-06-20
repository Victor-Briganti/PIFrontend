import * as React from "react";
import * as MUI from "@mui/material";
import AbstractChoiceMap from "../models/map_choices/interfaces/AbstractChoiceMap";

interface MenuItemsProps {
  map: AbstractChoiceMap;
  value: string;
  handleValue: (event: MUI.SelectChangeEvent) => void;
  name: string;
  label: string;
  readOnly: boolean;
  noneOption?: boolean;
}

export default function MenuItems({
  map,
  value,
  handleValue,
  name,
  label,
  readOnly = false,
  noneOption = false,
}: MenuItemsProps) {
  return (
    <React.Fragment>
      <MUI.Select
        labelId={name + "Label"}
        id={name}
        value={value}
        label={label}
        onChange={handleValue}
        variant={readOnly ? "filled" : "outlined"}
        inputProps={{
          readOnly: readOnly,
        }}
      >
        {noneOption && (
          <MUI.MenuItem key="none" value="">
            Vazio
          </MUI.MenuItem>
        )}
        {map.getArray().map((choice: [string, string]) => (
          <MUI.MenuItem key={choice[0]} value={choice[1]}>
            {choice[1]}
          </MUI.MenuItem>
        ))}
      </MUI.Select>
    </React.Fragment>
  );
}
