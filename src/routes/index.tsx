import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "../layout/landing";
import Login from "../components/login";
import Home from "../components/home";
import About from "../components/about";
import Navbar from "../layout/navbar";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
