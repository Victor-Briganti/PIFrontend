import * as MUI from "@mui/material";

interface MainProps {
  children: React.ReactNode;
  bgcolor?: string;
  color?: string;
}

export default function Main({ children, bgcolor, color }: MainProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      minHeight="100vh"
      height={"100%"}
      bgcolor={bgcolor}
      color={color}
      flexGrow={1}
    >
      <MUI.CssBaseline />
      {children}
    </MUI.Box>
  );
}
