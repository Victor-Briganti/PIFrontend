import * as React from "react";
import * as MuiMaterial from "@mui/material";
import Header from "./Header";
import Copyright from "./CopyRight";

const defaultTheme = MuiMaterial.createTheme();

export default function Home() {
  return (
    <MuiMaterial.ThemeProvider theme={defaultTheme}>
      <MuiMaterial.Container component="main" maxWidth="xs">
        <MuiMaterial.CssBaseline />
        <Header />
        <Copyright />
      </MuiMaterial.Container>
    </MuiMaterial.ThemeProvider>
  );
}
