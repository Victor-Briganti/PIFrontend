import * as React from "react";
import { useNavigate } from "react-router";
import * as MuiMaterial from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
import SignUp from "./forms/SignUp";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = MuiMaterial.createTheme();

export default function Register() {
  const useHandleSubmit = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      const signup = new SignUp();
      signup.send(event);
    } 
    return handleSubmit;
  }

  const handleSubmit = useHandleSubmit();

  return (
    <MuiMaterial.ThemeProvider theme={defaultTheme}>
      <MuiMaterial.Container component="main" maxWidth="xs">
        <MuiMaterial.CssBaseline />
        <MuiMaterial.Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MuiMaterial.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </MuiMaterial.Avatar>
          <MuiMaterial.Typography component="h1" variant="h5">
            Cadastrar-se
          </MuiMaterial.Typography>
          <MuiMaterial.Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <MuiMaterial.Grid container spacing={2}>
              <MuiMaterial.Grid item xs={12} sm={6}>
                <MuiMaterial.TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="Nome"
                  autoFocus
                />
              </MuiMaterial.Grid>
              <MuiMaterial.Grid item xs={12} sm={6}>
                <MuiMaterial.TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Sobrenome"
                  name="lastname"
                  autoComplete="family-name"
                />
              </MuiMaterial.Grid>
              <MuiMaterial.Grid item xs={12}>
                <MuiMaterial.TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de Email"
                  name="email"
                  autoComplete="email"
                />
              </MuiMaterial.Grid>
              <MuiMaterial.Grid item xs={12}>
                <MuiMaterial.TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </MuiMaterial.Grid>
            </MuiMaterial.Grid>
            <MuiMaterial.Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </MuiMaterial.Button>
            <MuiMaterial.Grid container justifyContent="flex-end">
              <MuiMaterial.Grid item>
                <MuiMaterial.Link href="#" variant="body2">
                  Já possui uma conta? Entrar
                </MuiMaterial.Link>
              </MuiMaterial.Grid>
            </MuiMaterial.Grid>
          </MuiMaterial.Box>
        </MuiMaterial.Box>
        <CopyRight sx={{ mt: 5 }} />
      </MuiMaterial.Container>
    </MuiMaterial.ThemeProvider>
  );
}
