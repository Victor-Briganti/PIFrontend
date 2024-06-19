import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosUser from "../api/AxiosUser";
import CopyRight from "../components/CopyRight";
import FormLogin from "../components/forms/FormLogin";
import FormLayout from "../components/layouts/FormLayout";
import UserContext from "../hooks/UserContext";
import TopArrowBack from "../components/elements/navigation/TopArrowBack";
import { validatedEmail } from "../utils/Verification";

export default function Login() {
  const [messageError, setMessageError] = React.useState<string>("");
  const user = React.useContext(UserContext);
  const navigate = Router.useNavigate();
  const axiosUser = React.useMemo(() => new AxiosUser(), []);

  const useHandleSubmit = React.useCallback(() => {
    const loginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const email = data.get("email")?.toString();
      const password = data.get("password")?.toString();

      if (email !== undefined && password !== undefined) {
        if (validatedEmail(email) === false) {
          setMessageError("Email inválido");
          return;
        }

        if (password === "" || password.length < 8) {
          setMessageError("Senha inválida");
          return;
        }

        setMessageError("");
        try {
          await axiosUser.login({ email: email, password: password });
          const response = await axiosUser.getUser();
          user.setContext(response.userCommon);
          navigate("/");
        } catch (error) {
          setMessageError("Email ou senha inválidos");
        }
      } else {
        setMessageError("Campos obrigatórios");
        return;
      }
    };

    return loginSubmit;
  }, [axiosUser, user, navigate]);

  const handleSubmit = useHandleSubmit();

  return (
    <React.Fragment>
      <TopArrowBack />
      <FormLayout>
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
              <MUI.Link
                component={Router.Link}
                to={"/user/register"}
                variant="body2"
              >
                {"Não possui uma conta? Cadastre-se"}
              </MUI.Link>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Box>
        <CopyRight sx={{ mt: 8, mb: 4 }} />
      </FormLayout>
    </React.Fragment>
  );
}
