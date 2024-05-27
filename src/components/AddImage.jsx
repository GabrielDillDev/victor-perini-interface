import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const AddImageWrapper = styled.div`
  background-color: #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
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

const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleAddImage = async () => {
    try {
      if (!selectedImage) {
        alert('Por favor, selecione uma imagem.');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedImage);

      await axios.post(import.meta.env.VITE_API_ROUTE_IMAGES, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Imagem adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar imagem:', error);
      alert('Erro ao adicionar imagem. Por favor, tente novamente.');
    }
  };

  return (
    <PageWrapper>
      <AddImageWrapper>
        <Title>Adicionar Nova Imagem</Title>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleAddImage}>Adicionar Imagem</Button>
      </AddImageWrapper>
    </PageWrapper>
  );
};

export default AddImage;
