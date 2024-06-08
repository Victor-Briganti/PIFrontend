import * as React from "react";
import * as MUI from "@mui/material";
import Footer from "../modules/Footer";
import Header from "../modules/Header";

interface UserProfileLayoutProps {
  children: React.ReactNode;
  bgcolor?: string;
  color?: string;
}

export default function UserProfileLayout({ children, bgcolor, color }: UserProfileLayoutProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      bgcolor={bgcolor ?? "secondary.light"}
      color={color ?? "primary.contrastText"}
      minHeight="100vh"
      height={"100%"}
      flexGrow={1}
    >
      <MUI.CssBaseline />
      <Header />
      <React.Fragment>
        {children}
      </React.Fragment>
      <Footer />
    </MUI.Box>
  );
}
