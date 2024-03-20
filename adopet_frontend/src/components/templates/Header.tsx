import React from "react";
import { Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";

import logo from "../images/logo-manus.png";

function Header() {
  return (
    <header color="black">
      <Toolbar>
        <Stack
          component={"div"}
          flexDirection={"row"}
          alignItems={"center"}
          sx={{ flexGrow: 1 }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}
            href="/"
          >
            <img src={logo} alt="Adopets" width={125} height={110} />
          </IconButton>
          <Typography variant="h2" component="div" width={"120"}>
            <b>Adopets</b>
          </Typography>
        </Stack>
        <Stack direction="row" spacing="2">
          <Button color="inherit" href="/about">
            Sobre Nós
          </Button>
          <Button color="inherit" href="/contact">
            Contato
          </Button>
          <Button color="inherit" href="/signin">
            Entrar
          </Button>
          <Button color="inherit" href="/signup">
            Cadastro
          </Button>
        </Stack>
      </Toolbar>
    </header>
  );
}

export default Header;
