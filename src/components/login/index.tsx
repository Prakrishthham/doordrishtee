import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  function handleSubmit(): void {
    loginWithRedirect()
  }

  return (
    <>
      <div>
        This is Login page
      </div>
      <div>
        <Button type="submit" onClick={handleSubmit} variant="contained">Log in</Button>
      </div>
    </>
  )
};

export default Login;