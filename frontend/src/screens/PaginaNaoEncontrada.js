import React from "react";
import {Link} from "react-router-dom";

export default function PaginaNaoEncontrada() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-light">404</h1>
                <p className="fs-3 text-light"><span className="text-danger">Opps!</span> Página não encontrada</p>
                <p className="lead text-light">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <Link to={'/'} className="btn btn-primary text-light">Ir para o início</Link>
            </div>
        </div>
    )
}