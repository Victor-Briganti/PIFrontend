import * as React from "react";
import * as MUI from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
import AxiosUser from "./api/AxiosUser";
import { useNavigate } from "react-router-dom";

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function Login() {
  const [messageWarning, setMessageWarning] = React.useState<string>("");
  const navigate = useNavigate();
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
          // axiosUser.login(email, password);
          await axiosUser.login(email, password);
          navigate("/"); // Navigate to the home page or any other route
          window.location.reload();
      }
    };
    // console.log(handleSubmit);
    return handleSubmit;
  };

  const handleSubmit = useHandleSubmit();

  return (
    <MUI.Container component="main" maxWidth="xs">
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
          {messageWarning && (
            <MUI.Alert variant="filled" severity="warning">
              {messageWarning}
            </MUI.Alert>
          )}
          <MUI.Grid container justifyContent="center" alignItems="center">
            <MUI.Grid item>
              <MUI.Link href="http://localhost:5173/registeruser" variant="body2">
                {"Não possui uma conta? Cadastre-se"}
              </MUI.Link>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </MUI.Container>
  );
}
