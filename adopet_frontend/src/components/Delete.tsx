import * as React from "react";
import * as MuiMaterial from "@mui/material";
import AxiosUser from "./api/AxiosUser";
import { User } from "./models/User";

// TODO: Verificar como alterar o tema padrão do Material-UI
const defaultTheme = MuiMaterial.createTheme();

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function Profile() {
  // Inicializa o estado do usuário como nulo
  const [user, setUser] = React.useState<User | null>(null);

  // Controle do modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  // Quando o componente é montado, faz uma requisição GET para a API
  React.useEffect(() => {
    axiosUser.getUserInfo().then((data: User) => {
      setUser(new User(data));
    });
  }, []);

  // Se o usuário ainda não foi carregado, exibe uma mensagem de carregamento
  // TODO: Verificar se o usuário não está logado mostrar uma tela de erro
  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleConfirm = (event) => {
    event.preventDefault();
    axiosUser.removeUser();
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOpenModal}
          >
            Deletar
          </MuiMaterial.Button>
        </MuiMaterial.CardContent>
      </MuiMaterial.Card>
      <MuiMaterial.Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MuiMaterial.DialogTitle id="alert-dialog-title">
          {"Deseja mesmo excluir essa conta?"}
        </MuiMaterial.DialogTitle>
        <MuiMaterial.DialogContent>
          <MuiMaterial.DialogContentText id="alert-dialog-description">
            Essa ação não pode ser desfeita.
          </MuiMaterial.DialogContentText>
        </MuiMaterial.DialogContent>
        <MuiMaterial.DialogActions>
          <MuiMaterial.Button
            onClick={handleConfirm}
            color="primary"
            autoFocus
            style={{
              marginRight: "10px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            Sim, quero excluir
          </MuiMaterial.Button>
          <MuiMaterial.Button onClick={handleCloseModal} color="primary">
            Cancelar
          </MuiMaterial.Button>
        </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
    </MuiMaterial.ThemeProvider>
  );
}
