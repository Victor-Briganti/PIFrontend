import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListIcon from "@mui/icons-material/List";
import PetsIcon from "@mui/icons-material/Pets";
import * as MUI from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AxiosUser from "../api/AxiosUser";
import Footer from "../components/modules/Footer";
import Header from "../components/modules/Header";
import UserContext from "../hooks/UserContext";
import AboutImage from "../assets/Dashboard.jpeg"; // Atualizando o caminho da imagem

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

export default function Dashboard() {
  const user = React.useContext(UserContext);
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
          {/* Botões de Adoção */}
          <MUI.Grid container spacing={3} justifyContent="center">
            <MUI.Grid item xs={12} sm={6} md={4}>
              <MUI.Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              >
                <MUI.Button
                  startIcon={<CalendarTodayIcon />}
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/animal/register")}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "secondary.main",
                    color: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  }}
                >
                  Doar um Pet
                </MUI.Button>
              </MUI.Paper>
            </MUI.Grid>
            <MUI.Grid item xs={12} sm={6} md={4}>
              <MUI.Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              >
                <MUI.Button
                  startIcon={<ListIcon />}
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/animals/donor")}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "secondary.main",
                    color: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  }}
                >
                  Meus Pets
                </MUI.Button>
              </MUI.Paper>
            </MUI.Grid>
            <MUI.Grid item xs={12} sm={6} md={4}>
              <MUI.Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              >
                <MUI.Button
                  startIcon={<ExitToAppIcon />}
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    const axiosUser = new AxiosUser();
                    axiosUser.logout();
                    user.setContext(null);
                    navigate("/");
                  }}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#db3c27",
                    color: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  Sair
                </MUI.Button>
              </MUI.Paper>
            </MUI.Grid>
          </MUI.Grid>

          {/* Imagem do Dashboard */}
          <MUI.Box sx={{ mt: 12, display: 'flex', justifyContent: 'center' }}>
            <MUI.Paper
              sx={{
                width: "100%",
                maxWidth: "800px", // Aumentando a largura máxima da imagem
                overflow: "hidden",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                p: 1, // Adiciona um pouco de padding ao redor da imagem
              }}
            >
              <img
                src={AboutImage}
                alt="About"
                style={{ width: "100%", height: "auto", borderRadius: 2 }}
              />
            </MUI.Paper>
          </MUI.Box>
        </MUI.Container>
      </MUI.Box>
      <Footer />
    </ThemeProvider>
  );
}