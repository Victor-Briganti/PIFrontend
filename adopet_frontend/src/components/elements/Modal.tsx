import * as MUI from "@mui/material";

interface ModalProps {
  title: string;
  dialog: string;
  openModal: boolean;
  colorButton?: string;
  handleConfirmModal: () => void;
  handleCloseModal: () => void;
}

export default function Modal({
  title,
  dialog,
  openModal,
  colorButton= "red",
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
      <MUI.DialogTitle id="alert-dialog-title">{title}</MUI.DialogTitle>
      <MUI.DialogContent>
        <MUI.DialogContentText id="alert-dialog-description">
          {dialog}
        </MUI.DialogContentText>
      </MUI.DialogContent>
      <MUI.DialogActions>
        <MUI.Button
          onClick={handleConfirmModal}
          color="primary"
          autoFocus
          style={{
            marginRight: "10px",
            backgroundColor: colorButton,
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
