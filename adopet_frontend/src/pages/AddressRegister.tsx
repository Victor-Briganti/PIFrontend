import * as MUI from "@mui/material";
import * as React from "react";
import AxiosViaCep from "../api/thirdparty/AxiosViaCep";
import Content from "../components/container/Content";
import Main from "../components/container/Main";
import FormAddress from "../components/forms/Address";
import { MapStateChoice } from "../models/map_choices/MapChoices";
import { validatedName, validatedNumber } from "../utils/Verification";

const axiosCep = new AxiosViaCep();

export default function AddressRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [uf, setUf] = React.useState<string>("");
  const [cep, setCep] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [district, setDistrict] = React.useState<string>("");
  const [street, setStreet] = React.useState<string>("");
  const [complement, setComplement] = React.useState<string>("");
  const [houseNumber, setHouseNumber] = React.useState<string>("");
  const [readOnly, setReadOnly] = React.useState<boolean>(false);

  const handleCep = React.useCallback(
    async (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const stateMap = new MapStateChoice();
      const cep = event.target.value;

      if (validatedNumber(cep) === false && cep !== "") {
        setMessageError("CEP inválido");
        return;
      }

      setReadOnly(false);

      if (cep.length <= 8) {
        setCep(cep);
      }

      if (cep.length === 8) {
        try {
          const response = await axiosCep.get(cep);
          setCity(response.localidade);
          setDistrict(response.bairro);
          setStreet(response.logradouro);
          setComplement(response.complemento);
          setUf(stateMap.getValueByKey(response.uf));
          setReadOnly(true);
        } catch (error) {
          console.error("Error fetching CEP:", error);
        }
      }
    },
    [
      setCep,
      setCity,
      setDistrict,
      setStreet,
      setComplement,
      setUf,
      setReadOnly,
      setMessageError,
    ]
  );

  const handleUf = React.useCallback(
    (event: MUI.SelectChangeEvent) => {
      setUf(event.target.value);
    },
    [setUf]
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
          readOnly={readOnly}
          uf={uf}
          cep={cep}
          city={city}
          district={district}
          street={street}
          complement={complement}
          houseNumber={houseNumber}
          handleUf={handleUf}
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
