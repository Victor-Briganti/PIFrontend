import * as MUI from "@mui/material";
import Footer from "../components/modules/Footer";
import Header from "../components/modules/Header";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ListIcon from "@mui/icons-material/List";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
        minHeight="81vh"
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
          </MUI.Grid>

          {/* Histórico de Adoções */}
          <MUI.Box sx={{ mt: 4 }}>
            <MUI.Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "secondary.main",
              }}
            >
              <PetsIcon sx={{ mr: 1 }} />
              Requisições de Adoção
            </MUI.Typography>
            <MUI.Paper
              sx={{
                width: "100%",
                overflowX: "auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
              }}
            >
              <MUI.Table>
                <MUI.TableHead>
                  <MUI.TableRow sx={{ backgroundColor: "secondary.light" }}>
                    <MUI.TableCell>Animal</MUI.TableCell>
                    <MUI.TableCell>Horário</MUI.TableCell>
                    <MUI.TableCell>Data</MUI.TableCell>
                    <MUI.TableCell>Status</MUI.TableCell>
                    <MUI.TableCell>Ações</MUI.TableCell>
                  </MUI.TableRow>
                </MUI.TableHead>
                <MUI.TableBody>
                  <MUI.TableRow
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "grey.100" },
                    }}
                  >
                    <MUI.TableCell>-</MUI.TableCell>
                    <MUI.TableCell>-</MUI.TableCell>
                    <MUI.TableCell>-</MUI.TableCell>
                    <MUI.TableCell>-</MUI.TableCell>
                    <MUI.TableCell>
                      <MUI.Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green",
                          color: "#fff",
                          mr: 2,
                        }}
                      >
                        Aceitar
                      </MUI.Button>
                      <MUI.Button
                        variant="contained"
                        sx={{ backgroundColor: "red", color: "#fff" }}
                      >
                        Recusar
                      </MUI.Button>
                    </MUI.TableCell>
                  </MUI.TableRow>
                </MUI.TableBody>
              </MUI.Table>
            </MUI.Paper>
          </MUI.Box>
        </MUI.Container>
      </MUI.Box>
      <Footer />
    </ThemeProvider>
  );
}
