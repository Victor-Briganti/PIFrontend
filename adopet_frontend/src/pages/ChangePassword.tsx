import * as React from "react";
import * as Router from "react-router-dom";
import AxiosUser from "../api/AxiosUser";
import FormChangePassword from "../components/forms/FormChangePassword";
import FormLayout from "../components/layouts/FormLayout";
import UserContext from "../hooks/UserContext";
import TopArrowBack from "../components/elements/navigation/TopArrowBack";
import UserContextNode from "../components/UserContextNode";

export default function ChangePassword() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const user = React.useContext(UserContext);
  const navigate = Router.useNavigate();

  const handlePassword = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (openModal === false) {
        setMessageError("");
        setPassword(event.target.value);
      }
    },
    [openModal]
  );

  const handleConfirmPassword = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    },
    [openModal, password]
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
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

      if (user.context !== null && user.context.id !== undefined) {
        setOpenModal(true);
        return;
      }

      setMessageError("Usuário não encontrado");
      return;
    },
    [user, password, confirmPassword]
  );

  const handleConfirmModal = React.useCallback(() => {
    const axiosUser = new AxiosUser();

    if (user.context !== null && user.context.id !== undefined) {
      try {
        axiosUser.changePassword({ id: user.context.id, password: password });
        user.setContext(null);
        navigate("/user/login");
      } catch (error) {
        setOpenModal(false);
        setMessageError(error.message);
        return;
      }
    }

    setOpenModal(false);
    setMessageError("Usuário não encontrado");
  }, [user, password, navigate]);

  const handleCloseModal = React.useCallback(() => {
    setPassword("");
    setConfirmPassword("");
    setOpenModal(false);
  }, []);

  return (
    <UserContextNode>
      <FormLayout>
        <TopArrowBack />
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
    </UserContextNode>
  );
}
