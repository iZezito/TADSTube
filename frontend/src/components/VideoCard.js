import React, {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import {BsPersonCircle } from 'react-icons/bs';
import {Link} from "react-router-dom";
import {urlBase} from "../utils/URLBase";
const VideoCard = ({idVideo, titulo, thumbnail, usuario, visualizacoes}) => {

    return (
        <Col>
                    <Link to={`/view/${idVideo}`} className='text-decoration-none'>
                    <Card bg='dark' style={{color: 'white'}}>
                        <img src={`${urlBase}/resources/image/${thumbnail}`} alt={'thumbnail'}
                        />
                        <Card.Body>
                        <div class="row">
                            <div class="col-auto">
                                <Card.Title><BsPersonCircle style={{width: 50, height: 50}}/></Card.Title>
                            </div>
                            <div class="col">
                                <Card.Title>{titulo}</Card.Title>
                                <Card.Text>
                                    {usuario?.login}
                                </Card.Text>
                                <Card.Text>
                                    {visualizacoes} visualizações
                                </Card.Text>
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
    )
}

export default VideoCard