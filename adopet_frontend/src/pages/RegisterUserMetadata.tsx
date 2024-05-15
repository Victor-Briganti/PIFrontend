import * as React from "react";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import FormUserMetadata from "../components/forms/UserMetadata";
import { validatedCPF, validatedNumber } from "../utils/Verification";

export default function RegisterUserMetadata() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [cpf, setCpf] = React.useState<string>("");
  const [birthdate, setBirthdate] = React.useState<Date | null>(null);
  const [phone, setPhone] = React.useState<string>("");

  const handleCpf = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const data = event.target.value;
      if (validatedNumber(data) === false && data !== "") {
        setMessageError("CPF aceita somente números");
      }

      if (data.length <= 11) setCpf(data);

      if (data.length === 11 && validatedCPF(data) === false) {
        setMessageError("CPF inválido");
      }
    },
    [setCpf, setMessageError]
  );

  const handleBirthdate = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const data = event.target.value;
      setBirthdate(new Date(data));
    },
    [setBirthdate]
  );

  const handlePhone = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const data = event.target.value;
      if (validatedNumber(data) === false && data !== "") {
        setMessageError("Telefone aceita somente números");
      }

      setPhone(data);
    },
    [setPhone, setMessageError]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Teste");
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
