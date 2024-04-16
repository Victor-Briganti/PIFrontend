import * as MUI from "@mui/material";

interface MainProps {
  children: React.ReactNode;
  height?: string
  bgcolor?: string
  color?: string
  sx?: React.CSSProperties;
}

export default function Main({ children, height, bgcolor, color, sx }: MainProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      height={height}
      bgcolor={bgcolor}
      color={color}
      sx={sx}
    >
      {children}
    </MUI.Box>
  );
}
