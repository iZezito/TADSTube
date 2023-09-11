import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {BiExit, BiNews, BiUserCircle} from "react-icons/bi";
import {GiAcousticMegaphone, GiLoveLetter} from "react-icons/gi";
import {BsBoxArrowInRight, BsCollectionPlay, BsHouseDoor} from "react-icons/bs";

export default function Sidebar(){
    return(
        <div className="side-grid">
            <Nav defaultActiveKey="/" className="flex-column">
                <Link to={'/perfil'} className={'nav-link text-light'}><BsHouseDoor style={{ width: 20, height: 20 }} />Início</Link>
                <Link to={'/'} className={'nav-link text-light'}><BsCollectionPlay style={{ width: 20, height: 20 }} /> Inscrições</Link>
                <Link to={'/sair'} className={'nav-link text-light'}><BsBoxArrowInRight style={{ width: 20, height: 20 }} /> Sair</Link>
            </Nav>
        </div>
    )
}
