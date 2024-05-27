import * as MUI from "@mui/material";

interface MainStaticProps {
  children: React.ReactNode;
}

export default function MainStatic({ children }: MainStaticProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      bgcolor="secondary.light"
      color="primary.contrastText"
      minHeight="100vh"
      height={"100%"}
      flexGrow={1}
    >
      <MUI.CssBaseline />
      {children}
    </MUI.Box>
  );
}
