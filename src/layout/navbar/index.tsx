import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Logo } from "../../assets/Logo";
import {
  AppHeaderNavigationList,
  UserMenuList,
} from "../../constants/menuList";

const Navbar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const pages = AppHeaderNavigationList;
  const settings = UserMenuList;
  const navigateTo = useNavigate();
  const { logout, user, isAuthenticated, loginWithRedirect } = useAuth0();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (relUrl: string | React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    if(relUrl && typeof relUrl === 'string') {
      navigateTo(relUrl);
    }
  };

  const handleCloseUserMenu = (relPath: string | React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
    if (relPath && relPath === "/logout") {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else if (relPath && relPath === "/login") {
      loginWithRedirect();
    } else if(relPath && typeof relPath === 'string') {
      navigateTo(relPath);
    }
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: "2em",
              height: "2em",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Doordrishtee
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              data-testid="sideMenuNavigation"
            >
              <MenuIcon />
            </IconButton>
            <Menu
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.relPath)}
                  data-testid={page.name}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Logo
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              width: "2em",
              height: "2em",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Doordrishtee
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.relPath)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Menu" data-testid="userButton">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.nickname} />
              </IconButton>
            </Tooltip>
            <Menu
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
              {isAuthenticated ? (
                settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleCloseUserMenu(setting.relPath)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem
                  key={"login"}
                  onClick={() => handleCloseUserMenu("/login")}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {"Login"}
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
