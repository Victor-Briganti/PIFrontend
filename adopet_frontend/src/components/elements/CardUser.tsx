import * as MUI from "@mui/material";
import { useNavigate } from "react-router-dom";
import InterfaceUserCommon from "../../interfaces/user/InterfaceUserCommon";

interface CardUserProps {
  userCommon: InterfaceUserCommon;
  handleLogout: () => void;
}

export default function CardUser({ userCommon, handleLogout }: CardUserProps) {
  const navigate = useNavigate();

  const handleRegisterAnimal = () => {
    navigate("/animalregister");
  };

  const handleChangePassword = () => {
    navigate("/changepassword", {
      state: { user: userCommon },
    });
  };

  return (
    <MUI.Box flexGrow={1} sx={{ paddingBottom: 10, paddingTop: 20 }}>
      <MUI.Card sx={{ minWidth: 600 }}>
        <MUI.CardContent>
          <MUI.Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom={3}
          >
            <MUI.Avatar alt={userCommon.firstname} src="/" />
          </MUI.Box>
          <MUI.Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              {`Bem vindo ${userCommon.firstname} ${userCommon.lastname}`}
            </MUI.Box>
            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              {`Email: ${userCommon.email}`}
            </MUI.Box>
            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              <MUI.Link onClick={handleRegisterAnimal}>
                Registrar Animal
              </MUI.Link>
            </MUI.Box>
            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              <MUI.Link onClick={handleChangePassword}>Alterar Senha</MUI.Link>
            </MUI.Box>
          </MUI.Typography>
          <MUI.Button
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleLogout}
          >
            Sair
          </MUI.Button>
        </MUI.CardContent>
      </MUI.Card>
    </MUI.Box>
  );
}
