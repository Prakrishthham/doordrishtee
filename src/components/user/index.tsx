import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
const User: React.FC = () => {
  const { user } = useAuth0();
  return (
    <>
      <div>
        <div>This is User Page</div>
        <div>{user?.name}</div>
        <div>{user?.email}</div>
        <div><img src={user?.picture} /></div>
      </div>
    </>
  )
};

export default User;