import * as MUI from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import InterfaceUserCommon from "../../../models/interfaces/user/InterfaceUserCommon";

interface CardUserProps {
  userCommon: InterfaceUserCommon;
  handleLogout: () => void;
}

export default function CardUser({ userCommon, handleLogout }: CardUserProps) {
  const navigate = useNavigate();

  const handleRegisterAnimal = React.useCallback(() => {
    navigate("/animal/register");
  }, [navigate]);

  const handleChangePassword = React.useCallback(() => {
    navigate("/user/changepassword", {
      state: { user: userCommon },
    });
  }, [navigate, userCommon]);

  const handleAnimalList = React.useCallback(() => {
    navigate("/animals/donor");
  }, [navigate]);

  const handleAdoptionList = React.useCallback(() => {
    navigate("/animals/requests");
  }, [navigate]);

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

            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              <MUI.Link onClick={handleAnimalList}>
                Lista de Animais Registrados
              </MUI.Link>
            </MUI.Box>

            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              <MUI.Link onClick={handleAdoptionList}>
                Requisição de Adoções
              </MUI.Link>
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
