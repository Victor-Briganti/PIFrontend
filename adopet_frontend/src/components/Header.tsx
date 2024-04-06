import * as React from "react";
import * as MuiMaterial from "@mui/material";
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
    <MuiMaterial.AppBar>
      <MuiMaterial.Container maxWidth="xl">
        <MuiMaterial.Toolbar disableGutters>
          <MuiMaterial.Button href="/">
            <img
              // Imagem da logo
              src={`/public/vite.svg?w=164&h=164&fit=crop&auto=format`}
              loading="lazy"
            />
            <MuiMaterial.Typography
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
            </MuiMaterial.Typography>
          </MuiMaterial.Button>
          <MuiMaterial.Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <MuiMaterial.IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </MuiMaterial.IconButton>
            <MuiMaterial.Menu
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
                <MuiMaterial.MenuItem
                  sx={{ padding: "0px" }}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <MuiMaterial.Link
                    textAlign="center"
                    href={pageLink[pages.indexOf(page)]}
                    width={"100%"}
                    sx={{ px: "14px" }}
                    underline="none"
                    color={"textPrimary"}
                  >
                    {page}
                  </MuiMaterial.Link>
                </MuiMaterial.MenuItem>
              ))}
            </MuiMaterial.Menu>
          </MuiMaterial.Box>
          <MuiMaterial.Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <MuiMaterial.Button
                key={page}
                href={pageLink[pages.indexOf(page)]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </MuiMaterial.Button>
            ))}
          </MuiMaterial.Box>
          <MuiMaterial.Box sx={{ flexGrow: 0 }}>
            <MuiMaterial.Tooltip title="Configurações de Usuário">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MuiMaterial.Avatar
                  alt="User Avatar"
                  //   imagem do usuário
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </MuiMaterial.Tooltip>
            <MuiMaterial.Menu
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
                <MuiMaterial.MenuItem
                  sx={{ padding: "0px" }}
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <MuiMaterial.Link
                    textAlign="center"
                    sx={{ px: "14px" }}
                    href={settingLink[settings.indexOf(setting)]}
                    underline="none"
                    color={"textPrimary"}
                  >
                    {setting}
                  </MuiMaterial.Link>
                </MuiMaterial.MenuItem>
              ))}
            </MuiMaterial.Menu>
          </MuiMaterial.Box>
        </MuiMaterial.Toolbar>
      </MuiMaterial.Container>
    </MuiMaterial.AppBar>
  );
}
export default Header;
