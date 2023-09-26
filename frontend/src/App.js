import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "./LoginForm";
import RenderVideo from "./RenderVideo";
import NavBars from "./NavBars";
import Sidebar from "./components/sidebar";
import Painel from "./components/PainelCanal";
import FileUpload from "./screens/FileUpload";
import NotFoundPage from "./screens/PaginaNaoEncontrada"

export default function App() {
    return (
        <div className={'grid-container'}>
            <BrowserRouter>
                <Sidebar/>
                <NavBars/>
                <div className={'main overflow-auto'}>
                    <Routes>
                        <Route exact path="/" element={<RenderVideo/>}/>
                        <Route exact path="/about" element={<h1>About!</h1>}/>
                        <Route exact path="/sair" element={<LoginForm/>}/>
                        <Route exact path={'/upload'} element={<FileUpload />} />
                        <Route exact path="/canal" element={<Painel />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    )
}
