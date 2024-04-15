import * as React from "react";
import * as MUI from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRight from "./CopyRight";
import AxiosUser from "./api/AxiosUser";
import { useNavigate } from "react-router-dom";

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function RegisterUser() {
  const [messageError, setMessageError] = React.useState<string>("");
  const navigate = useNavigate();

  const useHandleSubmit = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      // Intercepta a submissão do formulário pelo navegador
      event.preventDefault();

      // Extrai os valores do formulário
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const firstname = formData.get("firstname");
      const lastname = formData.get("lastname");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      switch (true) {
        case email === "" &&
          firstname === "" &&
          lastname === "" &&
          password === "" &&
          confirmPassword === "":
          setMessageError("Todos os campos estão vazios.");
          break;
        case firstname === "":
          setMessageError("Campo nome não pode ser vazio.");
          break;
        case lastname === "":
          setMessageError("Campo sobrenome não pode ser vazio.");
          break;
        case email === "":
          setMessageError("Campo endereço email não pode ser vazio.");
          break;
        case password === "":
          setMessageError("Campo senha não pode ser vazio.");
          break;
        case confirmPassword === "":
          setMessageError("Campo confirmar senha não pode ser vazio.");
          break;
        case password !== confirmPassword:
          setMessageError("Senhas não coincidem.");
          break;
        default:
          await axiosUser.register(email, password, firstname, lastname);
          navigate("/login");
        }
    };
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
          Cadastrar-se
        </MUI.Typography>
        <MUI.Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <MUI.Grid container spacing={2}>
            <MUI.Grid item xs={12} sm={6}>
              <MUI.TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="Nome"
                autoFocus
              />
            </MUI.Grid>
            <MUI.Grid item xs={12} sm={6}>
              <MUI.TextField
                required
                fullWidth
                id="lastname"
                label="Sobrenome"
                name="lastname"
                autoComplete="family-name"
              />
            </MUI.Grid>
            <MUI.Grid item xs={12}>
              <MUI.TextField
                required
                fullWidth
                id="email"
                label="Endereço de Email"
                name="email"
                autoComplete="email"
              />
            </MUI.Grid>
            <MUI.Grid item xs={12}>
              <MUI.TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </MUI.Grid>
            <MUI.Grid item xs={12}>
              <MUI.TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </MUI.Grid>
          </MUI.Grid>
          <MUI.Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </MUI.Button>
          {messageError && (
            <MUI.Alert variant="filled" severity="error">
              {messageError}
            </MUI.Alert>
          )}
          <MUI.Grid container justifyContent="center" alignItems="center">
            <MUI.Grid item>
              <MUI.Link href="http://localhost:5173/login" variant="body2">
                Já possui uma conta? Entrar
              </MUI.Link>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
      <CopyRight sx={{ mt: 5 }} />
    </MUI.Container>
  );
}
