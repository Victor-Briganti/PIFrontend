import * as React from "react";
import * as MUI from "@mui/material";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import FormAddress from "../components/forms/Address";
import { validatedName, validatedNumber } from "../utils/Verification";

export default function AddressRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [cep, setCep] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [district, setDistrict] = React.useState<string>("");
  const [street, setStreet] = React.useState<string>("");
  const [complement, setComplement] = React.useState<string>("");
  const [houseNumber, setHouseNumber] = React.useState<string>("");

  const handleCep = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const cep = event.target.value;

      if ((validatedNumber(cep) === false && cep !== "") || cep.length > 8) {
        setMessageError("CEP inválido");
        return;
      }

      setCep(cep);
    },
    [setCep, setMessageError]
  );

  const handleCity = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const city = event.target.value;
      if (validatedName(city, 100) === false && city !== "") {
        setMessageError("Cidade inválida");
        return;
      }

      setCity(city);
    },
    [setCity, setMessageError]
  );

  const handleDistrict = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const district = event.target.value;
      if (validatedName(district, 100) === false && district !== "") {
        setMessageError("Cidade inválida");
        return;
      }

      setDistrict(district);
    },
    [setDistrict, setMessageError]
  );

  const handleComplement = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setComplement(event.target.value);
    },
    [setComplement]
  );

  const handleStreet = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStreet(event.target.value);
    },
    [setStreet]
  );

  const handleHouseNumber = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHouseNumber(event.target.value);
    },
    [setHouseNumber]
  );

  return (
    <Main>
      <Content>
        <FormAddress
          cep={cep}
          city={city}
          district={district}
          street={street}
          complement={complement}
          houseNumber={houseNumber}
          handleCep={handleCep}
          handleCity={handleCity}
          handleDistrict={handleDistrict}
          handleStreet={handleStreet}
          handleComplement={handleComplement}
          handleHouseNumber={handleHouseNumber}
        />
      </Content>
    </Main>
  );
}
