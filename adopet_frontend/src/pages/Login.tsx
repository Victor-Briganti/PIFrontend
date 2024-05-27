import * as React from "react";
import * as MUI from "@mui/material";
import CopyRight from "../components/CopyRight";
import AxiosUser from "../api/AxiosUser";
import { useNavigate } from "react-router-dom";
import { validatedEmail } from "../utils/Verification";
import FormLayout from "../components/layouts/FormLayout";
import FormLogin from "../components/forms/FormLogin";

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function Login() {
  const [messageError, setmessageError] = React.useState<string>("");
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
          setmessageError("Email inválido");
          return;
        }

        if (password === "" || password.length < 8) {
          setmessageError("Senha inválida");
          return;
        }

        setmessageError("");
        axiosUser
          .login({ email: email, password: password })
          .then((response) => {
            navigate("/");
            window.location.reload();
          })
          .catch((error) => {
            setmessageError("Email ou senha inválidos");
          });
      } else {
        setmessageError("Campos obrigatórios");
        return;
      }
    };

    return handleSubmit;
  };

  const handleSubmit = useHandleSubmit();

  return (
    <FormLayout>
      <MUI.CssBaseline />
      <MUI.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormLogin handleSubmit={handleSubmit} messageError={messageError} />
        <MUI.Grid container justifyContent="center" alignItems="center">
          <MUI.Grid item>
            <MUI.Link href="http://localhost:5173/registeruser" variant="body2">
              {"Não possui uma conta? Cadastre-se"}
            </MUI.Link>
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Box>
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </FormLayout>
  );
}
