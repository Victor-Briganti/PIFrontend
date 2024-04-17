import * as React from "react";
import * as MUI from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom"; // Importe o Link do React Router

export default function Donation() {
  const theme = MUI.useTheme();

  return (
    <MUI.Box
      component="main"
      display={"flex"}
      bgcolor="secondary.light"
      color="primary.contrastText"
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Header />
      <MUI.CssBaseline />
      <MUI.Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          color: "text.primary",
          padding: 2,
          borderRadius: 1,
          marginTop: "auto",
          marginBottom: "auto",
          paddingTop: "100px",
          paddingBottom: "20px",
          flexGrow: 1,
        }}
      >
         <MUI.Typography variant="h4" gutterBottom textAlign="center">
            Quero Ajudar
          </MUI.Typography>
          <MUI.Typography
            variant="h6"
            paragraph
            sx={{ textAlign: "justify", width: "100%" }} 
          >
            O Adopete um refúgio de Esperança é a mais ampla e emocionante plataforma de adoção de animais do Brasil.
            Nosso propósito transcende o simples ato de adoção; é uma jornada de resgate, amor e redenção. Desde o seu início,
            temos sido os arquitetos de histórias transformadoras, unindo corações humanos e patinhas peludas em um elo de amor eterno.
          </MUI.Typography>
          <br />
          <br />
          <MUI.Typography variant="h4" gutterBottom textAlign="left">
            Doe agora!
            acesse o QR Code abaixo e faça sua doação.  
          </MUI.Typography>
          <MUI.Typography variant="body1" textAlign="justify">
            <img src="/public/frame.png" alt="QR Code" />
          </MUI.Typography>
          <br />
      </MUI.Container>
      <Footer />
    </MUI.Box>
  );
}
