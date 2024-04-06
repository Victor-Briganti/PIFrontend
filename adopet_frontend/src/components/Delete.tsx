import * as React from "react";
import * as MUI from "@mui/material";
import AxiosUser from "./api/AxiosUser";
import { User } from "./models/User";

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function Profile() {
  // Inicializa o estado do usuário como nulo
  const [user, setUser] = React.useState<User | null>(null);
  const [messageError, setMessageError] = React.useState<string>("");

  // Controle do modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  // Quando o componente é montado, faz uma requisição GET para a API
  React.useEffect(() => {
    axiosUser
      .getUserInfo()
      .then((data: User) => {
        setUser(new User(data));
      })
      .catch((error) => {
        if (error.message === "Authentication credentials were not provided.") {
          console.log("Aqui");
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
    <MUI.Box>
      <MUI.Card sx={{ minWidth: 600 }}>
        <MUI.CardContent>
          <MUI.Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {`Bem vindo ${user.firstname} ${user.lastname}`}
          </MUI.Typography>
          <MUI.Typography variant="h5" component="div">
            {`Email: ${user.email}`}
          </MUI.Typography>
          <MUI.Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`Último login: ${user.last_login}`}
          </MUI.Typography>
          <MUI.Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOpenModal}
          >
            Deletar
          </MUI.Button>
        </MUI.CardContent>
      </MUI.Card>
      <MUI.Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MUI.DialogTitle id="alert-dialog-title">
          {"Deseja mesmo excluir essa conta?"}
        </MUI.DialogTitle>
        <MUI.DialogContent>
          <MUI.DialogContentText id="alert-dialog-description">
            Essa ação não pode ser desfeita.
          </MUI.DialogContentText>
        </MUI.DialogContent>
        <MUI.DialogActions>
          <MUI.Button
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
          </MUI.Button>
          <MUI.Button onClick={handleCloseModal} color="primary">
            Cancelar
          </MUI.Button>
        </MUI.DialogActions>
      </MUI.Dialog>
    </MUI.Box>
  );
}
