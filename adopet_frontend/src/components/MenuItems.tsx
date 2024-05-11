import * as React from "react";
import * as MUI from "@mui/material";
import MapBaseChoice from "../models/map_choices/super/MapChoicesSuper";

interface MenuItemsProps {
  map: MapBaseChoice;
  value: string;
  handleValue: (event: MUI.SelectChangeEvent) => void;
  name: string;
  label: string;
}

export default function MenuItems({
  map,
  value,
  handleValue,
  name,
  label,
}: MenuItemsProps) {
  return (
    <React.Fragment>
      <MUI.Select
        labelId={name + "Label"}
        id={name}
        value={value}
        label={label}
        onChange={handleValue}
      >
        {map.getArray().map((choice: [string, string]) => (
          <MUI.MenuItem key={choice[0]} value={choice[1]}>
            {choice[1]}
          </MUI.MenuItem>
        ))}
      </MUI.Select>
    </React.Fragment>
  );
}
