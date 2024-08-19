import * as MUI from "@mui/material";
import Slider from "../components/elements/Slider";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";

// Icons
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";

const banners = [
  "src/assets/banner1.webp",
  "src/assets/banner2.webp",
  "src/assets/banner3.webp",
  "src/assets/banner4.webp",
];

export default function Home() {
  return (
    <>
      <Header />
      <MUI.Box
        component="main"
        display={"flex"}
        flexDirection={"column"}
        bgcolor={"primary.contrastText"}
        color={"primary.contrastText"}
        minHeight="120vh"
      >
        <MUI.CssBaseline />
        <MUI.Container
          className="content"
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "text.primary",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <MUI.Box
            sx={{
              marginTop: "50px",
            }}
          >
            <Slider banners={banners} />
          </MUI.Box>

          <MUI.Box
            sx={{
              marginTop: "40px",
            }}
          >
            <MUI.Typography variant="h4">Adote Hoje um Amigo</MUI.Typography>
            <MUI.Typography variant="h6">
              Estamos prontos para ajudar você a escolher um amigo para a vida
              toda.
            </MUI.Typography>

            <MUI.Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{
                marginTop: "40px",
              }}
            >
              <MUI.Card
                variant="outlined"
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <PetsIcon fontSize="large" sx={{ mb: 1 }} />{" "}
                <MUI.Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  +400
                </MUI.Typography>
                <MUI.Typography>Animais Cadastrados</MUI.Typography>
              </MUI.Card>

              <MUI.Card
                variant="outlined"
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <FavoriteIcon fontSize="large" sx={{ mb: 1 }} />{" "}
                <MUI.Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  +200
                </MUI.Typography>
                <MUI.Typography>Animais já adotados</MUI.Typography>
              </MUI.Card>

              <MUI.Card
                variant="outlined"
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <VolunteerActivismIcon fontSize="large" sx={{ mb: 1 }} />{" "}
                <MUI.Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  +50
                </MUI.Typography>
                <MUI.Typography>Doadores</MUI.Typography>
              </MUI.Card>
            </MUI.Box>
          </MUI.Box>
        </MUI.Container>
      </MUI.Box>
      <Footer />
    </>
  );
}
