import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "./LoginForm";
import RenderVideo from "./RenderVideo";
import NavBars from "./NavBars";
import Sidebar from "./components/sidebar";

export default function App() {
    return (
        <div className={'grid-container'}>
            <BrowserRouter>
                <Sidebar/>
                <NavBars/>
                <div className={'main overflow-auto'}>
                    <Routes>
                        <Route path="/" element={<RenderVideo/>}/>
                        <Route path="/about" element={<h1>About!</h1>}/>
                        <Route path="/sair" element={<LoginForm/>}/>
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    )
}
