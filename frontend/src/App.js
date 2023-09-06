import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUpload from "./screens/FileUpload";
import LoginForm from "./LoginForm";
import RenderVideo from "./RenderVideo";
import NavBars from "./NavBars";

export default function App() {
  return(
      <BrowserRouter>
        <NavBars/>
        <Routes>
            <Route path="/" element={<RenderVideo />} />
            <Route path="/about" element={<h1>About!</h1>} />
            <Route path="/cadastrar" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
  )
}
