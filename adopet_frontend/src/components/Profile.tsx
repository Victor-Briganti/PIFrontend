import * as React from "react";
import * as MUI from "@mui/material";
import AxiosUser from "./api/AxiosUser";
import { User } from "./models/User";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function Profile() {
  const [user, setUser] = React.useState<User | null>(null);
  const [messageError, setMessageError] = React.useState<string>("");

  // Quando o componente é montado, faz uma requisição GET para a API
  React.useEffect(() => {
    axiosUser
      .getUserInfo()
      .then((data: User) => {
        setUser(new User(data));
      })
      .catch((error) => {
        if (error.message === "Authentication credentials were not provided.") {
          setMessageError("Área restrita, faça login para acessar.");
        }
      });
  }, []);

  // Se o usuário ainda não foi carregado, exibe uma mensagem de carregamento
  if (!user && messageError !== "") {
    return (
      <div>
        <h1>{messageError}</h1>
      </div>
    );
  } else if (!user) {
    return <div>Carregando...</div>;
  }

  // Exibe as informações do usuário
  return (
    <Main
      height="100%"
      bgcolor="secondary.light"
      color="primary.contrastText"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <MUI.Box flexGrow={1} sx={{ paddingBottom: 10, paddingTop: 20 }}>
        <MUI.Card sx={{ minWidth: 600 }}>
          <MUI.CardContent>
            <MUI.Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginBottom={3}
            >
              <MUI.Avatar alt={user.firstname} src="/" />
            </MUI.Box>
            <MUI.Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <MUI.Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {`Bem vindo ${user.firstname} ${user.lastname}`}
              </MUI.Box>
              <MUI.Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {`Email: ${user.email}`}
              </MUI.Box>
              <MUI.Button
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                href="/registeranimal"
              >
                Cadastrar Animal
              </MUI.Button>
              <MUI.Button fullWidth sx={{ mb: 2 }} href="/changepassword">
                Alterar Senha
              </MUI.Button>
              <MUI.Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => axiosUser.logout()}
              >
                Sair
              </MUI.Button>
            </MUI.Typography>
          </MUI.CardContent>
        </MUI.Card>
      </MUI.Box>
      <Footer />
    </Main>
  );
}
