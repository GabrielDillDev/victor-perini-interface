import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: #777;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContainerText = styled.div`
    background-color: #ccc;
    padding: 20px;
    border-radius: 10px;
    margin: 20px auto;
    max-width: 30rem;
`;

const Text = styled.p`
    font-size: 1.2rem;
    color: #333;
`;

const EditButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    resize: vertical; 
`;

const ConfirmButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Biografia = () => {
    const [biografia, setBiografia] = useState('');
    const [editing, setEditing] = useState(false);
    const [editedBiografia, setEditedBiografia] = useState('');

    useEffect(() => {
        const fetchBiografia = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_ROUTE_BIO);
                const data = await response.json();
                setBiografia(data.biografia);
            } catch (error) {
                console.error('Erro ao obter a biografia:', error);
            }
        };

        fetchBiografia();
    }, []);

    const handleEditClick = () => {
        setEditedBiografia(biografia);
        setEditing(true);
    };

    const handleConfirmClick = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_ROUTE_BIO, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ novoTexto: editedBiografia }),
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar a biografia');
            }
            setBiografia(editedBiografia);
            setEditing(false);
        } catch (error) {
            console.error('Erro ao confirmar a edição:', error);
        }
    };

    return (
        <Container>
            <ContainerText>
                {editing ? (
                    <>
                        <TextArea
                            value={editedBiografia}
                            onChange={(e) => setEditedBiografia(e.target.value)}
                            rows={4} 
                        />
                        <ConfirmButton onClick={handleConfirmClick}>Confirmar</ConfirmButton>
                    </>
                ) : (
                    <>
                        <Text>{biografia}</Text>
                        <EditButton onClick={handleEditClick}>Editar</EditButton>
                    </>
                )}
            </ContainerText>
        </Container>
    );
};

export default Biografia;
