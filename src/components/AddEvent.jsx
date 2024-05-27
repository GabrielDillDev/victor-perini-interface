import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #777; 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AddEventWrapper = styled.div`
  background-color: #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
`;

const Title = styled.h2`
  color: #333; 
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333; 
`;

const Button = styled.button`
  background-color: #333; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');

  const handleAddEvent = async () => {
    try {
      if (!title || !description || !date || !address) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      await axios.post(import.meta.env.VITE_API_ROUTE_AGENDA, {
        title,
        description,
        date,
        address
      });

      setTitle('');
      setDescription('');
      setDate('');
      setAddress('');

      alert('Evento adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      alert('Erro ao adicionar evento. Por favor, tente novamente.');
    }
  };

  return (
    <PageWrapper>
      <AddEventWrapper>
        <Title>Adicionar Novo Evento</Title>
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button onClick={handleAddEvent}>Adicionar Evento</Button>
      </AddEventWrapper>
    </PageWrapper>
  );
};

export default AddEvent;
