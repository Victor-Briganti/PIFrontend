import * as MUI from "@mui/material";
import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorAlert from "../elements/ErrorAlert";
import DragBox from "../sections/DragBox";
import CircularLoading from "../elements/CircularLoading";
import ImageUploadPreview from "../elements/ImageUploadPreview";

interface FormUserCommonProps {
  messageError: string;
  dragOver: boolean;
  loading: boolean;
  imagePreviews: string[];
  firstname: string;
  lastname: string;
  email: string;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  handleFirstname: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleLastname: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleEmail: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormUserCommon({
  messageError,
  dragOver,
  loading,
  imagePreviews,
  firstname,
  lastname,
  email,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleChange,
  handleRemoveImage,
  handleFirstname,
  handleLastname,
  handleEmail,
  handleSubmit,
}: FormUserCommonProps) {
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
          Cadastro de Usuários
        </MUI.Typography>

        <MUI.Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <MUI.Grid container spacing={2}>
            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="firstname"
                label="Primeiro Nome"
                name="firstname"
                value={firstname}
                onChange={handleFirstname}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="lastname"
                label="Último Nome"
                name="lastname"
                value={lastname}
                onChange={handleLastname}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                type="email"
                onChange={handleEmail}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="password"
                label="Senha"
                name="password"
                type="password"
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="confirmPassword"
                label="Confirmar Senha"
                name="confirmPassword"
                type="password"
              />
            </MUI.Grid>

            {!(imagePreviews.length > 0) && (
              <DragBox
                dragOver={dragOver}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleChange={handleChange}
              />
            )}

            <CircularLoading loading={loading} />

            <ImageUploadPreview
              imagePreviews={imagePreviews}
              handleRemoveImage={handleRemoveImage}
            />

            <MUI.Grid item xs={12} sm={12}>
              <MUI.Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </MUI.Button>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <ErrorAlert messageError={messageError} />
            </MUI.Grid>
          </MUI.Grid>

          <MUI.Grid item xs={12} sm={12}>
            <MUI.Link href="http://localhost:5173/login" variant="body2">
              Já possui uma conta? Entrar
            </MUI.Link>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
    </React.Fragment>
  );
}
