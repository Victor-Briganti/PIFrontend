import * as MUI from "@mui/material";
import * as React from "react";
import AxiosAddress from "../api/AxiosAddress";
import AxiosViaCep from "../api/thirdparty/AxiosViaCep";
import InterfaceAddress from "../interfaces/InterfaceAddress";
import InterfaceCity from "../interfaces/InterfaceCity";
import InterfaceState from "../models/State";
import { MapStateChoice } from "../models/map_choices/MapChoices";
import { validatedString, validatedNumber } from "../utils/Verification";
import FormAddress from "./forms/FormAddress";

interface RegisterAddressProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleRegisterStep: (address: number | undefined) => void;
}

const axiosViaCep = new AxiosViaCep();
const axiosAddress = new AxiosAddress();

export default function RegisterAddress({
  messageError,
  setMessageError,
  handleRegisterStep,
}: RegisterAddressProps) {
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
          const response = await axiosViaCep.get(cep);
          setCity(response.localidade);
          setDistrict(response.bairro);
          setStreet(response.logradouro);
          setComplement(response.complemento);
          setUf(stateMap.getValueByKey(response.uf));
          setReadOnly(true);
        } catch (error) {
          setMessageError("Não foi possível encontrar este CEP");
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
      if (validatedString(city, 100) === false && city !== "") {
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
      if (validatedString(district, 100) === false && district !== "") {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newState = { uf: uf } as InterfaceState;
    const newCity = { name: city, state: newState } as InterfaceCity;
    const newAddress = {
      city: newCity,
      zip_code: cep,
      district: district,
      street: street,
      complement: complement,
      house_number: houseNumber,
    } as InterfaceAddress;

    const response = await axiosAddress.registerAddress(newAddress);
    handleRegisterStep(response.id);
  };

  return (
    <FormAddress
      readOnly={readOnly}
      messageError={messageError}
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
      handleSubmit={handleSubmit}
    />
  );
}
