import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Login: React.FC = () => {
  const navigateTo = useNavigate();
  function handleSubmit(): void {
    navigateTo('/home');
  }

  return (
    <>
      <div>
        This is Login page
      </div>
      <div>
        <input type="email" />
      </div>
      <div>
        <Button type="submit" onClick={handleSubmit} variant="contained">Log in</Button>
      </div>
    </>
  )
};

export default Login;