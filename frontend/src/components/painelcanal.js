import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Modal } from "react-bootstrap";
import Container from 'react-bootstrap/esm/Container';
import { BsPersonCircle, BsBell, BsBellFill, BsPencil, BsXLg } from 'react-icons/bs';
import {Link, useParams} from "react-router-dom";
import { observer } from 'mobx-react';
import store from '../store/VideoStore';
import { ToastContainer, toast } from 'react-toastify';
import {urlBase} from "../utils/URLBase";

const Painel = observer(() => {

    const { id } = useParams();
    const [inscrito, setInscrito] = useState(false)

    useEffect(  () => {
        store.getVideosOfCanal(id)
        store.getDadosCanal(id)
    }, [id]);

    const [idVideoDelete, setIdVideoDelete] = useState(null)

    const [show, setShow] = useState(false)

    const handleDeleteVideo = () => {
        store.deletarVideo(idVideoDelete)
        setShow(false)
    }

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
                        <Card.Title>{store.canal?.login}</Card.Title>
                        <Card.Text>
                            @{store.canal?.login} 119 mil inscritos {store?.videosOfCanal?.length | 0} vídeos
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
                    <Link to={`/view/${item?.idVideo}`} className='text-decoration-none'>
                        <Card bg='dark' style={{color: 'white', height: 270, width: 410}}>
                            <img src={`${urlBase}/resources/image/${item?.thumbnail}`} alt={'thumbnail'} style={{height: 190, width: 410}}/>
                            <Card.Body>
                            <div class="row">
                                <div className="col-12">
                                    <Card.Title>{item?.titulo}</Card.Title>
                                </div>
                                <div className='col-10'>
                                    <Card.Text>
                                        {item?.visualizacoes} visualizações há 2 dias
                                    </Card.Text>
                                </div>
                                { id === store.idUser && (
                                    <>
                                <div className='col-1'>
                                    <Link to={'/upload'} onClick={() => store.setVideoEdit(item)} className='text-light text-decoration-none'><BsPencil/></Link>
                                </div>
                                <div className='col-1'>
                                    <Link className='text-light text-decoration-none' onClick={() => {
                                        setIdVideoDelete(item?.idVideo)
                                        setShow(true)
                                    }}><BsXLg/></Link>
                                </div>
                                    </>
                                )}

                            </div>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Modal
                        size="sm"
                        show={show}
                        onHide={() => {
                            setShow(false);
                        }}
                        aria-labelledby="example-modal-sizes-title-sm"
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                            Exclusão de Vídeo
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja excluir esse vídeo?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                            variant="secondary"
                            onClick={() => {
                                setShow(false);
                            }}
                            >
                            Cancelar
                            </Button>
                            <Button variant="danger"  onClick={handleDeleteVideo}>
                            Excluir
                            </Button>
                        </Modal.Footer>
                        </Modal>
                </Col>
            ))}
            </Row>
        </Container>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
        />
        </>
    )
})

export default Painel;