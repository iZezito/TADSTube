import React from "react";
import Card from 'react-bootstrap/Card';
import { BsPersonCircle } from 'react-icons/bs';
import Col from 'react-bootstrap/Col';

const VideoCard = ({titulo, descricao, thumbnail}) =>{

    return (
        <Col>
                    <Card bg='dark' style={{color: 'white'}}>
                        <img src={thumbnail} alt={'thumbnail'}/>
                        <Card.Body>
                        <div class="row">
                            <div class="col-auto">
                                <Card.Title><BsPersonCircle style={{width: 35, height: 35}}/></Card.Title>
                            </div>
                            <div class="col">
                                <Card.Title>{titulo}</Card.Title>
                                <Card.Text>
                                    Canal X
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