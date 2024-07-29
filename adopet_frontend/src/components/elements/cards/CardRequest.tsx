import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import * as MUI from "@mui/material";
import * as React from "react";
import * as Router from "react-router-dom";
import AxiosDonor from "../../../api/AxiosDonor";
import InterfaceAdoption from "../../../models/interfaces/adoption/InterfaceAdoption";

interface CardRequestProps {
  adoption: InterfaceAdoption;
}

export default function CardRequest({ adoption }: CardRequestProps) {
  const navigate = Router.useNavigate();
  const axiosDonor = React.useMemo(() => new AxiosDonor(), []);
  const [activate, setActivate] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const handleAccept = () => {
    if (adoption.id !== undefined) {
      axiosDonor.acceptRequest(adoption.id);
      navigate("/animals/requests");
    }
  };

  const handleReject = () => {
    if (adoption.id !== undefined) {
      axiosDonor.rejectRequest(adoption.id);
      setActivate(false);
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

  if (activate) {
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
  } else {
    return;
  }
}
