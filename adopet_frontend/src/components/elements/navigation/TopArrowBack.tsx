import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as MUI from "@mui/material";
import * as Router from "react-router-dom";

export default function TopArrowBack() {
  const navigate = Router.useNavigate();

  return (
    <MUI.Box
      sx={{
        marginTop: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "fixed",
        top: 20,
        left: 10,
        width: "100%",
        bgcolor: "background.paper",
        zIndex: 1,
      }}
    >
      <MUI.IconButton
        sx={{ ml: 1 }}
        edge="start"
        color="inherit"
        aria-label="return"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </MUI.IconButton>
    </MUI.Box>
  );
}
