import React from "react";
import { Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container component="main" maxWidth="xs">
      <h1>Sobre Nós</h1>
      <Typography variant="h5">
        A Adopet é uma plataforma que conecta pessoas que querem adotar um pet
        com animais que precisam de um lar.
      </Typography>
    </Container>
  );
}
