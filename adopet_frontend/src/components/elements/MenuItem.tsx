import * as React from "react";
import * as MUI from "@mui/material";

interface MenuItemProps {
  items: [string, string][];
}

export default function MenuItem({ items }: MenuItemProps) {
  return (
    <React.Fragment>
      {items.map(([key, value]) => (
        <MUI.MenuItem key={key} value={value}>
          {value}
        </MUI.MenuItem>
      ))}
    </React.Fragment>
  );
}
