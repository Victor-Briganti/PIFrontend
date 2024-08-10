import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import ErrorAlert from "../elements/ErrorAlert";

interface FormUserCommonProps {
  messageError: string;
  firstname: string;
  lastname: string;
  email: string;
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
  firstname,
  lastname,
  email,
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
              <MUI.FormHelperText>
                {messageError.includes("Email inválido") && messageError}
              </MUI.FormHelperText>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="password"
                label="Senha"
                name="password"
                type="password"
                InputProps={{
                  endAdornment: (
                    messageError.includes("Senha inválida") && (
                      <MUI.InputAdornment position="end">
                        <MUI.Tooltip
                          title={
                            <span style={{ color: "#fff", fontSize: "14px" }}>
                              A senha precisa ter 8 caracteres.
                            </span>
                          }
                          sx={{
                            backgroundColor: "#000000", // Preto mais intenso
                            '& .MuiTooltip-arrow': {
                              color: "#000000", // Preto mais intenso
                            },
                          }}
                          arrow
                          placement="right"
                        >
                          <InfoOutlinedIcon sx={{ color: "#000000" }} />
                        </MUI.Tooltip>
                      </MUI.InputAdornment>
                    )
                  ),
                }}
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
              <MUI.FormHelperText>
                {messageError.includes("Senhas não coincidem") && messageError}
              </MUI.FormHelperText>
            </MUI.Grid>

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
            <MUI.Link component={Router.Link} to="/user/login" variant="body2">
              Já possui uma conta? Entrar
            </MUI.Link>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
    </React.Fragment>
  );
}
