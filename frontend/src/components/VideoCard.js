import React, {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import api from "../service/Configuration";
import {BsPersonCircle, BsBell, BsBellFill, BsPencil, BsXLg } from 'react-icons/bs';

const VideoCard = ({titulo, descricao, thumbnail, usuario}) => {

    return (
        <Col>
                    <Card bg='dark' style={{color: 'white'}}>
                        <img src={`http://localhost:8080/resources/image/${thumbnail}`} alt={'thumbnail'}/>
                        <Card.Body>
                        <div class="row">
                            <div class="col-auto">
                                <Card.Title><BsPersonCircle style={{width: 35, height: 35}}/></Card.Title>
                            </div>
                            <div class="col">
                                <Card.Title>{titulo}</Card.Title>
                                <Card.Text>
                                    {usuario?.login}
                                    <Card.Text>
                                    119 mil visualizações há 2 dias
                                    </Card.Text>
                                </Card.Text>
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
    )
}

export default VideoCard