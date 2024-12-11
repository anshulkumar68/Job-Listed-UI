import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home";
import NewJob from "./pages/newJob";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newJob" element={<NewJob />} />
          <Route path="/editJob/:_id" element={<NewJob />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
