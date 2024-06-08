import * as MUI from "@mui/material"
import * as Router from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TopArrowBack() {
  const navigate = Router.useNavigate();

  return (
    <MUI.Box
      sx={{
        marginTop: 0, // Adjust this value as needed
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the start (left)
        position: "fixed", // Position fixed so it stays on top
        top: 20, // Align to the top of the screen
        left: 10,
        width: "100%", // Full width
        bgcolor: "background.paper", // Same color as content background
        zIndex: 1, // Ensure it's above the content
      }}
    >
      <MUI.IconButton
        sx={{ ml: 1 }} // Add margin to the left
        edge="start"
        color="inherit"
        aria-label="return"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </MUI.IconButton>
    </MUI.Box>
  )

}
