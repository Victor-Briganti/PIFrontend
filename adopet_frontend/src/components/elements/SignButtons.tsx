import * as MUI from "@mui/material";

export default function SignButtons() {
  return (
    <MUI.Box display={"flex"} flexDirection={"row"}>
      <MUI.Button
        href="/login"
        sx={{
          my: 2,
          color: "white",
          display: "block",
          fontFamily: "monospace",
        }}
      >
        Entre
      </MUI.Button>
      <MUI.Button
        href="/registeruser"
        sx={{
          my: 2,
          color: "white",
          display: "block",
          fontFamily: "monospace",
        }}
      >
        Cadastre-se
      </MUI.Button>
    </MUI.Box>
  );
}
