import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as MUI from "@mui/material";
import * as Router from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import ErrorAlert from "../elements/ErrorAlert";

interface FormUserMetadataProps {
  messageError: string;
  cpf: string;
  birthdate: Date | undefined;
  phone: string;
  handleCpf: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBirthdate: (date: Date | undefined) => void;
  handlePhone: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormUserMetadata({
  messageError,
  cpf,
  birthdate,
  phone,
  handleCpf,
  handleBirthdate,
  handlePhone,
  handleSubmit,
}: FormUserMetadataProps) {
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
                id="cpf"
                label="CPF"
                name="cpf"
                value={cpf}
                onChange={handleCpf}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="phone"
                label="Telefone"
                name="phone"
                value={phone}
                onChange={handlePhone}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data de Aniversário"
                  format="DD/MM/YYYY"
                  views={["year", "month", "day"]}
                  value={birthdate ? dayjs(birthdate) : null}
                  onChange={(date) => handleBirthdate(date?.toDate())}
                  renderInput={(params) => <MUI.TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
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
