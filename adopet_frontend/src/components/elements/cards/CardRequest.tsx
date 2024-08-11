import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosDonor from "../../../api/AxiosDonor";
import InterfaceAdoption from "../../../models/interfaces/adoption/InterfaceAdoption";
import InterfaceUserCommon from "../../../models/interfaces/user/InterfaceUserCommon";
import Modal from "../../elements/Modal";

interface CardRequestProps {
  adoption: InterfaceAdoption;
}

export default function CardRequest({ adoption }: CardRequestProps) {
  const navigate = Router.useNavigate();
  const axiosDonor = React.useMemo(() => new AxiosDonor(), []);
  const [activate, setActivate] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [adopter, setAdopter] = React.useState<InterfaceUserCommon>();
  const [messageError, setMessageError] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(false);
    if (adoption.id !== undefined) {
      axiosDonor
        .getUserById(adoption.id)
        .then((res) => setAdopter(res))
        .catch(() => setMessageError("Não foi possível acessar o adotante"));
    } else {
      setMessageError("Adoção não definida");
    }
  }, [adoption.id, axiosDonor, setAdopter, setMessageError]);

  const handleAccept = () => {
    if (adoption.id !== undefined) {
      axiosDonor.acceptRequest(adoption.id);
      navigate("/animals/requests");
    }
  };
  const handleReject = React.useCallback(() => {
    setOpenModal(true);
  }, []);
  
  const handleAcceptModal = () => {
    if (adoption.id !== undefined) {
      axiosDonor.rejectRequest(adoption.id);
      setActivate(false);
    }
  };
  const handleCloseModal = React.useCallback(() => {
    setOpenModal(false);
  }, []);

  if (messageError) {
    return (
      <MUI.Card sx={{ minWidth: 400 }}>
        <MUI.Typography>{messageError}</MUI.Typography>
      </MUI.Card>
    );
  }

  if (loading) {
    return (
      <MUI.Card sx={{ minWidth: 400 }}>
        <MUI.CardContent>
          <MUI.Grid container spacing={1} alignItems="center">
            <MUI.Grid item>
              <MUI.Skeleton variant="text" width={100} />
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.Button startIcon={<CheckIcon />} variant="outlined" disabled>
                Aceitar
              </MUI.Button>
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.Button startIcon={<CloseIcon />} variant="outlined" disabled>
                Recusar
              </MUI.Button>
              <Modal
              title={`Deseja rejeitar ${adopter?.firstname}?`}
              dialog="Essa ação não pode ser desfeita."
              openModal={openModal}
              handleConfirmModal={handleAccept}
              handleCloseModal={handleCloseModal}
              />
            </MUI.Grid>
          </MUI.Grid>
        </MUI.CardContent>
      </MUI.Card>
    );
  }

  if (activate) {
    return (
      <MUI.Card sx={{ minWidth: 400 }}>
        <MUI.CardContent>
          <MUI.Grid container spacing={1} flexDirection={"column"} paddingBottom={2}>
            <MUI.Grid item>
              <MUI.Typography>Usuário: {adopter?.firstname} {adopter?.lastname}</MUI.Typography>
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.Typography>Email: {adopter?.email}</MUI.Typography>
            </MUI.Grid>
          </MUI.Grid>
          <MUI.Grid container spacing={1} flexDirection={"row"} justifyContent={"center"}>
            <MUI.Grid item>
              <MUI.Button
                startIcon={<CheckIcon />}
                variant="outlined"
                onClick={handleAccept}
              >
                Aceitar
              </MUI.Button>
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.Button
                startIcon={<CloseIcon />}
                variant="outlined"
                onClick={handleReject}
              >
                Recusar
              </MUI.Button>
              <Modal
              title={`Deseja rejeitar pedido de ${adopter?.firstname}?`}
              dialog="Essa ação não pode ser desfeita."
              openModal={openModal}
              handleConfirmModal={handleAcceptModal}
              handleCloseModal={handleCloseModal}
              />
            </MUI.Grid>
          </MUI.Grid>
        </MUI.CardContent>
      </MUI.Card>
    );
  } else {
    return;
  }
}
