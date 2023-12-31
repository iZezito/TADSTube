import React from "react";
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";

export default function Inscricao() {
    return (
        <>
        <Container>
            <div className="d-flex align-items-center text-light">
                <BsPersonCircle style={{ width: 15, height: 15 }} />
                <p className="mb-0">
                    <Link to={'/canal'} className={'nav-link text-light'}>Cachorro loko</Link>
                </p>
            </div>
        </Container>
        </>
    )
}
