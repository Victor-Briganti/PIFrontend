import * as React from "react";
import * as MuiMaterial from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import UserGet from "./forms/UserGet";
import ChangeSubmit from "./forms/ChangeSubmit";
import { User } from "./models/User";

// TODO: Verificar como alterar o tema padrão do Material-UI
const defaultTheme = MuiMaterial.createTheme();

export default function ChangePassword() {
  const [user, setUser] = React.useState<User | null>(null);
  const [messageError, setMessageError] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [currentFormData, setCurrentFormData] = React.useState<FormData | null>(
    null
  );

  React.useEffect(() => {
    const userGet = new UserGet();
    userGet.send().then((data) => {
      setUser(new User(data));
    });
  }, []);

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

  const handleConfirm = () => {
    const changeSubmit = new ChangeSubmit();
    if (currentFormData !== null) {
      changeSubmit.sendWithUser(currentFormData, user);
    }
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setCurrentFormData(null);
    setOpenModal(false);
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <MuiMaterial.ThemeProvider theme={defaultTheme}>
      <MuiMaterial.Container component="main" maxWidth="xs">
        <MuiMaterial.CssBaseline />
        <MuiMaterial.Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MuiMaterial.Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </MuiMaterial.Avatar>
          <MuiMaterial.Typography component="h1" variant="h5">
            Alterar Senha
          </MuiMaterial.Typography>
          <form onSubmit={handleSubmit} noValidate>
            <MuiMaterial.Typography variant="h5" component="div">
              {`${user.email}`}
            </MuiMaterial.Typography>
            <MuiMaterial.TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nova Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <MuiMaterial.TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            <MuiMaterial.Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Alterar Senha
            </MuiMaterial.Button>
            {messageError && (
              <MuiMaterial.Alert variant="filled" severity="error">
                {messageError}
              </MuiMaterial.Alert>
            )}
          </form>
        </MuiMaterial.Box>
      </MuiMaterial.Container>
      <MuiMaterial.Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MuiMaterial.DialogTitle id="alert-dialog-title">
          {"Deseja alterar sua senha?"}
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
            Confirmar
          </MuiMaterial.Button>
          <MuiMaterial.Button onClick={handleCloseModal} color="primary">
            Cancelar
          </MuiMaterial.Button>
        </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
    </MuiMaterial.ThemeProvider>
  );
}
