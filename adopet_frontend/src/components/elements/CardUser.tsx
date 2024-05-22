import * as MUI from "@mui/material";
import InterfaceUserCommon from "../../models/UserCommon";
import InterfaceUserMetadata from "../../models/UserMetadata";

interface CardUserProps {
  userCommon: InterfaceUserCommon;
  userMetadata: InterfaceUserMetadata | undefined;
}

export default function CardUser({ userCommon, userMetadata }: CardUserProps) {
  return (
    <MUI.Box flexGrow={1} sx={{ paddingBottom: 10, paddingTop: 20 }}>
      <MUI.Card sx={{ minWidth: 600 }}>
        <MUI.CardContent>
          <MUI.Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom={3}
          >
            <MUI.Avatar alt={userCommon.firstname} src="/" />
          </MUI.Box>
          <MUI.Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              {`Bem vindo ${userCommon.firstname} ${userCommon.lastname}`}
            </MUI.Box>
            <MUI.Box display="flex" justifyContent="center" alignItems="center">
              {`Email: ${userCommon.email}`}
            </MUI.Box>
          </MUI.Typography>
        </MUI.CardContent>
      </MUI.Card>
    </MUI.Box>
  );
}
