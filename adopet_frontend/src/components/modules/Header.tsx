import * as MUI from "@mui/material";
import * as Router from "react-router-dom";
import MenuNavigation from "../elements/navigation/MenuNavigation";
import LinkBarNavigation from "../elements/navigation/MenuLinkBarNav";
import UserIconNavigation from "../elements/navigation/UserIconNavigation";

const pages = ["Sobre Nós", "Doação", "Animais"];
const pageLinks = ["/about", "/donation", "/animals"];

export default function Header() {
  const isSmallScreen = MUI.useMediaQuery((theme: MUI.Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <MUI.AppBar color="primary">
      <MUI.Container maxWidth="xl">
        <MUI.Toolbar disableGutters>
          <MUI.Button component={Router.Link} to={"/"}>
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
          {isSmallScreen ? (
            <MenuNavigation pages={pages} pageLinks={pageLinks} />
          ) : (
            <LinkBarNavigation pages={pages} pageLinks={pageLinks} />
          )}
          <MUI.Box sx={{ marginLeft: "auto", paddingLeft: 2 }}>
            <UserIconNavigation />
          </MUI.Box>
        </MUI.Toolbar>
      </MUI.Container>
    </MUI.AppBar>
  );
}
