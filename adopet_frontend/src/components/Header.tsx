import * as React from "react";
import * as MUI from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AxiosUser from "./api/AxiosUser";
import { User } from "./models/User";

const pages = ["Sobre Nós", "Contato"];
const pageLink = ["/about", "/contact"];
const settings = ["Perfil", "Sair"];
const settingLink = ["/profile"];
// Instância axios para acessar o usuário
const axiosUser = new AxiosUser();

function Header() {
  const [user, setUser] = React.useState<User | null>(null);
  const [messageError, setMessageError] = React.useState<string>("");

  // Quando o componente é montado, faz uma requisição GET para a API
  React.useEffect(() => {
    axiosUser
      .getUserInfo()
      .then((data: User) => {
        setUser(new User(data));
      })
      .catch((error) => {
        if (error.message === "Authentication credentials were not provided.") {
          setMessageError("Área restrita, faça login para acessar.");
        }
      });
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    try {
      await axiosUser.logout();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <MUI.AppBar>
      <MUI.Container maxWidth="xl">
        <MUI.Toolbar disableGutters>
          <MUI.Button href="/">
            <MUI.Box pr={2}>
              <img
                // Imagem da logo
                src={"/public/logo.png"}
                width={50}
                height={50}
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
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Adopet
            </MUI.Typography>
          </MUI.Button>
          <MUI.Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MUI.IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </MUI.IconButton>
            <MUI.Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MUI.MenuItem
                  sx={{ padding: "0px" }}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <MUI.Link
                    textAlign="center"
                    href={pageLink[pages.indexOf(page)]}
                    width={"100%"}
                    sx={{ px: "14px" }}
                    underline="none"
                    color={"textPrimary"}
                  >
                    {page}
                  </MUI.Link>
                </MUI.MenuItem>
              ))}
            </MUI.Menu>
          </MUI.Box>
          <MUI.Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MUI.Button
                key={page}
                href={pageLink[pages.indexOf(page)]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </MUI.Button>
            ))}
          </MUI.Box>
          {user ? (
            // está logado
            <MUI.Box sx={{ flexGrow: 0 }}>
              <MUI.Tooltip title="Configurações de Usuário">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MUI.Avatar
                    alt={user.firstname}
                    //   imagem do usuário
                    src="/"
                  />
                </IconButton>
              </MUI.Tooltip>
              <MUI.Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MUI.MenuItem
                    sx={{ padding: "0px" }}
                    key={setting}
                    onClick={handleCloseUserMenu}
                  >
                    <MUI.Link
                      textAlign="center"
                      sx={{ px: "14px" }}
                      underline="none"
                      color={"textPrimary"}
                      href={settingLink[settings.indexOf(setting)]}
                      onClick={setting === "Sair" ? handleLogout : undefined}
                    >
                      {setting}
                    </MUI.Link>
                  </MUI.MenuItem>
                ))}
              </MUI.Menu>
            </MUI.Box>
          ) : (
            <MUI.Box display={"flex"} flexDirection={"row"}>
              <MUI.Button
                href="/login"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Entrar
              </MUI.Button>
              <MUI.Button
                href="/registeruser"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Registrar
              </MUI.Button>
            </MUI.Box>
          )}
        </MUI.Toolbar>
      </MUI.Container>
    </MUI.AppBar>
  );
}
export default Header;
