import React, { useState } from "react";
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsPersonCircle, BsBell, BsBellFill, BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill } from 'react-icons/bs';

export default function ViewVideo() {
    const [inscrito, setInscrito] = useState(false)
    return (
        <>
        <Container>
            <div class="row">
                <div class="col-8">
                    <Card className="mb-5" bg='dark' style={{color: 'white'}}>
                        <video/>
                        <Card.Header>
                            <Card.Title>Venha aprender!</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <div class="row">
                            <div class="col-auto">
                                <Card.Title><BsPersonCircle style={{width: 20, height: 20}}/></Card.Title>
                            </div>
                            <div class="col">
                                <Card.Title>Canal X {inscrito ? (
                                        <Button variant="outline-light" onClick={() => setInscrito(false)} className="justify-content-center" style={{borderRadius: 100}}><BsBellFill/> Inscrito</Button>
                                    ) : (
                                        <Button variant="outline-light" onClick={() => setInscrito(true)} className="justify-content-center" style={{borderRadius: 100}}><BsBell/> Inscrever-se</Button>
                                    )}
                                </Card.Title>
                                <Card.Text>
                                    119 mil inscritos
                                </Card.Text>
                            </div>
                            <div class="col"></div>
                            <div class="col">
                            </div>
                        </div>
                        </Card.Body>
                        <Card.Header>
                            <Card.Text>
                            38.480 visualizações  16 de out. de 2023
                            </Card.Text>
                            <Card.Text>
                            O Hamas é um grupo que luta pelo território da Palestina, sobretudo, 
                            pelos direitos, práticas e preceitos muçulmanos. Contudo, em comparação ao Estado de Israel, 
                            é uma organização muito menor, menos estruturada e com bem menos recursos. 
                            Como eles conseguem se manter? Como fizeram o ataque que deflagrou o atual conflito? 
                            Será que eles podem vencer seu inimigo? Além de tudo, qual seria seu papel em um possível conflito mundial? 
                            Veja tudo isso em mais esse vídeo da Fatos Desconhecidos.
                            </Card.Text>
                        </Card.Header>
                    </Card>
                    <h4 className="text-light">Comentários</h4>
                    {Array.from({ length: 19 }).map((_, idx) => (
                        <Card className="mb-3" bg='dark' style={{color: 'white'}}>
                            <Card.Body>
                            <div class="row">
                                <div class="col-auto">
                                    <Card.Title><BsPersonCircle style={{width: 20, height: 20}}/></Card.Title>
                                </div>
                                <div class="col-8">
                                    <Card.Text>Canal X</Card.Text>
                                    <Card.Text>
                                    Será que eles podem vencer seu inimigo? Além de tudo, qual seria seu papel em um possível conflito mundial? Veja tudo isso em mais esse vídeo da Fatos Desconhecidos.
                                    </Card.Text>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <div class="col-4">
                    {Array.from({ length: 19 }).map((_, idx) => (
                        <Card bg='dark' style={{color: 'white'}}>
                        <Card.Body>
                        <div class="row">
                            <div class="col-4"><img style={{width:40, height:40}} alt={'thumbnail'}/></div>
                            <div class="col-8">
                                <Card.Title>Canal X</Card.Title>
                                <Card.Text>
                                    2,3 mil visualizações
                                </Card.Text>
                            </div>
                        </div>
                        </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
        </>
    )
}
