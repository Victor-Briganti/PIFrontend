import * as React from "react";
import * as MUI from "@mui/material";
import * as Router from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

interface MenuNavigationProps {
  pages: string[];
  pageLinks: string[];
}

export default function MenuNavigation({
  pages,
  pageLinks,
}: MenuNavigationProps) {
  const [anchorNav, setAnchorNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };

  return (
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
        anchorEl={anchorNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorNav)}
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
              width={"100%"}
              sx={{ px: "14px" }}
              underline="none"
              color={"textPrimary"}
              component={Router.Link}
              to={pageLinks[pages.indexOf(page)]}
            >
              {page}
            </MUI.Link>
          </MUI.MenuItem>
        ))}
      </MUI.Menu>
    </MUI.Box>
  );
}
