import * as MUI from "@mui/material";
import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorAlert from "../elements/ErrorAlert";
import Modal from "../elements/Modal";

interface FormChangePasswordProps {
  password: string;
  confirmPassword: string;
  openModal: boolean;
  handleConfirmModal: () => void;
  handleCloseModal: () => void;
  handlePassword: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleConfirmPassword: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  messageError: string;
}

export default function FormChangePassword({
  password,
  confirmPassword,
  openModal,
  handleConfirmModal,
  handleCloseModal,
  handlePassword,
  handleConfirmPassword,
  handleSubmit,
  messageError,
}: FormChangePasswordProps) {
  return (
    <React.Fragment>
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

        <MUI.Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <MUI.TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            autoComplete="password"
            value={password}
            onChange={handlePassword}
            autoFocus
            type="password"
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
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />

          <MUI.Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </MUI.Button>

          <ErrorAlert messageError={messageError} />
          <Modal
            openModal={openModal}
            handleConfirmModal={handleConfirmModal}
            handleCloseModal={handleCloseModal}
          />
        </MUI.Box>
      </MUI.Box>
    </React.Fragment>
  );
}
