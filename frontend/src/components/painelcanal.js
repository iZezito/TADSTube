import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle, BsBell, BsBellFill, BsPencil, BsXLg } from 'react-icons/bs';
import {Link} from "react-router-dom";
import { observer } from 'mobx-react';
import store from '../store/VideoStore';

const Painel = observer(() => {
    const [inscrito, setInscrito] = useState(false)

    useEffect(  () => {
        store.getVideosOfCanal()
    }, []);

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
            {store?.videosOfCanal.map((item, idx) => (
                <Col key={idx}>
                    <Link to={'/view'} className='text-decoration-none'>
                        <Card bg='dark' style={{color: 'white'}}>
                            <img src={`http://localhost:8080/resources/image/${item?.thumbnail}`} alt={'thumbnail'}/>
                            <Card.Body>
                            <div class="row">
                                <div className="col-12">
                                    <Card.Title>{item?.titulo}</Card.Title>
                                </div>
                                <div className='col-10'>
                                    <Card.Text>
                                        119 mil visualizações há 2 dias
                                    </Card.Text>
                                </div>
                                <div className='col-1'>
                                    <Link to={'/upload'} onClick={() => store.setVideoEdit(item)} className='text-light text-decoration-none'><BsPencil/></Link>
                                </div>
                                <div className='col-1'>
                                    <Link to={'/upload'} className='text-light text-decoration-none'><BsXLg/></Link>
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
})

export default Painel;