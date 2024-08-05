import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@mui/material";
import AxiosUser from "../api/AxiosUser";
import CardUser from "../components/elements/cards/CardUser";
import InterfaceUser from "../models/interfaces/user/InterfaceUser";
import UserContext from "../hooks/UserContext";
import UserProfileLayout from "../components/layouts/UserProfileLayout";

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

  if (user.context === null && messageError !== "") {
    return (
      <React.Fragment>
        <h1>Faça login para acessar.</h1>
        <MUI.Box sx={{ mt: 2 }}>
          <MUI.Link
            component={Router.Link}
            to={"/"}
            variant="body2"
            fontSize={20}
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Voltar para home
          </MUI.Link>
        </MUI.Box>
      </React.Fragment>
    );
  } else if (user.context === null) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <UserProfileLayout bgcolor="secondary.light" color="primary.contrastText">
      <CardUser userCommon={user.context} handleLogout={handleLogout} />
    </UserProfileLayout>
  );
}
