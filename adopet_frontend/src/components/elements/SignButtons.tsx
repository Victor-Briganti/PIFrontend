import * as MUI from "@mui/material";

export default function SignButtons() {
  return (
    <MUI.Box display={"flex"} flexDirection={"row"}>
      <MUI.Button
        href="/login"
        sx={{
          sx: "14px",
          my: 2,
          color: "white",
          underline: "none",
          fontFamily: "monospace",
        }}
      >
        Entre
      </MUI.Button>
      <MUI.Button
        href="/registeruser"
        sx={{
          sx: "14px",
          my: 2,
          color: "white",
          underline: "none",
          fontFamily: "monospace",
        }}
      >
        Cadastre-se
      </MUI.Button>
    </MUI.Box>
  );
}
