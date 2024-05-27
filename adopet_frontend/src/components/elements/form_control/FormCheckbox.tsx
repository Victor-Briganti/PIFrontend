import * as React from "react";
import * as MUI from "@mui/material";

interface FormCheckBoxProps {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent) => void;
  label: string;
}

export default function FormCheckBox({
  id,
  checked,
  onChange,
  label,
}: FormCheckBoxProps) {
  return (
    <React.Fragment>
      <MUI.Grid item xs={12} sm={12}>
        <MUI.FormControlLabel
          control={
            <MUI.Checkbox id={id} checked={checked} onChange={onChange} />
          }
          label={label}
        />
      </MUI.Grid>
    </React.Fragment>
  );
}
