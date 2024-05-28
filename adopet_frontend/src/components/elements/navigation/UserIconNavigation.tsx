import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosUser from "../../../api/AxiosUser";
import InterfaceUserCommon from "../../../models/interfaces/user/InterfaceUserCommon";
import UserAvatar from "../avatars/UserAvatar";

const axiosUser = new AxiosUser();

export default function UserIconNavigation() {
  const [user, setUser] = React.useState<InterfaceUserCommon | undefined>(
    undefined
  );

  React.useEffect(() => {
    axiosUser.getUserCommon().then((data: InterfaceUserCommon) => {
      setUser(data);
    });
  }, []);

  return user ? (
    <UserAvatar user={user} />
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
