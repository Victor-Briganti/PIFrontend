import * as MUI from "@mui/material";

export default function Header() {
  return (
    <MUI.AppBar color="primary">
      <MUI.Container maxWidth="xl">
        <MUI.Toolbar disableGutters>
          <MUI.Button href="/">
            <MUI.Box pr={2}>
              <img
                src={"src/assets/logo.png"}
                width={40}
                height={40}
                loading="lazy"
              />
            </MUI.Box>
            <MUI.Typography
              variant="h6"
              noWrap
              component={"span"}
              className="logo"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              Adopet
            </MUI.Typography>
          </MUI.Button>
        </MUI.Toolbar>
      </MUI.Container>
    </MUI.AppBar>
  );
}
