import * as React from "react";
import * as Router from "react-router-dom";
import AxiosUser from "../api/AxiosUser";
import PageDynamicLayout from "../components/layouts/PageDynamicLayout";
import CardUser from "../components/elements/cards/CardUser";
import InterfaceUser from "../models/interfaces/user/InterfaceUser";
import UserContext from "../hooks/UserContext";

export default function UserProfile() {
  const user = React.useContext(UserContext);
  const [messageError, setMessageError] = React.useState<string>("");
  const axiosUser = React.useMemo(() => new AxiosUser(), []);
  const navigate = Router.useNavigate();

  React.useEffect(() => {
    if (user.context === null) {
      axiosUser
        .getUser()
        .then((response: InterfaceUser) => user.setContext(response.userCommon))
        .catch((error) => {
          setMessageError("Usuário não pode ser carregado");
        });
    }
  }, [user, axiosUser]);

  const handleLogout = () => {
    axiosUser.logout();
    user.setContext(null);
    navigate("/");
  };

  if (user.context === null && messageError !== "") {
    return (
      <div>
        <h1>{messageError}</h1>
      </div>
    );
  } else if (user.context === null) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <PageDynamicLayout
      bgcolor="secondary.light"
      color="primary.contrastText"
      content={false}
    >
      <CardUser userCommon={user.context} handleLogout={handleLogout} />
    </PageDynamicLayout>
  );
}
