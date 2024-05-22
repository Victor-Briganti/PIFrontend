import * as React from "react";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import InterfaceUser from "../models/User";
import AxiosUser from "../api/AxiosUser";
import CardUser from "../components/elements/CardUser";

const axiosUser = new AxiosUser();

export default function UserProfile() {
  const [user, setUser] = React.useState<InterfaceUser | undefined>(undefined);
  const [messageError, setMessageError] = React.useState<string>("");

  React.useEffect(() => {
    axiosUser
      .getUser()
      .then((response: InterfaceUser) => setUser(response))
      .catch((error) => {
        setMessageError("Usuário não pode ser carregado");
      });
  }, []);

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
    <Main>
      <Content>
        <CardUser
          userCommon={user.userCommon}
          userMetadata={user.userMetadata}
        />
      </Content>
    </Main>
  );
}
