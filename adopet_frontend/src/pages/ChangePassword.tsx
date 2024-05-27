import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosUser from "../api/AxiosUser";
import FormChangePassword from "../components/forms/FormChangePassword";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceUserCommon from "../models/interfaces/user/InterfaceUserCommon";

export default function ChangePassword() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<
    InterfaceUserCommon | undefined
  >(undefined);
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const axiosUser = new AxiosUser();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.user) {
      setCurrentUser(location.state.user);
    }
  }, [location]);

  const handlePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (openModal === false) {
      setMessageError("");
      setPassword(event.target.value);
    }
  };

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (openModal === false) {
      const value = event.target.value;

      if (value !== undefined) {
        if (
          value.length > password.length ||
          (value.length === password.length && value !== password)
        ) {
          setMessageError("Senhas não coincidem");
          setConfirmPassword(value);
          return;
        }
      }

      setMessageError("");
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessageError("");

    if (password === "" || confirmPassword === "") {
      setMessageError("Senha não pode ser vazia");
      return;
    }

    if (password !== confirmPassword) {
      setMessageError("Senhas não coincidem");
      return;
    }

    if (currentUser !== undefined && currentUser.id !== undefined) {
      setOpenModal(true);
      return;
    }

    setMessageError("Usuário não encontrado");
    return;
  };

  const handleConfirmModal = () => {
    if (currentUser !== undefined && currentUser.id !== undefined) {
      try {
        axiosUser.changePassword({ id: currentUser.id, value: password });
        navigate("/login");
      } catch (error) {
        setOpenModal(false);
        setMessageError(error.message);
        return;
      }
    }

    setOpenModal(false);
    setMessageError("Usuário não encontrado");
    return;
  };

  const handleCloseModal = () => {
    setPassword("");
    setConfirmPassword("");
    setOpenModal(false);
  };

  if (currentUser === undefined) {
    return <h1>Faça login para acessar.</h1>;
  }

  return (
    <FormLayout>
      <FormChangePassword
        password={password}
        confirmPassword={confirmPassword}
        openModal={openModal}
        handleConfirmModal={handleConfirmModal}
        handleCloseModal={handleCloseModal}
        handlePassword={handlePassword}
        handleConfirmPassword={handleConfirmPassword}
        handleSubmit={handleSubmit}
        messageError={messageError}
      />
    </FormLayout>
  );
}
