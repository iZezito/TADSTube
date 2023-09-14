import React from "react";
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle } from 'react-icons/bs';

export default function Inscricao() {
    return (
        <>
        <Container>
            <div className="d-flex align-items-center text-light">
                <BsPersonCircle style={{ width: 15, height: 15 }} />
                <p className="mb-0 ms-2">
                    <a href="#" className="text-decoration-none text-light">
                         Cachorro loko
                    </a>
                </p>
            </div>
        </Container>
        </>
    )
}
