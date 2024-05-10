import * as MUI from "@mui/material";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Donation() {
  return (
    <Main>
      <Header />
      <Content>
        <MUI.Typography variant="h4" gutterBottom textAlign="center">
          Quero Ajudar
        </MUI.Typography>
        <MUI.Typography
          variant="h6"
          paragraph
          sx={{ textAlign: "justify", width: "100%" }}
        >
          O Adopet um refúgio de Esperança é a mais ampla e emocionante
          plataforma de adoção de animais do Brasil. Nosso propósito transcende
          o simples ato de adoção; é uma jornada de resgate, amor e redenção.
          Desde o seu início, temos sido os arquitetos de histórias
          transformadoras, unindo corações humanos e patinhas peludas em um elo
          de amor eterno.
        </MUI.Typography>
        <br />
        <br />
        <MUI.Typography variant="h4" gutterBottom textAlign="left">
          Doe agora! acesse o QR Code abaixo e faça sua doação.
        </MUI.Typography>
        <MUI.Typography variant="body1" textAlign="center">
          <img src="src/assets/qr.png" alt="QR Code" />
        </MUI.Typography>
        <br />
      </Content>
      <Footer />
    </Main>
  );
}
