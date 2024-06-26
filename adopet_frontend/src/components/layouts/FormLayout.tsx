import * as React from "react";
import * as MUI from "@mui/material";

interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight="100vh"
      height={"100%"}
      flexGrow={1}
    >
      <MUI.CssBaseline />
      <MUI.Container
        className="content"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          color: "text.primary",
          padding: 2,
          borderRadius: 1,
          paddingTop: "100px",
          paddingBottom: "20px",
          flexGrow: 1,
        }}
      >
        {children}
      </MUI.Container>
    </MUI.Box>
  );
}
