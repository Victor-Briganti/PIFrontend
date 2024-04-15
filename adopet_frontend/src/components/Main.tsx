import * as MUI from "@mui/material";

export default function Main({ children }) {
  return (
    <MUI.Box
      component="main"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      height={"100vh"}
    >
      {children}
    </MUI.Box>
  );
}
