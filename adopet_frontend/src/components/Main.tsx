import * as MUI from "@mui/material";

interface MainProps {
  children: React.ReactNode;
  height?: string;
  bgcolor?: string;
  color?: string;
  sx?: React.CSSProperties;
}

export default function Main({ children, bgcolor, color, sx }: MainProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      bgcolor={bgcolor}
      color={color}
      sx={sx}
      minHeight="100vh"
      height={"100%"}
      flexGrow={1}
    >
      <MUI.CssBaseline />
      {children}
    </MUI.Box>
  );
}
