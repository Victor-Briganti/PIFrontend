import * as React from "react";
import * as MuiMaterial from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
import AxiosUser from "./api/AxiosUser";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = MuiMaterial.createTheme();

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function Login() {
  const [messageWarning, setMessageWarning] = React.useState<string>("");
  const useHandleSubmit = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      // Intercepta a submissão do formulário pelo navegador
      event.preventDefault();

      // Extrai os valores do formulário
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");

      switch (true) {
        case email === "" && password === "":
          setMessageWarning("Informações vazias");
          break;
        case email === "":
          setMessageWarning("Email não pode estar vazio");
          break;
        case password === "":
          setMessageWarning("Senha não pode estar vazio");
          break;
        default:
          setMessageWarning("");
          axiosUser.login(email, password);
      }
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
            {messageWarning && (
              <MuiMaterial.Alert variant="filled" severity="warning">
                {messageWarning}
              </MuiMaterial.Alert>
            )}
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
