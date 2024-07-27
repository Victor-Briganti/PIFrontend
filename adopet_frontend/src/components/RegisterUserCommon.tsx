import * as React from "react";
import AxiosUser from "../api/AxiosUser";
import InterfaceUserCommon from "../models/interfaces/user/InterfaceUserCommon";
import { validatedEmail, validatedString } from "../utils/Verification";
import FormUserCommon from "./forms/FormUserCommon";
import TopArrowBack from "./elements/navigation/TopArrowBack";

interface RegisterUserCommonProps {
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
  handleRegisterStep: (user: number | undefined) => void;
}

export default function RegisterUserCommon({
  messageError,
  setMessageError,
  handleRegisterStep,
}: RegisterUserCommonProps) {
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [avatar, setAvatar] = React.useState<File | undefined>();
  const axiosUser = React.useMemo(() => new AxiosUser(), []);

  const handleFirstname = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFirstname(event.target.value),
    [setFirstname]
  );

  const handleLastname = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setLastname(event.target.value),
    [setLastname]
  );

  const handleEmail = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEmail(event.target.value),
    [setEmail]
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = formData.get("email")?.toString() ?? "";
      const firstname = formData.get("firstname")?.toString() ?? "";
      const lastname = formData.get("lastname")?.toString() ?? "";
      const password = formData.get("password")?.toString() ?? "";
      const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

      if (validatedString(firstname, 100) === false) {
        setMessageError("Primeiro nome inválido");
        return;
      }

      if (validatedString(lastname, 100) === false) {
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

      const user = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
        is_superuser: false,
        avatar: avatar,
        is_staff: false,
      } as InterfaceUserCommon;

      try {
        const response = await axiosUser.registerUser(user);
        handleRegisterStep(response.id);
      } catch (error) {
        setMessageError("Não foi possível cadastrar o usuário");
      }
    },
    [setMessageError, handleRegisterStep, axiosUser, avatar]
  );

  return (
    <React.Fragment>
      <TopArrowBack />
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
    </React.Fragment>
  );
}
