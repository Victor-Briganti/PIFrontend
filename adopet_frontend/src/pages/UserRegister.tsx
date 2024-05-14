import * as React from "react";
import Content from "../components/container/Content";
import Main from "../components/container/Main";
import FormUserCommon from "../components/forms/UserCommon";
import ModelUserCommon from "../models/UserCommon";
import { validatedName, validatedEmail } from "../utils/Verification";

export default function UserRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const handleFirstname = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFirstname(event.target.value);

  const handleLastname = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setLastname(event.target.value);

  const handleEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEmail(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() ?? "";
    const firstname = formData.get("firstname")?.toString() ?? "";
    const lastname = formData.get("lastname")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

    if (validatedName(firstname, 100) === false) {
      setMessageError("Primeiro nome inválido");
      return;
    }

    if (validatedName(lastname, 100) === false) {
      setMessageError("Último nome inválido");
      return;
    }

    if (validatedEmail(email) === false) {
      setMessageError("Email inválido");
      return;
    }

    if (password === "" || password.length < 8) {
      setMessageError("Senha inválida");
      return;
    }

    if (confirmPassword !== password) {
      setMessageError("Senha não coincidem");
      return;
    }

    const user = new ModelUserCommon({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      is_superuser: false,
      is_staff: false,
    });

    console.log(JSON.stringify(user));
  };

  return (
    <Main>
      <Content>
        <FormUserCommon
          messageError={messageError}
          firstname={firstname}
          lastname={lastname}
          email={email}
          handleFirstname={handleFirstname}
          handleLastname={handleLastname}
          handleEmail={handleEmail}
          handleSubmit={handleSubmit}
        />
      </Content>
    </Main>
  );
}
