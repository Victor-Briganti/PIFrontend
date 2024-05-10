import * as MUI from "@mui/material";
import UserSection from "./section/UserSection";
import LinkSection from "./section/LinkSection";

const pages = ["Sobre Nós", "Doação", "Animais"];
const pageLinks = ["/about", "/donation", "/animals"];

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
          <LinkSection pageLinks={pageLinks} pages={pages} />
          <MUI.Box sx={{ marginLeft: "auto", paddingLeft: 2 }}>
            <UserSection />
          </MUI.Box>
        </MUI.Toolbar>
      </MUI.Container>
    </MUI.AppBar>
  );
}
