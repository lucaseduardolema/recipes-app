import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');

  const handleEmail = ({ target: { value } }) => setuserEmail(value);

  const handlePassword = ({ target: { value } }) => setuserPassword(value);

  const validUser = () => {
    const minPassword = 7;
    const emailTest = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    return emailTest && userPassword.length >= minPassword;
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    history.push('/foods');
  };

  return (
    <Container>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              data-testid="email-input"
              type="email"
              placeholder="Enter email"
              value={ userEmail }
              onChange={ handleEmail }
            />
            <Form.Text className="text-muted">
              Nunca informamos seu e-mail a terceiros.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              value={ userPassword }
              onChange={ handlePassword }
            />
          </Form.Group>

          <Button
            data-testid="login-submit-btn"
            variant="primary"
            type="button"
            disabled={ !validUser() }
            onClick={ handleSubmit }
          >
            Logar
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
