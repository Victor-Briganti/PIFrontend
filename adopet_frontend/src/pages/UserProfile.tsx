import * as React from "react";
import { useNavigate } from "react-router-dom";
import AxiosUser from "../api/AxiosUser";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/container/Main";
import CardUser from "../components/elements/CardUser";
import InterfaceUser from "../models/User";

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
