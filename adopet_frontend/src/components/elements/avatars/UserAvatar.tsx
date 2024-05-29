import * as MUI from "@mui/material";
import * as Router from "react-router-dom";
import InterfaceUserCommon from "../../../models/interfaces/user/InterfaceUserCommon";

interface UserAvatarProps {
  user: InterfaceUserCommon;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <MUI.Box sx={{ flexGrow: 0 }}>
      <MUI.IconButton component={Router.Link} to={"/user"}>
        <MUI.Tooltip title={user.firstname}>
          {typeof user.avatar === "string" || user.avatar === undefined ? (
            <MUI.Avatar alt={user.firstname} src={user.avatar ?? "/"} />
          ) : (
            <MUI.Avatar alt="Usuário não encontrado" src="/" />
          )}
        </MUI.Tooltip>
      </MUI.IconButton>
    </MUI.Box>
  );
}
