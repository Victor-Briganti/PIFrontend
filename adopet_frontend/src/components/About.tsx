import * as React from "react";
import * as MUI from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default function About() {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      height={"100vh"}
    >
      <MUI.CssBaseline />
      <Header />
      <MUI.Box
        className="content"
        // flexGrow={1}
        overflow={"scroll"}
        paddingY={10}
      ></MUI.Box>
      <Footer />
    </MUI.Box>
  );
}
