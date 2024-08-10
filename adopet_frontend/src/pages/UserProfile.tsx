import * as React from "react";
import * as Router from "react-router-dom";
import AxiosUser from "../api/AxiosUser";
import CardUser from "../components/elements/cards/CardUser";
import InterfaceUser from "../models/interfaces/user/InterfaceUser";
import UserContext from "../hooks/UserContext";
import UserProfileLayout from "../components/layouts/UserProfileLayout";
import UserContextNode from "../components/UserContextNode";

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

  const handleLogout = React.useCallback(() => {
    axiosUser.logout();
    user.setContext(null);
    navigate("/");
  }, [axiosUser, user, navigate]);

  if (messageError !== "") {
    <div>
      <h1>{messageError}</h1>
    </div>;
  }

  return (
    <UserContextNode>
      <UserProfileLayout bgcolor="secondary.light" color="primary.contrastText">
        {user.context === null ? (
          <div>
            <h1>Usuário não pode ser carregado</h1>
          </div>
        ) : (
          <CardUser userCommon={user.context} handleLogout={handleLogout} />
        )}
      </UserProfileLayout>
    </UserContextNode>
  );
}
