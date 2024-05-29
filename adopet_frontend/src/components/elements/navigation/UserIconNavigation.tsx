import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import UserAvatar from "../avatars/UserAvatar";
import UserContext from "../../../hooks/UserContext";
import AxiosUser from "../../../api/AxiosUser";
import InterfaceUserCommon from "../../../models/interfaces/user/InterfaceUserCommon";

export default function UserIconNavigation() {
  const axiosUser = new AxiosUser();
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    if (user.context === null) {
      axiosUser.getUserCommon().then((data: InterfaceUserCommon) => {
        user.setContext(data);
      });
    }
  });

  return user.context ? (
    <UserAvatar user={user.context} />
  ) : (
    <React.Fragment>
      <MUI.Box display={"flex"} flexDirection={"row"}>
        <MUI.Button
          component={Router.Link}
          to="/user/login"
          sx={{
            sx: "14px",
            my: 2,
            color: "white",
            underline: "none",
            fontFamily: "monospace",
          }}
        >
          Entre
        </MUI.Button>
        <MUI.Button
          component={Router.Link}
          to="/user/register"
          sx={{
            sx: "14px",
            my: 2,
            color: "white",
            underline: "none",
            fontFamily: "monospace",
          }}
        >
          Cadastre-se
        </MUI.Button>
      </MUI.Box>
    </React.Fragment>
  );
}
