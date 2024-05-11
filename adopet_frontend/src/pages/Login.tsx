import * as React from "react";
import * as MUI from "@mui/material";
import CopyRight from "../components/CopyRight";
import AxiosUser from "../api/AxiosUser";
import Main from "../components/container/Main";
import { useNavigate } from "react-router-dom";
import { validatedEmail } from "../utils/Verification";
import FormLogin from "../components/forms/Login";

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function Login() {
  const [messageWarning, setMessageWarning] = React.useState<string>("");
  const navigate = useNavigate();

  const useHandleSubmit = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      // Intercepta a submissão do formulário pelo navegador
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const email = data.get("email")?.toString();
      const password = data.get("password")?.toString();

      if (email !== undefined && password !== undefined) {
        if (validatedEmail(email) === false) {
          setMessageWarning("Email inválido");
          return;
        }

        if (password === "" || password.length < 8) {
          setMessageWarning("Senha inválida");
          return;
        }

        setMessageWarning("");
        axiosUser
          .login({ email: email, password: password })
          .then((response) => {
            navigate("/");
            window.location.reload();
          })
          .catch((error) => {
            setMessageWarning("Email ou senha inválidos");
          });
      } else {
        setMessageWarning("Campos obrigatórios");
        return;
      }
    };

    return handleSubmit;
  };

  const handleSubmit = useHandleSubmit();

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
        <FormLogin
          handleSubmit={handleSubmit}
          messageWarning={messageWarning}
        />
        <MUI.Grid container justifyContent="center" alignItems="center">
          <MUI.Grid item>
            <MUI.Link href="http://localhost:5173/registeruser" variant="body2">
              {"Não possui uma conta? Cadastre-se"}
            </MUI.Link>
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Box>
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </Main>
  );
}
