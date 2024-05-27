import * as MUI from "@mui/material";
import InterfaceUserCommon from "../../../models/interfaces/user/InterfaceUserCommon";
import { useNavigate } from "react-router-dom";

interface UserAvatarProps {
  user: InterfaceUserCommon;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/userprofile");
  };

  return (
    <MUI.Box sx={{ flexGrow: 0 }}>
      <MUI.IconButton onClick={handleProfile}>
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
