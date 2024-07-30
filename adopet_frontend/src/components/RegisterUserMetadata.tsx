import * as React from "react";
import AxiosUser from "../api/AxiosUser";
import InterfaceUserMetadata from "../models/interfaces/user/InterfaceUserMetadata";
import { validatedCPF, validatedNumber } from "../utils/Verification";
import FormUserMetadata from "./forms/FormUserMetadata";

interface RegisterUserMetadataProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleRegisterStep: () => void;
}

export default function RegisterUserMetadata({
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
      setMessageError("");

      // Remove tudo que não for númerico
      let data = event.target.value.replace(/\D/g, "");
      if (data.length > 11) {
        data = data.substring(0, 11);
      }

      // Formata o CPF
      switch (data.length) {
        case 0:
          setCpf("");
          break;
        case 1:
        case 2:
        case 3:
          setCpf(data);
          break;
        case 4:
        case 5:
        case 6:
          setCpf(data.replace(/(\d{3})/, "$1."));
          break;
        case 7:
        case 8:
        case 9:
          setCpf(data.replace(/(\d{3})(\d{3})/, "$1.$2."));
          break;
        default:
          setCpf(data.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-"));
          break;
      }
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
      setMessageError("");

      // Remove tudo que não for númerico
      let data = event.target.value.replace(/\D/g, "");
      if (data.length > 11) {
        data = data.substring(0, 11);
      }

      // Formata o número do telefone
      switch (data.length) {
        case 0:
          setPhone("");
          break;
        case 1:
          setPhone(data.replace(/(\d{1})/, "($1"));
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          setPhone(data.replace(/(\d{2})/, "($1)"));
          break;
        default:
          setPhone(data.replace(/(\d{2})(\d{5})/, "($1)$2-"));
          break;
      }
    },
    [setPhone, setMessageError]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedCPF = cpf.replace(/\D/g, "");
    if (!validatedCPF(formattedCPF)) {
      setMessageError("CPF inválido");
      return;
    }

    const formattedPhone = phone.replace(/\D/g, "");
    if (!validatedNumber(formattedPhone)) {
      setMessageError("Telefone inválido");
      return;
    }

    if (birthdate !== undefined) {
      const userMetadata = {
        cpf: formattedCPF,
        birth_date: birthdate,
        phone: formattedPhone,
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
