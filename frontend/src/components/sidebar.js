import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {BsBoxArrowInRight, BsPersonSquare, BsHouseDoor, BsPlayBtn} from "react-icons/bs";
import Inscricao from "./inscricao";
import AuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import {observer} from "mobx-react";

const Sidebar = observer(() => {
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthStore.logout();
        navigate('/login')
    }
    return(
        <div className="side-grid">
            <Nav defaultActiveKey="/" className="flex-column">
                <Link to={'/'} className={'nav-link text-light'}><BsHouseDoor style={{ width: 20, height: 20 }} /> Início</Link>
                <Link to={'/canal'} className={'nav-link text-light'}><BsPersonSquare style={{ width: 20, height: 20 }} /> Seu canal</Link>
                <Link to={'/upload'} className={'nav-link text-light'}><BsPlayBtn style={{ width: 20, height: 20 }}/> Enviar vídeo</Link>
                <hr className="my-2" style={{ borderColor: 'white' }} />
                <Link className={'nav-link text-light h1'}>Inscrições</Link>
                <div className={'overflow-auto'} style={{ maxHeight: '290px' }}>
                    {Array.from({ length: 19 }).map((_, idx) => (
                        <Inscricao key={idx}/>
                    ))}
                </div>
                <hr className="my-2" style={{ borderColor: 'white' }} />
                <Link onClick={handleLogout} className={'nav-link text-light'}><BsBoxArrowInRight style={{ width: 20, height: 20 }} /> Sair</Link>
                
            </Nav>
        </div>
    )
})

export default Sidebar;
