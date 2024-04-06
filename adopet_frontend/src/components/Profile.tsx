import * as React from "react";
import * as MuiMaterial from "@mui/material";
import AxiosUser from "./api/AxiosUser";
import { User } from "./models/User";

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
    <MuiMaterial.Card sx={{ minWidth: 600 }}>
      <MuiMaterial.CardContent>
        <MuiMaterial.Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {`Bem vindo ${user.firstname} ${user.lastname}`}
        </MuiMaterial.Typography>
        <MuiMaterial.Typography variant="h5" component="div">
          {`Email: ${user.email}`}
        </MuiMaterial.Typography>
        <MuiMaterial.Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Último login: ${user.last_login}`}
        </MuiMaterial.Typography>
      </MuiMaterial.CardContent>
      <MuiMaterial.Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => axiosUser.logout()}
      >
        Sair
      </MuiMaterial.Button>
    </MuiMaterial.Card>
  );
}
