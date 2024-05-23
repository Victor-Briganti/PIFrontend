import * as MUI from "@mui/material";

interface ModalProps {
  openModal: boolean;
  handleConfirmModal: () => void;
  handleCloseModal: () => void;
}

export default function Modal({
  openModal,
  handleConfirmModal,
  handleCloseModal,
}: ModalProps) {
  return (
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
          onClick={handleConfirmModal}
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
  );
}
