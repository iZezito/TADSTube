import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {BsBoxArrowInRight, BsCollectionPlay, BsHouseDoor, BsPlayBtn} from "react-icons/bs";
import Inscricao from "./inscricao";

export default function Sidebar(){
    return(
        <div className="side-grid">
            <Nav defaultActiveKey="/" className="flex-column">
                {/*<Row>*/}
                {/*    <Col className={'mx-2'}>*/}
                {/*        <Link to={'/perfil'} className={'nav-link text-light mb-2'}>Perfil</Link>*/}
                {/*    </Col>*/}
                {/*    <Col className={'mx-0'}>*/}
                {/*        <Link to={'/perfil'} className={'nav-link text-light'}>Perfil</Link>*/}
                {/*    </Col>*/}
                {/*</Row>*/}


                <Link to={'/perfil'} className={'nav-link text-light'}><BsHouseDoor style={{ width: 20, height: 20 }} /> Início</Link>
                <Link to={'/'} className={'nav-link text-light'}><BsCollectionPlay style={{ width: 20, height: 20 }} /> Inscrições</Link>
                <Link to={'/'} className={'nav-link text-light'}><BsPlayBtn style={{ width: 20, height: 20 }}/> Enviar vídeo</Link>
                <hr className="my-2" style={{ borderColor: 'white' }} />
                <Link className={'nav-link text-light h1'}>Inscrições</Link>
                <div className={'overflow-auto'} style={{ maxHeight: '290px' }}>
                    {Array.from({ length: 19 }).map((_, idx) => (
                        <Inscricao key={idx}/>
                    ))}
                </div>
                <hr className="my-2" style={{ borderColor: 'white' }} />
                <Link to={'/sair'} className={'nav-link text-light'}><BsBoxArrowInRight style={{ width: 20, height: 20 }} /> Sair</Link>
                
            </Nav>
        </div>
    )
}
