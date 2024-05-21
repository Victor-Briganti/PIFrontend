import * as React from "react";
import AxiosUser from "../api/AxiosUser";
import ModelUserCommon from "../models/UserCommon";
import { validatedEmail, validatedName } from "../utils/Verification";
import FormUserCommon from "./forms/FormUserCommon";

interface RegisterUserCommonProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleRegisterStep: (user: number | undefined) => void;
}

const axiosUser = new AxiosUser();

export default function RegisterUserCommon({
  messageError,
  setMessageError,
  handleRegisterStep,
}: RegisterUserCommonProps) {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      setMessageError("Senhas não coincidem");
      return;
    }
    setMessageError("");

    const user = new ModelUserCommon({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      is_superuser: false,
      is_staff: false,
    });

    try {
      const response = await axiosUser.registerUser(user);
      handleRegisterStep(response.id);
    } catch (error) {
      setMessageError("Não foi possível cadastrar o usuário");
    }
  };

  return (
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
  );
}
