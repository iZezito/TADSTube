import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "./screens/LoginForm";
import RenderVideo from "./screens/RenderVideo";
import NavBars from "./NavBars";
import Sidebar from "./components/sidebar";
import Painel from "./components/painelcanal";
import FileUpload from "./screens/FileUpload";
import NotFoundPage from "./screens/PaginaNaoEncontrada"
import {observer} from "mobx-react";
import AuthStore from "./store/AuthStore";
import ViewVideo from "./components/ViwVideo";
import Search from "./screens/Search";

const App = observer(() => {
    const {isAuthenticated} = AuthStore;
    console.log(isAuthenticated);

    return (
        <div className={'grid-container'}>
            <BrowserRouter>
                { isAuthenticated && <Sidebar/> }
                { isAuthenticated && <NavBars/> }
                <div className={'main overflow-auto'}>
                    <Routes>
                        {isAuthenticated && <Route exact path="/" element={<RenderVideo/>}/>}
                        {isAuthenticated && <Route exact path="/about" element={<h1>About!</h1>}/>}
                        {!isAuthenticated && <Route exact path="*" element={<LoginForm/>}/>}
                        {isAuthenticated && <Route exact path={'/upload'} element={<FileUpload />} />}
                        {isAuthenticated && <Route exact path="/canal/:id" element={<Painel />} />}
                        {isAuthenticated && <Route path="*" element={<NotFoundPage />} />}
                        {isAuthenticated && <Route path="/view/:id" element={<ViewVideo />} />}
                        {isAuthenticated && <Route path="/search" element={<Search/>}/>}
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    )
});

export default App;
