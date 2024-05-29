import * as React from "react";
import AxiosUser from "../api/AxiosUser";
import InterfaceUserMetadata from "../models/interfaces/user/InterfaceUserMetadata";
import { validatedCPF, validatedNumber } from "../utils/Verification";
import FormUserMetadata from "./forms/FormUserMetadata";

interface RegisterUserMetadataProps {
  user: number | undefined;
  address: number | undefined;
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleRegisterStep: () => void;
}

export default function RegisterUserMetadata({
  user,
  address,
  messageError,
  setMessageError,
  handleRegisterStep,
}: RegisterUserMetadataProps) {
  const [cpf, setCpf] = React.useState<string>("");
  const [birthdate, setBirthdate] = React.useState<Date | undefined>(undefined);
  const [phone, setPhone] = React.useState<string>("");
  const axiosUser = React.useMemo(() => new AxiosUser(), []);

  const handleCpf = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const data = event.target.value;

      if (data.length < 12) setMessageError("");

      if (data.length === 11 && validatedCPF(data) === false) {
        setCpf(data);
        setMessageError("CPF inválido");
        return;
      }

      if (validatedNumber(data) === false && data !== "") {
        setMessageError("CPF aceita somente números");
        return;
      }

      if (data.length <= 11) setCpf(data);
    },
    [setCpf, setMessageError]
  );

  const handleBirthdate = React.useCallback(
    (date: Date | undefined) => {
      if (date !== undefined) setBirthdate(date);
    },
    [setBirthdate]
  );

  const handlePhone = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const data = event.target.value;
      if (validatedNumber(data) === false && data !== "") {
        setMessageError("Telefone aceita somente números");
        return;
      }

      setPhone(data);
      setMessageError("");
    },
    [setPhone, setMessageError]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      user !== undefined &&
      address !== undefined &&
      birthdate !== undefined
    ) {
      const userMetadata = {
        user: user,
        address: address,
        cpf: cpf,
        birth_date: birthdate,
        phone: phone,
      } as InterfaceUserMetadata;
      try {
        await axiosUser.registerMetadata(userMetadata);
        setMessageError("");
        handleRegisterStep();
        return;
      } catch (error) {
        setMessageError(error.message);
        return;
      }
    }

    setMessageError("Usuário não pode ser cadastrado");
  };

  return (
    <FormUserMetadata
      messageError={messageError}
      cpf={cpf}
      birthdate={birthdate}
      phone={phone}
      handleCpf={handleCpf}
      handleBirthdate={handleBirthdate}
      handlePhone={handlePhone}
      handleSubmit={handleSubmit}
    />
  );
}
