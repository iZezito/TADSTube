import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle, BsBell, BsBellFill } from 'react-icons/bs';
import {Link} from "react-router-dom";

export default function Painel() {
    const [inscrito, setInscrito] = useState(false)

    return (
        <>  
            <Card bg='dark' style={{color: 'white'}}>
                <img  src={'https://yt3.googleusercontent.com/pf45dK2nb1pvzIuiReH-orvOeYml2iavnWpBZRXNreYT-jNNevGWjoJi50lh5yCRibhLkXKELw=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'} alt={'thumbnail'}/>
                <Card.Body>
                <div class="row">
                    <div class="col-auto">
                        <Card.Title><BsPersonCircle style={{width: 100, height: 100}}/></Card.Title>
                    </div>
                    <div class="col">
                        <Card.Title>Canal X</Card.Title>
                        <Card.Text>
                            @CanalX 119 mil inscritos 2,3 mil vídeos
                        </Card.Text>
                        <Card.Text>
                            Venha aprender!
                        </Card.Text>
                    </div>
                    <div class="col"></div>
                    <div class="col">
                        {inscrito ? (
                            <Button variant="outline-light" onClick={() => setInscrito(false)} className="justify-content-center" style={{borderRadius: 100}}><BsBellFill/> Inscrito</Button>
                        ) : (
                            <Button variant="outline-light" onClick={() => setInscrito(true)} className="justify-content-center" style={{borderRadius: 100}}><BsBell/> Inscrever-se</Button>
                        )}
                    </div>
                </div>
                </Card.Body>
            </Card>
            <Container className={'overflow-auto mt-4'}>
            <h4 className='text-light'>Vídeos</h4>
            <hr className="my-2" style={{ borderColor: 'white' }} />
            <Row xs={1} md={3} className="g-3">
            {Array.from({ length: 9 }).map((_, idx) => (
                <Col key={idx}>
                    <Link to={'/view'} className='text-decoration-none'>
                        <Card bg='dark' style={{color: 'white'}}>
                            <img src={'https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg'} alt={'thumbnail'}/>
                            <Card.Body>
                            <div class="row">
                                <div class="col">
                                    <Card.Title>Comer muito? ou comer pouco?</Card.Title>
                                    <Card.Text>
                                        119 mil visualizações há 2 dias
                                    </Card.Text>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ))}
            </Row>
        </Container>
        </>
    )
}