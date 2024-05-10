import * as MUI from "@mui/material";
import ModelUserCommon from "../../models/UserCommon";

interface UserAvatarProps {
  user: ModelUserCommon;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <MUI.Box sx={{ flexGrow: 0 }}>
      <MUI.Tooltip title="Configurações de Usuário">
        <MUI.Avatar
          alt={user.getFirstname?.()}
          src={user.getAvatar?.() ?? "/"}
        />
      </MUI.Tooltip>
    </MUI.Box>
  );
}
