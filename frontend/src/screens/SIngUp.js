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
import {ToastContainer} from "react-toastify";
import { useNavigate } from 'react-router-dom';


const Cadastro = observer(() => {
    const navigate = useNavigate();

    const [text, setText] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erros, setErros] = useState({login: '', senha: '', confirmarSenha: '', email: ''});



    const handleChangeConfirmarSenha = (event) => {
        setConfirmarSenha(event.target.value);
        setErros((errosAntigos) => ({...errosAntigos, confirmarSenha: ''}));
    }

    const handleChangeLogin = (event) => {
        store.setLogin(event.target.value);
        store.verificarLogin();
        setErros((errosAntigos) => ({...errosAntigos, login: ''}));

    }

    const handleChangeEmail = (event) => {
        store.setEmail(event.target.value);
        store.verificarEmail();
        setErros((errosAntigos) => ({...errosAntigos, email: ''}));
    }

    const handleChangeSenha = (event) => {
        store.setSenha(event.target.value);
        setErros((errosAntigos) => ({...errosAntigos, senha: ''}));
    }

    const cadastrarUsuario = (event) => {
        event.preventDefault();

        if (store.usuario.email.trim() === '') {
            // Si el email está vacío
            setErros((errosAntigos) => ({ ...errosAntigos, email: 'O email não pode ser vazio' }));
            store.avisoEmail = '';
            console.log('O email não pode ser vazio');
        } else if (!store.regexEmail.test(store.usuario.email)) {
            // Si el email no cumple con el formato válido
            setErros((errosAntigos) => ({ ...errosAntigos, email: 'O email deve ter um formato válido' }));
            console.log('O email deve ter um formato válido');
        } else {
            // Si el email es válido
            setErros((errosAntigos) => ({ ...errosAntigos, email: '' }));
            console.log('Email válido');
        }

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
            store.avisoLogin = '';
            console.log('entrou login');
        } else {
            setErros((errosAntigos) => ({...errosAntigos, login: ''}));
        }

        console.log(erros);
        if (isValido()) {
            store.cadastrarUsuario(navigate);
        }

    }

    const isValido = () => {
        return !(erros.login || erros.senha || erros.confirmarSenha || erros.email);

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
                                    <label htmlFor="exampleInputEmail1" className="form-label text-light">Login</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" value={store.usuario.login}
                                           onChange={(e) => handleChangeLogin(e)}/>
                                    {erros.login && <span className="text-danger">{erros.login}</span>}
                                    {store.avisoLogin.includes('válido') ? <span className="text-success">{store.avisoLogin}</span> : <span className="text-danger">{store.avisoLogin}</span>}
                                </Col>
                                <Col md="12" className="mb-3">
                                    <label htmlFor="exampleInputEmail2" className="form-label text-light">Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail2"
                                           aria-describedby="emailHelp" value={store.usuario.email}
                                           onChange={(e) => handleChangeEmail(e)}/>
                                    {erros.email && <span className="text-danger">{erros.email}</span>}
                                    {store.avisoEmail.includes('disponível') ? <span className="text-success">{store.avisoEmail}</span> : <span className="text-danger">{store.avisoEmail}</span>}
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
});

export default Cadastro;