import * as MUI from "@mui/material";
import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorAlert from "../elements/ErrorAlert";

interface FormLoginProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  messageError: string;
}

export default function FormLogin({
  handleSubmit,
  messageError,
}: FormLoginProps) {
  return (
    <React.Fragment>
      <MUI.CssBaseline />
      <MUI.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MUI.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </MUI.Avatar>
        <MUI.Typography component="h1" variant="h5">
          Login
        </MUI.Typography>
        <MUI.Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <MUI.TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <MUI.TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <MUI.Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </MUI.Button>
          <ErrorAlert messageError={messageError} />
        </MUI.Box>
      </MUI.Box>
    </React.Fragment>
  );
}
