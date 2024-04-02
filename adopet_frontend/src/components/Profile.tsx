import * as React from "react";
import * as MuiMaterial from "@mui/material";
import UserGet from "./forms/UserGet";
import LogoutSubmit from "./forms/LogoutSubmit";
import { User } from "./models/User";

// TODO: Verificar como alterar o tema padrão do Material-UI
const defaultTheme = MuiMaterial.createTheme();

export default function Profile() {
  // Inicializa o estado do usuário como nulo
  const [user, setUser] = React.useState<User | null>(null);

  // Quando o componente é montado, faz uma requisição GET para a API
  React.useEffect(() => {
    const userGet = new UserGet();
    userGet.send().then((data) => {
      setUser(new User(data));
    });
  }, []);

  // Se o usuário ainda não foi carregado, exibe uma mensagem de carregamento
  // TODO: Verificar se o usuário não está logado mostrar uma tela de erro
  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleLogout = async () => {
    const logoutSubmit = new LogoutSubmit();
    logoutSubmit.send(event);
  };

  // Exibe as informações do usuário
  return (
    <MuiMaterial.ThemeProvider theme={defaultTheme}>
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
          <MuiMaterial.Button
            type="logout"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogout}
          >
            Sair
          </MuiMaterial.Button>
        </MuiMaterial.CardContent>
      </MuiMaterial.Card>
    </MuiMaterial.ThemeProvider>
  );
}
