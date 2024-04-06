import * as React from "react";
import * as MuiMaterial from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default function About() {
  return (
    <MuiMaterial.Box
      component="main"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      height={"100vh"}
    >
      <MuiMaterial.CssBaseline />
      <Header />
      <MuiMaterial.Box
        className="content"
        flexGrow={1}
        overflow={"scroll"}
        paddingY={10}
      ></MuiMaterial.Box>
      <Footer />
    </MuiMaterial.Box>
  );
}
