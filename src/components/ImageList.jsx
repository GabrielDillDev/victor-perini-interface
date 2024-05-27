import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ImageListContainer = styled.div`
  background-color: #777;
  padding: 20px;
  color: #333;
`;

const ImageGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
 
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageBox = styled.div`
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  border: 1px solid black;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const DeleteButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_ROUTE_IMAGES);
      setImages(response.data.images);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_ROUTE_IMAGES}/${id}`);
      const updatedImages = images.filter(image => image.id !== id);
      setImages(updatedImages);
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
    }
  };

  return (
    <ImageListContainer>
      <h2>Lista de Imagens</h2>
      <ImageGrid>
        {images.map(image => (
          <ImageBox key={image.id}>
            <Image src={image.imageUrl} alt="Imagem" />
            <DeleteButton onClick={() => handleDeleteImage(image.id)}>Excluir</DeleteButton>
          </ImageBox>
        ))}
      </ImageGrid>
    </ImageListContainer>
  );
};

export default ImageList;
