import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

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
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    history.push('/foods');
  };

  return (
    <Container fluid className="login-page">
      <Row
        className="
        d-flex
        justify-content-center
        flex-column
        align-items-center"
      >
        <Form>
          <Form.Group
            className="my-5"
            controlId="formBasicEmail"
          >
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

          <Form.Group className="my-5" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              value={ userPassword }
              onChange={ handlePassword }
            />
          </Form.Group>

          <div
            className="
            d-flex
            justify-content-center
            flex-column
            align-items-center"
          >
            <Button
              data-testid="login-submit-btn"
              variant="success"
              type="button"
              disabled={ !validUser() }
              onClick={ handleSubmit }
            >
              Logar
            </Button>
          </div>

        </Form>
      </Row>
    </Container>
  );
}

export default Login;
