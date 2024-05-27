import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Interface from './Interface.jsx';

const LoginContainer = styled.div`
  background-color: #777;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
  padding: 0 10px;
  border-radius: 5px;
  border: none;
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: #ccc;
  color: #333;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Preencha o nome de usuário e a senha.');
      return;
    }

    try {
      console.log('URL de login:', import.meta.env.VITE_API_ROUTE_LOGIN); 
      const response = await axios.post(import.meta.env.VITE_API_ROUTE_LOGIN, {
        username,
        password,
      });

      console.log(response); 

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      if (error.response) {
        console.error('Erro no servidor:', error.response.data);
        setError('Credenciais inválidas.');
      } else if (error.request) {
        console.error('Nenhuma resposta recebida:', error.request);
        setError('Erro no servidor. Tente novamente mais tarde.');
      } else {
        console.error('Erro na configuração da requisição:', error.message);
        setError('Erro na configuração da requisição.');
      }
    }
  };

  return loggedIn ? (
    <Interface />
  ) : (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">Entrar</SubmitButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
