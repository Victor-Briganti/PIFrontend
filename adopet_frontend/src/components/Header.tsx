import * as React from "react";
import * as MUI from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Sobre Nós", "Contato", "Blog"];
const pageLink = ["/about", "/contact", "/blog"];
const settings = ["Perfil", "Sair"];
const settingLink = ["/profile", "/logout"];

function Header() {
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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <MUI.AppBar>
      <MUI.Container maxWidth="xl">
        <MUI.Toolbar disableGutters>
          <MUI.Button href="/">
            <img
              // Imagem da logo
              src={`/public/vite.svg?w=164&h=164&fit=crop&auto=format`}
              loading="lazy"
            />
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
          <MUI.Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
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
          <MUI.Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
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
          <MUI.Box sx={{ flexGrow: 0 }}>
            <MUI.Tooltip title="Configurações de Usuário">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MUI.Avatar
                  alt="User Avatar"
                  //   imagem do usuário
                  src="/static/images/avatar/2.jpg"
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
                    href={settingLink[settings.indexOf(setting)]}
                    underline="none"
                    color={"textPrimary"}
                  >
                    {setting}
                  </MUI.Link>
                </MUI.MenuItem>
              ))}
            </MUI.Menu>
          </MUI.Box>
        </MUI.Toolbar>
      </MUI.Container>
    </MUI.AppBar>
  );
}
export default Header;
