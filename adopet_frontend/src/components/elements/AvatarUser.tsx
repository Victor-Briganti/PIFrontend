import * as MUI from "@mui/material";
import InterfaceUserCommon from "../../models/UserCommon";

interface UserAvatarProps {
  user: InterfaceUserCommon;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <MUI.Box sx={{ flexGrow: 0 }}>
      <MUI.Tooltip title="Configurações de Usuário">
        {typeof user.avatar === "string" || user.avatar === undefined ? (
          <MUI.Avatar alt={user.firstname} src={user.avatar ?? "/"} />
        ) : (
          <MUI.Avatar alt="Usuário não encontrado" src="/" />
        )}
      </MUI.Tooltip>
    </MUI.Box>
  );
}
