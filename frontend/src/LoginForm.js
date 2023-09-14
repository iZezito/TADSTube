import React, { useState } from 'react';
import Card from  "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { BsPlayBtnFill } from 'react-icons/bs';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Neste exemplo, não há lógica de autenticação, apenas exibimos as credenciais inseridas.
    alert(`Nome de usuário: ${username}, Senha: ${password}`);
  };

  return (
      <Card className='container position-absolute top-50 start-50 translate-middle bg-dark'>
        <Card.Header>
          <Card.Title className='text-light'><BsPlayBtnFill style={{width: 30, height: 30, color: 'red'}}/> TADStube</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label className='text-light'>Nome usuário</Form.Label>
              <Form.Control type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label className='text-light'>Senha</Form.Label>
              <Form.Control type="password" placeholder="Nome de Usuário" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <>
            <br></br>
            </>
            <Form.Group>
              <Button variant="danger" className="justify-content-center" onClick={handleLogin}>Entrar</Button>
            </Form.Group>
          </Form>

        </Card.Body>
      </Card>
  );
};

export default LoginPage;
