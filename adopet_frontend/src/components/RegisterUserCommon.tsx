import * as React from "react";
import AxiosUser from "../api/AxiosUser";
import InterfaceUserCommon from "../models/interfaces/user/InterfaceUserCommon";
import { validatedEmail, validatedString } from "../utils/Verification";
import FormUserCommon from "./forms/FormUserCommon";

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
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imagePreviews, setImagePreview] = React.useState<string[]>([]);
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [avatar, setAvatar] = React.useState<File | undefined>();
  const axiosUser = React.useMemo(() => new AxiosUser(), []);

  const handleFileChange = React.useCallback(
    (file: File) => {
      setLoading(true);

      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result && typeof reader.result === "string") {
          setImagePreview([reader.result]);
          setAvatar(file);
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    },
    [setAvatar]
  );

  const handleDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(true);
    },
    [setDragOver]
  );

  const handleDragLeave = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
    },
    [setDragOver]
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      handleFileChange(files[0]);
    },
    [handleFileChange]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files !== null) {
        handleFileChange(files[0]);
      }
    },
    [handleFileChange]
  );

  const handleRemoveImage = (_index: number) => {
    setImagePreview([]);
    setAvatar(undefined);
  };

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
  };

  return (
    <FormUserCommon
      messageError={messageError}
      dragOver={dragOver}
      loading={loading}
      imagePreviews={imagePreviews}
      firstname={firstname}
      lastname={lastname}
      email={email}
      handleChange={handleChange}
      handleDragLeave={handleDragLeave}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleRemoveImage={handleRemoveImage}
      handleFirstname={handleFirstname}
      handleLastname={handleLastname}
      handleEmail={handleEmail}
      handleSubmit={handleSubmit}
    />
  );
}
