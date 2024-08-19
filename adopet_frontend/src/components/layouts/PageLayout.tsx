import * as MUI from "@mui/material";
import Footer from "../modules/Footer";
import Header from "../modules/Header";

interface PageLayoutProps {
  children: React.ReactNode;
  //bgcolor?: string;
  color?: string;
}

export default function PageLayout({
  children,
 // bgcolor,
  color,
}: PageLayoutProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      bgcolor="transparent"
      color={color ?? "primary.contrastText"}
      minHeight="100vh"
      height={"100%"}
      flexGrow={1}
    >
      <MUI.CssBaseline />
      <Header />
      <MUI.Container
        className="content"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
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
        {children}
      </MUI.Container>
      <Footer />
    </MUI.Box>
  );
}
