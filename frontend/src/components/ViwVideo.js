import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  BsPersonCircle,
  BsBell,
  BsBellFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsThreeDotsVertical,
  BsXLg,
} from "react-icons/bs";
import { observer } from "mobx-react";
import store from "../store/VideoStore";
import { MdSend } from "react-icons/md";
import { Col, Modal, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import VideoShareButton from '../components/ButtonShare'

const ViewVideo = observer(() => {
  const { id } = useParams();

  const videoRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      videoRef.current.src = await store.loadVideo(id);
    };
    init();
    store.loadComentarios(id);
    return () => {
        store.clear();
    }

  }, []);
  const [show, setShow] = useState(false);
  const [indexNoticia, setIndexNoticia] = useState(0);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [expandedComments, setExpandedComments] = useState([]);
  const [placeholder, setPlaceholder] = useState(Array(5).fill(""));
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(0);
  const [editedReply, setEditedReply] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [showModalNoticia, setShowModalNoticia] = useState(false);
  const [inscrito, setInscrito] = useState(false);

  const handleVerRespostas = (commentId) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  const handleDeleteRespostaComentario = () => {
    setSmShow(false);
    setShow(true);
    store.deleteRespostaComentario();
  };

  const handleShowModalNoticia = () => setShowModalNoticia(true);
  const handleCloseModalNoticia = () => setShowModalNoticia(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setIndexNoticia(id);
    setShow(true);
  };

  return (
    <>
      <Container>
        <div class="">
          <div>
            <Card className="mb-5" bg="dark" style={{ color: "white" }}>
              <video ref={videoRef} controls={true} />
              <Card.Header>
                <Card.Title>{store.videoView?.titulo}</Card.Title>
              </Card.Header>
              <Card.Body>
                <div class="row">
                  <div class="col-auto">
                    <div className="row">
                      <div className="col-auto">
                        <Card.Title>
                          <BsPersonCircle style={{ width: 50, height: 50 }} />
                        </Card.Title>
                      </div>
                      <div className="col">
                        <Card.Title>
                          {store.videoView?.usuario?.login}
                        </Card.Title>
                        <Card.Text style={{ fontSize: 10 }}>
                          140 mil inscritos
                        </Card.Text>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <Card.Title>
                      {" "}
                      {inscrito ? (
                        <Button
                          variant="outline-light"
                          onClick={() => setInscrito(false)}
                          className="justify-content-center"
                          style={{ borderRadius: 100 }}
                        >
                          <BsBellFill /> Inscrito
                        </Button>
                      ) : (
                        <Button
                          variant="outline-light"
                          onClick={() => setInscrito(true)}
                          className="justify-content-center"
                          style={{ borderRadius: 100 }}
                        >
                          <BsBell /> Inscrever-se
                        </Button>
                      )}
                    </Card.Title>
                  </div>
                  <div className="col-auto"> 
                  <VideoShareButton/>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Card.Title>{store?.numeroVisualizacoes} Visualizações</Card.Title>
                <Card.Text>{store.videoView?.descricao}</Card.Text>
              </Card.Footer>
            </Card>
            <Card className="mb-5" bg="dark" style={{ color: "white" }}>
              <Card.Header>
                <h4 className="text-light">Comentários</h4>
              </Card.Header>
              <Card.Header>
                {/* Form para digitar comentários */}
                <Form className="bg-dark row">
                  <Col md="11">
                    <Form.Control
                      className="bg-dark text-light"
                      placeholder="Digite seu comentário..."
                      value={store.comentario?.texto}
                      onChange={(e) => store.setComentario(e.target.value)}
                      style={{ borderRadius: 100 }}
                    />
                  </Col>
                  <Col md="1">
                    <Button
                      className="btn-dark"
                      onClick={() => store.enviarComentario()}
                      disabled={!store.comentario.texto}
                    >
                      <MdSend
                        style={{ borderRadius: 20 }}
                        size={25}
                        color={store.comentario.texto ? "white" : "gray"}
                        className={"ms-1 mb-1"}
                      />
                    </Button>
                  </Col>
                </Form>
              </Card.Header>
              <Card.Body>
                {store.comentarios?.map((comentario) => {
                  const isReplyingToComment =
                    editingCommentId === comentario.idComentario;
                  console.log("isReplyingToComment", isReplyingToComment);
                  console.log("comentario", comentario.idComentario);
                  console.log("editingCommentId", editingCommentId);
                  return (
                    <div className={"container"} key={comentario.idComentario}>
                      <div
                        className={"d-flex flex-row justify-content-between"}
                      >
                        {isReplyingToComment ? (
                          <Form className="bg-dark row">
                            {/*Editar comentários */}
                            <Col md="9">
                              <Form.Control
                                className={"bg-dark text-light input-edit"}
                                value={store.comentarioEdit.texto}
                                onChange={(e) =>
                                  store.setComentarioEdit(e.target.value)
                                }
                              />
                            </Col>
                            <Col md="2">
                              <Button
                                onClick={() => setEditingCommentId(null)}
                                className={"btn-dark"}
                              >
                                <BsXLg
                                  style={{ borderRadius: 20 }}
                                  size={25}
                                  color={
                                    store.comentarioEdit.texto ? "white" : "gray"
                                  }
                                />
                              </Button>
                            </Col>
                            <Col md="1">
                              <Button
                                className="btn-dark"
                                onClick={(e) => {
                                  store.updateComentario(
                                    comentario.idComentario
                                  )
                                  setEditingCommentId(null)
                                }}
                                disabled={!store.comentarioEdit.texto}
                              >
                                <MdSend
                                  style={{ borderRadius: 20 }}
                                  size={25}
                                  color={
                                    store.comentarioEdit.texto ? "white" : "gray"
                                  }
                                />
                              </Button>
                            </Col>
                          </Form>
                        ) : (
                          <Card
                            className="mb-2 w-100"
                            bg="dark"
                            style={{ color: "white" }}
                          >
                            <Card.Body className="row">
                              <Col md="9">{comentario.texto}</Col>
                              <Col md="3">
                                {comentario.usuario.id ===
                                  Number(store.idUser) && (
                                  <div className={"d-flex flex-column"}>
                                    <button
                                      className={
                                        "align-self-end ms-auto btn-delete"
                                      }
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <BsThreeDotsVertical color={"white"} />
                                      <ul className="dropdown-menu">
                                        <li
                                          className="dropdown-item"
                                          onClick={() => {
                                            setEditingCommentId(
                                              comentario.idComentario
                                            );
                                            setEditedComment(comentario.texto);
                                            store.setComentarioEdit(
                                              comentario.texto
                                            );
                                          }}
                                        >
                                          Editar
                                        </li>
                                        <li
                                          className="dropdown-item"
                                          onClick={() => {
                                            setSmShow(true);
                                            setShow(false);
                                            store.setComentarioDeleteId(
                                              comentario.idComentario
                                            );
                                            store.setRespostaDeleteId(null);
                                          }}
                                        >
                                          Excluir
                                        </li>
                                      </ul>
                                    </button>
                                  </div>
                                )}
                              </Col>
                            </Card.Body>
                            <Card.Footer>
                              {!isReplyingToComment && (
                                <div>
                                    <Button className="btn-dark"
                                        onClick={() =>
                                            setReplyingToCommentId(
                                              comentario.idComentario
                                            )
                                        }
                                    >
                                        Responder
                                    </Button>
                                  {comentario?.respostas?.length > 0 && (
                                    <Button className="btn-dark"
                                      onClick={() =>
                                        handleVerRespostas(
                                          comentario.idComentario
                                        )
                                      }
                                    >
                                        {expandedComments.includes(
                                        comentario.idComentario
                                      )
                                        ? "Ocultar Respostas"
                                        : "Ver Respostas"}
                                    </Button>
                                  )}
                                </div>
                              )}
                            </Card.Footer>
                          </Card>
                        )}
                      </div>
                      {/* /////////////// até aqui /////////////////////////////// */}
                      {comentario?.respostas?.length > 0 &&
                        expandedComments.includes(comentario.idComentario) &&
                        comentario?.respostas.map((resposta) => {
                          const isReplyingToResponse =
                            editingReplyId === resposta.idResposta;

                          return (
                            <>
                              {/* Resposta dos comentários */}
                                {isReplyingToResponse ? (
                                  <Card key={resposta.idResposta} className="mb-1" bg="dark" style={{ color: "white" }}>
                                    <Form className="bg-dark row">
                                        <Col md="9">
                                            <Form.Control
                                            className="bg-dark text-light"
                                            value={store.respostaEdit.texto}
                                            onChange={(e) =>
                                                store.setRespostaEdit(e.target.value)
                                            }
                                            style={{borderRadius: 100}}
                                            />
                                        </Col>
                                        <Col md="2">
                                        <Button
                                            onClick={() => setEditingReplyId(null)}
                                            className={"btn-dark"}
                                        >
                                            <BsXLg
                                            style={{ borderRadius: 20 }}
                                            size={25}
                                            color={
                                                store.comentario.texto ? "white" : "gray"
                                            }
                                            />
                                        </Button>
                                        </Col>
                                        <Col md="1">
                                            <Button
                                            className="btn-dark"
                                            onClick={() => {
                                                store.updateResposta(
                                                  resposta.idResposta
                                                )
                                                setEditingReplyId(null)
                                              }}
                                              disabled={!store.respostaEdit.texto}>
                                            <MdSend
                                                style={{ borderRadius: 20 }}
                                                size={25}
                                                color={store.resposta.texto ? "white" : "gray"}
                                                className={"ms-1 mb-1"}
                                            />
                                            </Button>
                                        </Col>
                                    </Form>
                                  </Card>
                                ) : (
                                  <>
                                  <Card className="mb-1 bg-dark" style={{marginLeft: 40}}>
                                    <Card.Body>
                                      <Row>
                                        <Col md="10">
                                          <p className={"text-start text-light"}>
                                            {resposta.texto}
                                          </p>
                                        </Col>
                                        <Col md="2">
                                        {resposta.usuario.id ===
                                          Number(store.idUser) && (
                                          <div className={"d-flex flex-column"}>
                                            <button
                                              className={
                                                "align-self-end ms-auto btn-delete"
                                              }
                                              type="button"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <BsThreeDotsVertical color={"white"}/>
                                              <ul className="dropdown-menu">
                                                <li
                                                  className="dropdown-item"
                                                  onClick={() => {
                                                    setEditingReplyId(
                                                      resposta.idResposta
                                                    );
                                                    setEditedReply(resposta.texto);
                                                    store.setRespostaEdit(
                                                      resposta.texto
                                                    );
                                                  }}
                                                >
                                                  Editar
                                                </li>
                                                <li
                                                  className="dropdown-item"
                                                  onClick={() => {
                                                    setSmShow(true);
                                                    setShow(false);
                                                    store.setRespostaDeleteId(
                                                      resposta.idResposta
                                                    );
                                                    store.setComentarioDeleteId(
                                                      comentario.idResposta
                                                    );
                                                  }}
                                                >
                                                  Excluir
                                                </li>
                                              </ul>
                                            </button>
                                          </div>
                                        )}
                                        </Col>
                                      </Row>
                                    </Card.Body>
                                  </Card>
                                  </>
                                )}
                          </>);
                        })}
                      {replyingToCommentId === comentario.idComentario && (
                        <Form className="bg-dark row">
                            <Col md="11">
                                <Form.Control
                                className="bg-dark text-light"
                                placeholder="Digite sua resposta..."
                                value={store.resposta.texto}
                                onChange={(e) => store.setResposta(e.target.value)}
                                style={{borderRadius: 100}}
                                />
                            </Col>
                            <Col md="1">
                                <Button
                                className="btn-dark"
                                onClick={() =>
                                    store.enviarRespostaComentario( 
                                      comentario.idComentario
                                    )
                                }
                                disabled={!store.resposta.texto}
                                >
                                <MdSend
                                    style={{ borderRadius: 20 }}
                                    size={25}
                                    color={store.resposta.texto ? "white" : "gray"}
                                    className={"ms-1 mb-1"}
                                />
                                </Button>
                            </Col>
                        </Form>
                      )}
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </div>
        </div>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => {
            setSmShow(false);
            setShow(true);
          }}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Excluir {store.respostaDeleteId ? "Resposta" : "Comentário"}?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja excluir{" "}
            {store.respostaDeleteId ? "esta resposta" : "este comentário"}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setSmShow(false);
                setShow(true);
              }}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => {
                store.respostaDeleteId ? store.deleteResposta() : store.handleDeleteComentario()
                setSmShow(false);
                setShow(true);
            }}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
});

export default ViewVideo;
