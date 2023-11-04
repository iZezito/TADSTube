import React, {useState} from "react";
import {observer} from "mobx-react";
import store from "../store/CadastroStore";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import api from "../service/Configuration";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {BsPlayBtnFill} from 'react-icons/bs';
const Cadastro = observer(() => {

    const [text, setText] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erros, setErros] = useState({login: '', senha: '', confirmarSenha: ''});

    const handleFileChange = (event) => {
        store.verificarMatricula(event.target.files[0]);
    }



    const handleChangeConfirmarSenha = (event) => {
        setConfirmarSenha(event.target.value);
    }

    const handleChangeLogin = (event) => {
        store.verificarLogin();
        store.setLogin(event.target.value);
    }

    const handleChangeSenha = (event) => {
        store.setSenha(event.target.value);
    }

    const cadastrarUsuario = (event) => {
        event.preventDefault();
        if (store.usuario.senha.length < 6) {
            setErros((errosAntigos) => ({...errosAntigos, senha: 'A senha deve ter no mínimo 6 caracteres'}));
            console.log('entrou senha');
        } else {
            setErros((errosAntigos) => ({...errosAntigos, senha: ''}));
        }

        if (store.usuario.senha !== confirmarSenha) {
            setErros((errosAntigos) => ({...errosAntigos, confirmarSenha: 'As senhas não conferem'}));
            console.log('entrou confirmar senha');
        } else {
            setErros((errosAntigos) => ({...errosAntigos, confirmarSenha: ''}));
        }

        if (store.usuario.login === '') {
            setErros((errosAntigos) => ({...errosAntigos, login: 'O login não pode ser vazio'}));
            console.log('entrou login');
        } else {
            setErros((errosAntigos) => ({...errosAntigos, login: ''}));
        }

        console.log(erros);
        if (isValido()) {
            store.cadastrarUsuario();
        }

    }

    const isValido = () => {
        return !(erros.login || erros.senha || erros.confirmarSenha || store.usuario.matricula === '');

    }

    return (
        <>
        <Container className="position-absolute top-50 start-50 translate-middle" style={{maxWidth: 600}}>
                <Card className="bg-dark">
                    <Card.Header>
                        <Card.Title className='text-light'><BsPlayBtnFill style={{width: 30, height: 30, color: 'red'}}/> TADStube</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={cadastrarUsuario}>
                            <Row>
                                <Col md="12" className="mb-3">
                                    <label htmlFor="exampleInputText" className="form-label text-light">Login</label>
                                    <input type="file" className="form-control" accept=".pdf" id="exampleInputText1"
                                           aria-describedby="textHelp"
                                           onChange={handleFileChange}
                                    />
                                    {store.avisoMatricula && <span className="text-danger">{store.avisoMatricula}</span>}
                                </Col>
                                <Col md="6" className="mb-5">
                                    <label htmlFor="exampleInputPassword1" className="form-label text-light">Senha</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           value={store.usuario.senha}
                                           onChange={(e) => handleChangeSenha(e)}/>
                                    {erros.senha && <span className="text-danger">{erros.senha}</span>}
                                </Col>
                                <Col md="6" className="mb-5">
                                    <label htmlFor="exampleInputPassword2" className="form-label text-light">Confirma senha</label>
                                    <input type="password" className="form-control" id="exampleInputPassword2"
                                           onChange={(e) => handleChangeConfirmarSenha(e)}
                                           value={confirmarSenha}
                                    />
                                    {erros.confirmarSenha &&
                                    <span className="text-danger">{erros.confirmarSenha}</span>}
                                </Col>
                                <Col md="12">
                                    <button type="submit" className="btn btn-danger">
                                        Cadastrar
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
        </Container>
        </>
    )
});

export default Cadastro;