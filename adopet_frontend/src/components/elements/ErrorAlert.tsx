import * as MUI from "@mui/material";
import * as React from "react";

interface ErrorAlert {
  messageError: string;
}

export default function ErrorAlert({ messageError }: ErrorAlert) {
  return (
    <React.Fragment>
      {messageError && (
        <MUI.Alert variant="filled" severity="error">
          {messageError}
        </MUI.Alert>
      )}
    </React.Fragment>
  );
}
