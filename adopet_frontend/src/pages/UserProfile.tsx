import * as React from "react";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import InterfaceUser from "../models/User";
import AxiosUser from "../api/AxiosUser";
import CardUser from "../components/elements/CardUser";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const axiosUser = new AxiosUser();

export default function UserProfile() {
  const [user, setUser] = React.useState<InterfaceUser | undefined>(undefined);
  const [messageError, setMessageError] = React.useState<string>("");
  const navigate = useNavigate();

  React.useEffect(() => {
    axiosUser
      .getUser()
      .then((response: InterfaceUser) => setUser(response))
      .catch((error) => {
        setMessageError("Usuário não pode ser carregado");
      });
  }, []);

  const handleLogout = () => {
    axiosUser.logout();
    navigate("/");
  };

  if (
    (user === undefined || user?.userCommon === undefined) &&
    messageError !== ""
  ) {
    return (
      <div>
        <h1>{messageError}</h1>
      </div>
    );
  } else if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <Main bgcolor="secondary.light" color="primary.contrastText">
      <Header />
      <CardUser userCommon={user.userCommon} handleLogout={handleLogout} />
      <Footer />
    </Main>
  );
}
