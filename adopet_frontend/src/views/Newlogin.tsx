import * as React from "react";
import * as MUI from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "../components/CopyRight";
{/*import AxiosUser from "./api/AxiosUser"; */}
import Main from "../components/container/Main";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";

// Componente para o campo de e-mail
function EmailField() {
  return (
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
  );
}

// Componente para o campo de senha
function PasswordField() {
  return (
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
  );
}

// Componente para o avatar
function LockAvatar() {
  return (
    <MUI.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
      <LockOutlinedIcon />
    </MUI.Avatar>
  );
}

// Instância axios para acessar o usuário
{/*const axiosUser = new AxiosUser();*/}

export default function Login() {
  const [messageWarning, setMessageWarning] = React.useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    switch (true) {
      case email === "" || password === "":
        setMessageWarning("Campo obrigatório não preenchido");
        break;
      case password !== null && password.toString().length < 8:
        setMessageWarning("Senha deve ter no mínimo 8 caracteres");
        break;
      default:
        setMessageWarning("");
        {/*axiosUser
          .login(email, password)
          .then((response) => {
            navigate("/");
            window.location.reload();
          })
          .catch((error) => {
            setMessageWarning("Email ou senha inválidos");
          }); */}
    }
  };



  return (
    <Main>
      <MUI.CssBaseline />
      <MUI.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockAvatar />
        <MUI.Typography component="h1" variant="h5">
          Login
        </MUI.Typography>
        <MUI.Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <EmailField />
          <PasswordField />
          {messageWarning && (
            <MUI.Alert variant="filled" severity="warning">
              {messageWarning}
            </MUI.Alert>
          )}
          <SubmitButton handleSubmit={handleSubmit} />
          <MUI.Grid container justifyContent="center" alignItems="center">
            <MUI.Grid item>
              <MUI.Link
                href="http://localhost:5173/registeruser"
                variant="body2"
              >
                {"Não possui uma conta? Cadastre-se"}
              </MUI.Link>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </Main>
  );
}
