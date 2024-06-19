import * as MUI from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InterfaceAdoption from "../../../models/interfaces/adoption/InterfaceAdoption";
import AxiosDonor from "../../../api/AxiosDonor";

interface CardRequestProps {
  adoption: InterfaceAdoption;
}

export default function CardRequest({ adoption }: CardRequestProps) {
  const axiosDonor = React.useMemo(() => new AxiosDonor(), []);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const handleAccept = () => {
    if (adoption.id !== undefined) {
      axiosDonor.acceptRequest(adoption.id);
    }
  };

  const handleReject = () => {
    if (adoption.id !== undefined) {
      axiosDonor.rejectRequest(adoption.id);
    }
  };

  if (loading) {
    return (
      <MUI.Card sx={{ minWidth: 400 }}>
        <MUI.CardContent>
          <MUI.Grid container spacing={1} alignItems="center">
            <MUI.Grid item>
              <MUI.Skeleton variant="text" width={100} />
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.Button startIcon={<CheckIcon />} variant="outlined" disabled>
                Aceitar
              </MUI.Button>
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.Button startIcon={<CloseIcon />} variant="outlined" disabled>
                Recusar
              </MUI.Button>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.CardContent>
      </MUI.Card>
    );
  }

  return (
    <MUI.Card sx={{ minWidth: 400 }}>
      <MUI.CardContent>
        <MUI.Grid container spacing={1} alignItems="center">
          <MUI.Grid item>
            <MUI.Typography>{adoption.id}</MUI.Typography>
          </MUI.Grid>
          <MUI.Grid item>
            <MUI.Button
              startIcon={<CheckIcon />}
              variant="outlined"
              onClick={handleAccept}
            >
              Aceitar
            </MUI.Button>
          </MUI.Grid>
          <MUI.Grid item>
            <MUI.Button
              startIcon={<CloseIcon />}
              variant="outlined"
              onClick={handleReject}
            >
              Recusar
            </MUI.Button>
          </MUI.Grid>
        </MUI.Grid>
      </MUI.CardContent>
    </MUI.Card>
  );
}
