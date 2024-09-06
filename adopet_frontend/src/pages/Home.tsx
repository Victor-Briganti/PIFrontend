import * as MUI from "@mui/material";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SliderHome from "../components/elements/HomeSlider";

const banners = ["src/assets/banner2.jpg", "src/assets/banner4.png"];
const links = ["/animals", "/about"];

export default function Home() {
  return (
    <>
      <Header />
      <MUI.Box
        component="main"
        display="flex"
        flexDirection="column"
        bgcolor={"primary.contrastText"}
        color={"primary.contrastText"}
        minHeight="100vh"
        sx={{ paddingTop: 0 }}
      >
        <MUI.CssBaseline />

        <MUI.Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SliderHome banners={banners} links={links} />

          <MUI.Box
            sx={{
              marginTop: "40px",
              padding: 2,
            }}
          >
            <MUI.Typography color={"black"} variant="h4">
              Adote Hoje um Amigo
            </MUI.Typography>
            <MUI.Typography color={"black"} variant="h6">
              Estamos prontos para ajudar você a escolher um amigo para a vida
              toda.
            </MUI.Typography>

            <MUI.Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{
                marginTop: "40px",
                gap: 2,
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
                <PetsIcon fontSize="large" sx={{ mb: 1 }} />
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
                <FavoriteIcon fontSize="large" sx={{ mb: 1 }} />
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
                <VolunteerActivismIcon fontSize="large" sx={{ mb: 1 }} />
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
        </MUI.Box>

        <Footer />
      </MUI.Box>
    </>
  );
}
