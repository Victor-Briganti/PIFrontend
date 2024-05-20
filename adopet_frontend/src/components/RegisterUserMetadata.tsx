import * as React from "react";
import Content from "./container/Content";
import Main from "./container/Main";
import FormUserMetadata from "./forms/FormUserMetadata";
import { validatedCPF, validatedNumber } from "../utils/Verification";

export default function RegisterUserMetadata() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [cpf, setCpf] = React.useState<string>("");
  const [birthdate, setBirthdate] = React.useState<Date | undefined>(undefined);
  const [phone, setPhone] = React.useState<string>("");

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(cpf);
    console.log(phone);
    console.log(birthdate);
  };

  return (
    <Main>
      <Content>
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
      </Content>
    </Main>
  );
}
