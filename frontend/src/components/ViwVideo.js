import React, {useEffect, useRef, useState} from "react";
import Container from 'react-bootstrap/esm/Container';
import {Link, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {
    BsPersonCircle,
    BsBell,
    BsBellFill,
    BsHandThumbsUp,
    BsHandThumbsUpFill,
    BsHandThumbsDown,
    BsHandThumbsDownFill,
    BsThreeDotsVertical
} from 'react-icons/bs';
import { observer } from 'mobx-react';
import store from '../store/VideoStore';
import {MdSend} from "react-icons/md";
import {Modal} from "react-bootstrap";

const ViewVideo = observer(() => {

    const { id } = useParams();

    const videoRef = useRef(null);

    useEffect( () => {
        const init = async () => {
            videoRef.current.src = await store.loadVideo(id);
        }
        init();
        store.loadComentarios(id);
    }, []);
    const [show, setShow] = useState(false);
    const [indexNoticia, setIndexNoticia] = useState(0)
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [expandedComments, setExpandedComments] = useState([]);
    const [placeholder, setPlaceholder] = useState(Array(5).fill(''))
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editingReplyId, setEditingReplyId] = useState(0);
    const [editedReply, setEditedReply] = useState('');
    const [smShow, setSmShow] = useState(false);
    const [showModalNoticia, setShowModalNoticia] = useState(false);
    const [inscrito, setInscrito] = useState(false)

    const handleVerRespostas = (commentId) => {
        if (expandedComments.includes(commentId)) {
            setExpandedComments(expandedComments.filter(id => id !== commentId));
        } else {
            setExpandedComments([...expandedComments, commentId]);
        }
    };

    const handleDeleteRespostaComentario = () => {
        setSmShow(false);
        setShow(true);
        store.deleteRespostaComentario()
    }




    return (
        <>
        <Container>
            <div class="row">
                <div class="col-8">
                    <Card className="mb-5" bg='dark' style={{color: 'white'}}>
                        <video ref={videoRef} controls={true}/>
                        <Card.Header>
                            <Card.Title>{store.videoView?.titulo}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <div class="row">
                            <div class="col-auto">
                                <Card.Title><BsPersonCircle style={{width: 20, height: 20}}/></Card.Title>
                            </div>
                            <div class="col">
                                <Card.Title>{store.videoView?.usuario?.login} {inscrito ? (
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
                                {store.videoView?.descricao}
                            </Card.Text>
                        </Card.Header>
                    </Card>
                    <h4 className="text-light">Comentários</h4>
                    {store.comentarios?.map((comentario) => {
                        const isReplyingToComment = editingCommentId === comentario.idComentario;
                        console.log('isReplyingToComment', isReplyingToComment)
                        console.log('comentario', comentario.idComentario)
                        console.log('editingCommentId', editingCommentId)
                        return (
                            <div className={'container'} key={comentario.idComentario}>
                                <div className={'comentario-texto mt-2'}>
                                    <div className={'d-flex flex-row justify-content-between'}>
                                        {isReplyingToComment ? (
                                            <>
                                                <input
                                                    type={'text'}
                                                    className={'input-edit'}
                                                    style={{border: 'none', width: '80%'}}
                                                    value={store.comentarioEdit.texto}
                                                    onChange={(e) => store.setComentarioEdit(e.target.value)}
                                                />
                                                <button
                                                    onClick={() => setEditingCommentId(null)}
                                                    className={'btn-icon text-danger'}>
                                                    cancelar
                                                </button>
                                                <button
                                                    className={'btn-icon'}
                                                    onClick={() => store.updateComentario(comentario.idComentario)}
                                                    disabled={!store.comentarioEdit.texto}>

                                                    <MdSend

                                                        style={{borderRadius: 20}} size={25}
                                                        color={store.comentarioEdit.texto ? 'black' : 'gray'} className={'ms-1 mb-1'}/>
                                                </button>
                                            </>


                                        ) : (
                                            <>
                                                <p className={'text-start text-light ps-1 coment'}>{comentario.texto}</p>
                                                {comentario.usuario.id === store.idUser && (
                                                    <div className={'d-flex flex-column'}>
                                                        <button className={'align-self-end ms-auto btn-delete'} type="button"
                                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                            <BsThreeDotsVertical/>
                                                            <ul className="dropdown-menu">
                                                                <li className="dropdown-item" onClick={() => {
                                                                    setEditingCommentId(comentario.idComentario);
                                                                    setEditedComment(comentario.texto);
                                                                    store.setComentarioEdit(comentario.texto)
                                                                }}>Editar</li>
                                                                <li className="dropdown-item" onClick={() => {
                                                                    setSmShow(true)
                                                                    setShow(false)
                                                                    store.setComentarioDeleteId(comentario.idComentario)
                                                                    store.setRespostaDeleteId(null)
                                                                }}>Excluir</li>
                                                            </ul>
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}


                                    </div>
                                    { !isReplyingToComment && (
                                        <div className={'d-flex flex-row justify-content-end'}>
                                            <button className={'nav-link text-light btn-responder ms-1 resp'}
                                                    onClick={() => setReplyingToCommentId(comentario.idComentario)}>responder
                                            </button>
                                            {comentario?.respostas?.length > 0 && (
                                                <button className={'nav-link btn-responder ms-1 resp'}
                                                        onClick={() => handleVerRespostas(comentario.idComentario)}>
                                                    {expandedComments.includes(comentario.idComentario) ? 'ocultar respostas' : 'ver respostas'}
                                                </button>)}
                                        </div>
                                    )}
                                </div>

                                {comentario?.respostas?.length > 0 && expandedComments.includes(comentario.idComentario) &&
                                    comentario?.respostas.map((resposta) => {
                                        const isReplyingToResponse = editingReplyId === resposta.idResposta;

                                        return (
                                            <div className={'resposta-texto ms-5 mt-2 ps-1'} key={resposta.idResposta}>
                                                <div
                                                    className={'d-flex flex-row justify-content-between'}>
                                                    {isReplyingToResponse ? (
                                                        <>
                                                            <input
                                                                type={'text'}
                                                                className={'input-edit'}
                                                                style={{border: 'none', width: '80%'}}
                                                                value={store.respostaEdit.texto}
                                                                onChange={(e) => store.setRespostaEdit(e.target.value)}
                                                            />
                                                            <button
                                                                onClick={() => setEditingReplyId(null)}
                                                                className={'btn-icon'}>
                                                                cancelar
                                                            </button>

                                                            <button
                                                                className={'btn-icon'}
                                                                onClick={() => store.updateResposta(resposta.idResposta)}
                                                                disabled={!store.respostaEdit.texto}>
                                                                <MdSend
                                                                    style={{borderRadius: 20}} size={25}
                                                                    color={store.respostaEdit.texto ? 'black' : 'gray'} className={'ms-1 mb-1'}/>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className={'text-start'}>{resposta.texto}</p>
                                                            {resposta.usuario.id === store.idUser && (
                                                                <div className={'d-flex flex-column'}>
                                                                    <button className={'align-self-end ms-auto btn-delete'}
                                                                            type="button" data-bs-toggle="dropdown"
                                                                            aria-expanded="false">
                                                                        <BsThreeDotsVertical/>
                                                                        <ul className="dropdown-menu">
                                                                            <li className="dropdown-item"
                                                                                onClick={() => {
                                                                                    setEditingReplyId(resposta.idResposta);
                                                                                    setEditedReply(resposta.texto);
                                                                                    store.setRespostaEdit(resposta.texto)
                                                                                }}
                                                                            >Editar</li>
                                                                            <li className="dropdown-item"
                                                                                onClick={() => {
                                                                                    setSmShow(true)
                                                                                    setShow(false)
                                                                                    store.setRespostaDeleteId(resposta.idResposta)
                                                                                    store.setComentarioDeleteId(comentario.idResposta)
                                                                                }}
                                                                            >Excluir</li>
                                                                        </ul>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        );
                                    })}
                                {replyingToCommentId === comentario.idComentario && (
                                    <div className={'text-start ms-5 mb-2 ps-1'}>
                                        <input
                                            type={'text'}
                                            className={'form-text'}
                                            placeholder={'Digite sua resposta...'}
                                            value={store.resposta.texto}
                                            onChange={(e) => store.setResposta(e.target.value)}
                                        />
                                        <button
                                            className={'btn-icon'}
                                            disabled={!store.resposta.texto}
                                            onClick={() => store.enviarRespostaComentario(comentario.idComentario)}>
                                            <MdSend
                                                style={{borderRadius: 20}} size={25}
                                                color={store.resposta.texto ? 'black' : 'gray'}
                                                className={'ms-1 mb-1'}/>

                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    <input type={'text'} className={'form-text ms-3'} placeholder={'Digite seu comentário...'}
                           value={store.comentario?.texto}
                           onChange={(e) => store.setComentario(e.target.value)}/>
                    <button
                        className={'btn-icon'}
                        onClick={() => store.enviarComentario()}
                        disabled={!store.comentario.texto}>

                        <MdSend

                            style={{borderRadius: 20}} size={25}
                            color={store.comentario.texto ? 'black' : 'gray'} className={'ms-1 mb-1'}/>
                    </button>
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
            <Modal
                size="sm"
                show={smShow}
                onHide={() => {
                    setSmShow(false)
                    setShow(true)
                }}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Excluir {store.respostaDeleteId ? 'Resposta' : 'Comentário'}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir {store.respostaDeleteId ? 'esta resposta': 'este comentário'}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setSmShow(false)
                        setShow(true)
                    }}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDeleteRespostaComentario}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    )
});

export default ViewVideo;
