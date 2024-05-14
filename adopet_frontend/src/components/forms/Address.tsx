import * as React from "react";
import * as MUI from "@mui/material";

interface FromAddressProps {
  cep: string;
  city: string;
  district: string;
  street: string;
  complement: string;
  houseNumber: string;
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
  cep,
  city,
  district,
  street,
  complement,
  houseNumber,
  handleCep,
  handleCity,
  handleDistrict,
  handleStreet,
  handleComplement,
  handleHouseNumber,
}: FromAddressProps) {
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

        <MUI.TextField required fullWidth id="uf" label="UF" name="uf" />

        <MUI.TextField
          required
          fullWidth
          id="city"
          label="Cidade"
          name="city"
          value={city}
          onChange={handleCity}
        />

        <MUI.TextField
          required
          fullWidth
          id="district"
          label="Bairro"
          name="district"
          value={district}
          onChange={handleDistrict}
        />

        <MUI.TextField
          required
          fullWidth
          id="street"
          label="Logradouro"
          name="street"
          value={street}
          onChange={handleStreet}
        />

        <MUI.TextField
          required
          fullWidth
          id="complement"
          label="Complemento"
          name="complement"
          value={complement}
          onChange={handleComplement}
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
