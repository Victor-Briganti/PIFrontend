import * as MUI from "@mui/material";
import PageStaticLayout from "../components/layouts/PageStaticLayout";

export default function Donation() {
  return (
    <PageStaticLayout>
      <MUI.Typography variant="h4" gutterBottom textAlign="center">
        Quero Ajudar
      </MUI.Typography>

      <MUI.Typography
        variant="h6"
        paragraph
        sx={{ textAlign: "justify", width: "100%" }}
      >
        O Adopet um refúgio de Esperança é a mais ampla e emocionante plataforma
        de adoção de animais do Brasil. Nosso propósito transcende o simples ato
        de adoção; é uma jornada de resgate, amor e redenção. Desde o seu
        início, temos sido os arquitetos de histórias transformadoras, unindo
        corações humanos e patinhas peludas em um elo de amor eterno.
      </MUI.Typography>

      <br />
      <br />

      <MUI.Typography variant="h4" gutterBottom textAlign="left">
        Doe agora! acesse o QR Code abaixo e faça sua doação.
      </MUI.Typography>

      <MUI.Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: 2,
        }}
      >
        <img src="src/assets/qr.png" alt="QR Code" />
      </MUI.Box>
    </PageStaticLayout>
  );
}
