import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "../layout/landing";
import Login from "../components/login";
import Home from "../components/home";
import About from "../components/about";
import Navbar from "../layout/navbar";
import User from "../components/user";
import Preferences from "../components/preferences";
import CreateBlog from "../components/createBlog";

const Router = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          {isAuthenticated && <Route path="/user" element={<User />} />}
          {isAuthenticated && <Route path="/preferences" element={<Preferences />} />}
          {isAuthenticated && <Route path="/createBlog" element={<CreateBlog />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
