import * as React from "react";
import * as MUI from "@mui/material";
import AxiosUser from "../api/AxiosUser";
import AvatarUser from "./elements/AvatarUser";
import SignButtons from "./elements/SignButtons";
import NavBar from "./elements/NavBar";
import ModelUserCommon from "../models/UserCommon";

interface UserSectionProps {
  user: ModelUserCommon | null;
}

const pages = ["Sobre Nós", "Doação", "Animais"];
const pageLinks = ["/about", "/donation", "/animals"];

const axiosUser = new AxiosUser();

const UserSection = ({ user }: UserSectionProps) => {
  return user ? <AvatarUser user={user} /> : <SignButtons />;
};

const LinkNavigations = () => {
  return (
    <React.Fragment>
      {pages.map((page) => (
        <MUI.MenuItem sx={{ padding: "0px" }} key={page}>
          <MUI.Link
            textAlign="center"
            href={pageLinks[pages.indexOf(page)]}
            width={"100%"}
            sx={{ px: "14px" }}
            underline="none"
            color="white"
            fontFamily="monospace"
          >
            {page}
          </MUI.Link>
        </MUI.MenuItem>
      ))}
    </React.Fragment>
  );
};

export default function Header() {
  const [user, setUser] = React.useState<ModelUserCommon | null>(null);
  const isSmallScreen = MUI.useMediaQuery((theme: MUI.Theme) =>
    theme.breakpoints.down("sm")
  );

  React.useEffect(() => {
    axiosUser.getUserCommon().then((data: ModelUserCommon) => {
      setUser(data);
    });
  }, []);

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
          {isSmallScreen ? (
            <NavBar pages={pages} pageLinks={pageLinks} />
          ) : (
            <LinkNavigations />
          )}
          <UserSection user={user} />
        </MUI.Toolbar>
      </MUI.Container>
    </MUI.AppBar>
  );
}
