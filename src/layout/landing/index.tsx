import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { SxProps } from "@mui/system";
import ErrorBoundary from "../../errorBoundary";
import { useAuth0 } from "@auth0/auth0-react";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const Landing = () => {
  const navigateTo = useNavigate();
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      {isAuthenticated && (
        <Fab
          sx={fabStyle as SxProps}
          aria-label={"Add"}
          color={"primary"}
          onClick={() => navigateTo("/createBlog")}
        >
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

export default Landing;
