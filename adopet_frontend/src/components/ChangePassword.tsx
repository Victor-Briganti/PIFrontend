import * as React from "react";
import * as MUI from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AxiosUser from "./api/AxiosUser";
import { User } from "./models/User";
import Main from "./Main";
import { useNavigate } from "react-router-dom";

// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

export default function ChangePassword() {
  const [user, setUser] = React.useState<User | null>(null);
  const [messageError, setMessageError] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [currentFormData, setCurrentFormData] = React.useState<FormData | null>(
    null
  );
  const navigate = useNavigate();

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

  // Função que é chamada quando o formulário é submetido
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      setMessageError("Senhas não coincidem");
      return;
    }

    setCurrentFormData(formData);
    setOpenModal(true);
  };

  // Função que é chamada quando o usuário confirma a alteração de senha
  const handleConfirm = () => {
    const password = currentFormData?.get("password");

    // Verifica se a senha é válida
    if (
      currentFormData === null ||
      password === null ||
      typeof password !== "string"
    ) {
      setMessageError("Senha não pode ser vazia");
    } else if (password !== null && password.toString().length < 8) {
      setMessageError("Senha deve ter no mínimo 8 caracteres");
    } else {
      axiosUser.changePassword(user.id, password);
    }
    setOpenModal(false);
    navigate("/");
  };

  // Função que é chamada quando o usuário fecha o modal de confirmação
  const handleCloseModal = () => {
    setCurrentFormData(null);
    setOpenModal(false);
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <MUI.Box>
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
          <MUI.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </MUI.Avatar>
          <MUI.Typography component="h1" variant="h5">
            Alterar Senha
          </MUI.Typography>
          <form onSubmit={handleSubmit} noValidate>
            <MUI.Typography variant="h5" component="div">
              {`${user.email}`}
            </MUI.Typography>
            <MUI.TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nova Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <MUI.TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            <MUI.Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Alterar Senha
            </MUI.Button>
            {messageError && (
              <MUI.Alert variant="filled" severity="error">
                {messageError}
              </MUI.Alert>
            )}
          </form>
        </MUI.Box>
      </Main>
      <MUI.Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MUI.DialogTitle id="alert-dialog-title">
          {"Deseja alterar sua senha?"}
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
            Confirmar
          </MUI.Button>
          <MUI.Button onClick={handleCloseModal} color="primary">
            Cancelar
          </MUI.Button>
        </MUI.DialogActions>
      </MUI.Dialog>
    </MUI.Box>
  );
}
