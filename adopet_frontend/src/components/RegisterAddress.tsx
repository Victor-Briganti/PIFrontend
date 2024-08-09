import * as MUI from "@mui/material";
import * as React from "react";
import AxiosAddress from "../api/AxiosAddress";
import AxiosViaCep from "../api/thirdparty/AxiosViaCep";
import InterfaceAddress from "../models/interfaces/address/InterfaceAddress";
import InterfaceCity from "../models/interfaces/address/InterfaceCity";
import InterfaceState from "../models/interfaces/address/InterfaceState";
import StateChoiceMap from "../models/map_choices/StateChoiceMap";
import { validatedString } from "../utils/Verification";
import FormAddress from "./forms/FormAddress";
import { AlreadyFetched } from "../models/validators/AlreadyFetched";

interface RegisterAddressProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleRegisterStep: () => void;
}

export default function RegisterAddress({
  messageError,
  setMessageError,
  handleRegisterStep,
}: RegisterAddressProps) {
  const [cep, setCep] = React.useState<string>("");
  const [complement, setComplement] = React.useState<string>("");
  const [houseNumber, setHouseNumber] = React.useState<string>("");
  const [uf, setUf] = React.useState<AlreadyFetched<string>>({
    data: "",
    isFetched: false,
  });
  const [city, setCity] = React.useState<AlreadyFetched<string>>({
    data: "",
    isFetched: false,
  });
  const [district, setDistrict] = React.useState<AlreadyFetched<string>>({
    data: "",
    isFetched: false,
  });
  const [street, setStreet] = React.useState<AlreadyFetched<string>>({
    data: "",
    isFetched: false,
  });
  const axiosViaCep = React.useMemo(() => new AxiosViaCep(), []);
  const axiosAddress = React.useMemo(() => new AxiosAddress(), []);

  const handleCep = React.useCallback(
    async (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setMessageError("");

      const stateMap = new StateChoiceMap();
      // Remove tudo que não for númerico
      let data = event.target.value.replace(/\D/g, "");
      if (data.length > 8) {
        data = data.substring(0, 8);
      }

      if (data.length >= 6) {
        data = data.substring(0, 5) + "-" + data.substring(5, 8);
      }

      setCep(data);

      if (data.length === 9) {
        try {
          const response = await axiosViaCep.get(data.replace(/\D/g, ""));
          const uf = stateMap.getValueByKey(response.uf);
          if (uf === undefined) {
            setMessageError("Estado não pode ser definido");
            return;
          }

          setUf({ data: uf, isFetched: true });
          setCity({ data: response.localidade, isFetched: true });
          setDistrict({ data: response.bairro, isFetched: true });
          setStreet({ data: response.logradouro, isFetched: true });
          setComplement(response.complemento);
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
      setMessageError,
      axiosViaCep,
    ]
  );

  const handleUf = React.useCallback(
    (event: MUI.SelectChangeEvent) => {
      setUf({ data: event.target.value, isFetched: false });
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

      setCity({ data: city, isFetched: false });
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

      setDistrict({ data: district, isFetched: false });
    },
    [setDistrict, setMessageError]
  );

  const handleStreet = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStreet({ data: event.target.value, isFetched: false });
    },
    [setStreet]
  );

  const handleComplement = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setComplement(event.target.value);
    },
    [setComplement]
  );

  const handleHouseNumber = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHouseNumber(event.target.value);
    },
    [setHouseNumber]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newState = { uf: uf.data } as InterfaceState;
    const newCity = { name: city.data, state: newState } as InterfaceCity;
    const newAddress = {
      city: newCity,
      zip_code: cep.replace(/\D/g, ""),
      district: district.data,
      street: street.data,
      complement: complement,
      house_number: houseNumber,
    } as InterfaceAddress;

    await axiosAddress
      .registerAddress(newAddress)
      .then(() => {
        handleRegisterStep();
      })
      .catch(() => {
        setMessageError("Não foi possível cadastrar endereço");
      });
  };

  return (
    <FormAddress
      messageError={messageError}
      cep={cep}
      complement={complement}
      houseNumber={houseNumber}
      uf={uf}
      city={city}
      district={district}
      street={street}
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
