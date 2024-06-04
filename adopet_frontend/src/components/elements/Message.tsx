import * as MUI from "@mui/material";
import * as React from "react";

interface MessageProps {
  message: string;
}

export function WarningMessage({ message }: MessageProps) {
  const [active, setActive] = React.useState<boolean>(true);

  const handleClose = React.useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <React.Fragment>
      {active && (
        <MUI.Alert onClose={handleClose} severity="warning">
          {message}
        </MUI.Alert>
      )}
    </React.Fragment>
  );
}

export function InfoMessage({ message }: MessageProps) {
  const [active, setActive] = React.useState<boolean>(true);

  const handleClose = React.useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <React.Fragment>
      {active && (
        <MUI.Alert onClose={handleClose} severity="info">
          {message}
        </MUI.Alert>
      )}
    </React.Fragment>
  );
}

export function ErrorMessage({ message }: MessageProps) {
  const [active, setActive] = React.useState<boolean>(true);

  const handleClose = React.useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <React.Fragment>
      {active && (
        <MUI.Alert onClose={handleClose} severity="error">
          {message}
        </MUI.Alert>
      )}
    </React.Fragment>
  );
}

export function SuccessMessage({ message }: MessageProps) {
  const [active, setActive] = React.useState<boolean>(true);

  const handleClose = React.useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <React.Fragment>
      {active && (
        <MUI.Alert onClose={handleClose} severity="success">
          {message}
        </MUI.Alert>
      )}
    </React.Fragment>
  );
}
