import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListIcon from "@mui/icons-material/List";
import PetsIcon from "@mui/icons-material/Pets";
import * as MUI from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Footer from "../components/modules/Footer";
import Header from "../components/modules/Header";
import InterfaceUserCommon from "../models/interfaces/user/InterfaceUserCommon";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8128AD", // Roxo principal
      dark: "#512DA8", // Roxo escuro
      light: "#D1C4E9", // Roxo claro
    },
    secondary: {
      main: "#9575CD", // Roxo para botões secundários
      dark: "#7E57C2", // Roxo escuro para hover
      light: "#D1C4E9", // Roxo claro para outras áreas
    },
  },
});

interface DashboardProps {
  userCommon: InterfaceUserCommon;
  handleLogout: () => void;
}

export default function Dashboard({
  userCommon,
  handleLogout,
}: DashboardProps) {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MUI.Box
        component="main"
        display="flex"
        flexDirection="column"
        bgcolor="primary.contrastText"
        color="primary.contrastText"
        minHeight="100vh"
        sx={{ paddingTop: 4 }} // Add some padding at the top
      >
        <MUI.CssBaseline />
        <MUI.Container
          className="content"
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          {/* User Profile Section */}
          <MUI.Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginBottom={3}
          >
            <MUI.Avatar
              alt={userCommon.firstname}
              src="/" // Replace with actual profile image URL
              sx={{ width: 80, height: 80, mb: 2 }} // Adjust size as needed
            />
            <MUI.Typography variant="h6" component="div" color="black">
              {`Bem-vindo ${userCommon.firstname} ${userCommon.lastname}`}
            </MUI.Typography>
            <MUI.Typography variant="body2" color="black">
              {`Email: ${userCommon.email}`}
            </MUI.Typography>
          </MUI.Box>

          {/* Botões de Adoção */}
          <MUI.Grid
            container
            direction="column"
            spacing={3}
            alignItems="center"
          >
            {[
              {
                text: "Doar um Pet",
                icon: <CalendarTodayIcon />,
                onClick: () => navigate("/animal/register"),
                color: "secondary.main",
                hoverColor: "secondary.dark",
              },
              {
                text: "Meus Pets",
                icon: <PetsIcon />,
                onClick: () => navigate("/animals/donor"),
                color: "secondary.main",
                hoverColor: "secondary.dark",
              },
              {
                text: "Requisições de Adoção",
                icon: <ListIcon />,
                onClick: () => navigate("/animals/requests"),
                color: "secondary.main",
                hoverColor: "secondary.dark",
              },
              {
                text: "Sair",
                icon: <ExitToAppIcon />,
                onClick: () => {
                  handleLogout();
                },
                color: "#db3c27",
                hoverColor: "red",
              },
            ].map((button, index) => (
              <MUI.Grid item xs={12} sm={6} md={4} key={index}>
                <MUI.Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    width: "500px", // Fixed width for uniform size
                    height: "100px", // Fixed height for uniform size
                    display: "flex", // Flexbox for centering contents
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MUI.Button
                    startIcon={button.icon}
                    variant="contained"
                    fullWidth
                    onClick={button.onClick}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: button.color,
                      color: "#fff",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        backgroundColor: button.hoverColor,
                      },
                      fontSize: "1.25rem", // Consistent font size
                      padding: "12px", // Consistent padding
                      width: "100%", // Ensures button takes full width of Paper
                      display: "flex", // Allows proper centering of content
                      alignItems: "center", // Centers icon and text vertically
                      justifyContent: "center", // Centers icon and text horizontally
                    }}
                  >
                    {button.text}
                  </MUI.Button>
                </MUI.Paper>
              </MUI.Grid>
            ))}
          </MUI.Grid>
        </MUI.Container>
      </MUI.Box>
      <Footer />
    </ThemeProvider>
  );
}
