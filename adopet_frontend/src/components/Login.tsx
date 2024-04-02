import * as React from "react";
import * as MuiMaterial from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
import LoginSubmit from "./forms/LoginSubmit";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = MuiMaterial.createTheme();

export default function Login() {
  const useHandleSubmit = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      const loginSubmit = new LoginSubmit();
      loginSubmit.send(event);
    };
    return handleSubmit;
  };

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
            Sign in
          </MuiMaterial.Typography>
          <MuiMaterial.Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <MuiMaterial.TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <MuiMaterial.TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <MuiMaterial.Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </MuiMaterial.Button>
            <MuiMaterial.Grid container>
              <MuiMaterial.Grid item xs>
                <MuiMaterial.Link href="#" variant="body2">
                  Esqueceu a senha?
                </MuiMaterial.Link>
              </MuiMaterial.Grid>
              <MuiMaterial.Grid item>
                <MuiMaterial.Link href="#" variant="body2">
                  {"Não possui uma conta? Cadastre-se"}
                </MuiMaterial.Link>
              </MuiMaterial.Grid>
            </MuiMaterial.Grid>
          </MuiMaterial.Box>
        </MuiMaterial.Box>
        <CopyRight sx={{ mt: 8, mb: 4 }} />
      </MuiMaterial.Container>
    </MuiMaterial.ThemeProvider>
  );
}
