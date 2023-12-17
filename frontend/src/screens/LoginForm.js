import React, { useState } from 'react';
import Card from  "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { BsPlayBtnFill } from 'react-icons/bs';
import {observer} from "mobx-react";
import {Link, useNavigate} from "react-router-dom";
import AuthStore from "../store/AuthStore";
import { toastErro} from "../utils/Toaster";
import { ToastContainer } from "react-toastify";

const LoginPage = observer(() => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginSuccessful = await AuthStore.login(username, password);
    console.log(username, password, loginSuccessful);

    if (loginSuccessful) {
      console.log('Login realizado com sucesso!');
      navigate('/');
    } else {
        toastErro('Usuário ou senha inválidos!');
    }
  }

  return (
      <>
      <Card className='container position-absolute top-50 start-50 translate-middle bg-dark'>
        <Card.Header>
          <Card.Title className='text-light'><BsPlayBtnFill style={{width: 30, height: 30, color: 'red'}}/> TADStube</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='text-light'>Nome usuário</Form.Label>
              <Form.Control type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label className='text-light'>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <>
            <br></br>
            </>
            <Form.Group>
              <Button variant="danger" className="justify-content-center" type={'submit'}>Entrar</Button><Link to={'/cadastro'}>SingUp</Link>
            </Form.Group>
          </Form>

        </Card.Body>

      </Card>
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
  );
});

export default LoginPage;
