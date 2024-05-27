import * as MUI from "@mui/material";

interface MainErrorProps {
  children: React.ReactNode;
}

export default function MainError({ children }: MainErrorProps) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      minHeight="100vh"
      height={"100%"}
      flexGrow={1}
    >
      {children}
    </MUI.Box>
  );
}
