import * as MUI from "@mui/material";
import * as Router from "react-router-dom";
import Footer from "../components/modules/Footer";
import Header from "../components/modules/Header";

export default function About() {
  const navigate = Router.useNavigate();

  return (
    <>
      <Header />
      <MUI.Box
        component="main"
        display={"flex"}
        flexDirection={"column"}
        bgcolor={"primary.contrastText"}
        color={"primary.contrastText"}
        minHeight="100vh"
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
              width: "100%",
            }}
          >
            <img src="src/assets/about.png" alt="Sobre Nós" />
          </MUI.Box>
          <MUI.Typography variant="h3">Sobre Nós</MUI.Typography>
          <MUI.Typography variant="h5">
            Nossa missão é o de dar visibilidade aos animais que aguardam por um
            lar em abrigos por todo o país. Nosso objetivo é de possibilitar os
            animais de encontraram um lugar onde possam descansar tranquilos,
            brincar livremente e receber todo o amor e carinho que merecem!
          </MUI.Typography>
          <MUI.Box
            sx={{
              width: "100%",
            }}
          >
            <MUI.Button
              variant="contained"
              onClick={() => navigate("/animals")}
              sx={{
                marginTop: "50px",
                width: "50%",
                fontWeight: "bold",
              }}
            >
              Adotar
            </MUI.Button>
          </MUI.Box>
        </MUI.Container>
      </MUI.Box>
      <Footer />
    </>
  );
}
