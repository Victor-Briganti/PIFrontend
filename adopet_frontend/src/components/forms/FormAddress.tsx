import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import StateChoiceMap from "../../models/map_choices/StateChoiceMap";
import ErrorAlert from "../elements/ErrorAlert";
import FormControlField from "../elements/form_control/FormControlField";
import { AlreadyFetched } from "../../models/validators/AlreadyFetched";

interface FromAddressProps {
  messageError: string;
  cep: string;
  complement: string;
  houseNumber: string;
  uf: AlreadyFetched<string>;
  city: AlreadyFetched<string>;
  district: AlreadyFetched<string>;
  street: AlreadyFetched<string>;
  handleUf: (event: MUI.SelectChangeEvent) => void;
  handleCep: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCity: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDistrict: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleStreet: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleComplement: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleHouseNumber: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function FormAddress({
  messageError,
  uf,
  cep,
  city,
  district,
  street,
  complement,
  houseNumber,
  handleUf,
  handleCep,
  handleCity,
  handleDistrict,
  handleStreet,
  handleComplement,
  handleHouseNumber,
  handleSubmit,
}: FromAddressProps) {
  const stateMap = new StateChoiceMap();

  console.log("uf: ", uf);
  console.log("cep: ", cep);
  console.log("city: ", city);
  console.log("district: ", district);
  console.log("street: ", street);
  console.log("complement: ", complement);
  console.log("houseNumber: ", houseNumber);

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
          Cadastro de Endereço
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
                id="cep"
                label="CEP"
                name="cep"
                value={cep}
                onChange={handleCep}
              />
            </MUI.Grid>

            <FormControlField
              id="uf"
              label="Estado"
              name="uf"
              value={uf.data}
              handleValue={handleUf}
              map={stateMap}
              readOnly={uf.data !== "" && uf.isFetched}
            />

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="city"
                label="Cidade"
                name="city"
                value={city.data}
                onChange={handleCity}
                variant={
                  city.data !== "" && city.isFetched ? "filled" : "outlined"
                }
                InputProps={{
                  readOnly: city.data !== "" && city.isFetched,
                }}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="district"
                label="Bairro"
                name="district"
                value={district.data}
                onChange={handleDistrict}
                variant={
                  district.isFetched && district.data !== ""
                    ? "filled"
                    : "outlined"
                }
                InputProps={{
                  readOnly: district.isFetched && district.data !== "",
                }}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="street"
                label="Logradouro"
                name="street"
                value={street.data}
                onChange={handleStreet}
                variant={
                  street.isFetched && street.data !== "" ? "filled" : "outlined"
                }
                InputProps={{
                  readOnly: street.isFetched && street.data !== "",
                }}
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                fullWidth
                id="complement"
                label="Complemento"
                name="complement"
                value={complement}
                onChange={handleComplement}
                variant="outlined"
              />
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TextField
                required
                fullWidth
                id="houseNumber"
                label="Número da Casa"
                name="houseNumber"
                value={houseNumber}
                onChange={handleHouseNumber}
              />
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

            <MUI.Grid item xs={12} sm={12}>
              <MUI.Link
                component={Router.Link}
                to="/user/login"
                variant="body2"
              >
                Já possui uma conta? Entrar
              </MUI.Link>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Box>
      </MUI.Box>
    </React.Fragment>
  );
}
