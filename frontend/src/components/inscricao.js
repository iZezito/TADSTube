import React from "react";
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";

export default function Inscricao({usuario}) {
    return (
        <>
        <Container>
            <div className="d-flex align-items-center text-light">
                <BsPersonCircle style={{ width: 15, height: 15 }} />
                <p className="mb-0">
                    <Link to={`/canal/${usuario?.id}`} className={'nav-link text-light'}>{usuario?.login}</Link>
                </p>
            </div>
        </Container>
        </>
    )
}
