import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsPersonCircle, BsBell } from 'react-icons/bs';

export default function Painel() {
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
                        <Card.Title>Comer muito? ou comer pouco?</Card.Title>
                        <Card.Text>
                            Canal X
                            <Card.Text>
                            @CanalX 119 mil inscritos 2,3 mil vídeos
                            </Card.Text>
                        </Card.Text>
                        <Card.Text>
                            Venha aprender!
                        </Card.Text>
                    </div>
                    <div class="col"></div>
                    <div class="col">
                        <Button variant="outline-light" className="justify-content-center" style={{borderRadius: 100}}><BsBell/> Inscrito</Button>
                    </div>
                </div>
                </Card.Body>
            </Card>
        </>
    )
}