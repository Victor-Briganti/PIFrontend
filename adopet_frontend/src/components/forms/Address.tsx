import * as MUI from "@mui/material";
import * as React from "react";
import { MapStateChoice } from "../../models/map_choices/MapChoices";
import FormControlField from "../elements/FormControlField";

interface FromAddressProps {
  readOnly: boolean;
  uf: string;
  cep: string;
  city: string;
  district: string;
  street: string;
  complement: string;
  houseNumber: string;
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
}

export default function FormAddress({
  readOnly,
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
}: FromAddressProps) {
  const stateMap = new MapStateChoice();

  return (
    <React.Fragment>
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

        <FormControlField
          id="uf"
          label="Estado"
          name="uf"
          value={uf}
          handleValue={handleUf}
          map={stateMap}
          readOnly={readOnly}
        />

        <MUI.TextField
          required
          fullWidth
          id="city"
          label="Cidade"
          name="city"
          value={city}
          onChange={handleCity}
          variant={readOnly ? "filled" : "outlined"}
          InputProps={{
            readOnly: readOnly,
          }}
        />

        <MUI.TextField
          required
          fullWidth
          id="district"
          label="Bairro"
          name="district"
          value={district}
          onChange={handleDistrict}
          variant={readOnly ? "filled" : "outlined"}
          InputProps={{
            readOnly: readOnly,
          }}
        />

        <MUI.TextField
          required
          fullWidth
          id="street"
          label="Logradouro"
          name="street"
          value={street}
          onChange={handleStreet}
          variant={readOnly ? "filled" : "outlined"}
          InputProps={{
            readOnly: readOnly,
          }}
        />

        <MUI.TextField
          required
          fullWidth
          id="complement"
          label="Complemento"
          name="complement"
          value={complement}
          onChange={handleComplement}
          variant={readOnly ? "filled" : "outlined"}
          InputProps={{
            readOnly: readOnly,
          }}
        />

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
    </React.Fragment>
  );
}
