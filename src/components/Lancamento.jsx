import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: #777;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const ContainerText = styled.div`
    background-color: #ccc;
    padding: 20px;
    border-radius: 10px;
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

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
`;

const VideoFrame = styled.iframe`
    width: 100%;
    height: 30rem;
    margin-top: 10px;
    border: none;
    border-radius: 10px;
`;

const Lancamento = () => {
    const [videoUrl, setVideoUrl] = useState();
    const [editing, setEditing] = useState(false);
    const [editedVideoUrl, setEditedVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_ROUTE_LANCAMENTO);
                const data = await response.json();
                console.log(data);
                setVideoUrl(data.lancamento.videourl);
                setEditedVideoUrl(data.lancamento.videourl);
            } catch (error) {
                console.error('Erro ao obter a URL do vídeo:', error);
            }
        };

        fetchVideoUrl();
    }, []);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleConfirmClick = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_ROUTE_LANCAMENTO, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ novoVideoUrl: editedVideoUrl }),
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar a URL do vídeo');
            }
            setVideoUrl(editedVideoUrl);
            setEditing(false);
        } catch (error) {
            console.error('Erro ao confirmar a edição:', error);
        }
    };

    const getVideoIdFromUrl = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('v');
    };

    const generateEmbedUrl = (videoId) => {
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const embedUrl = videoUrl && generateEmbedUrl(getVideoIdFromUrl(videoUrl));

    return (
        <Container>
            <ContainerText>
                {editing ? (
                    <>
                        <Input
                            value={editedVideoUrl}
                            onChange={(e) => setEditedVideoUrl(e.target.value)}
                            placeholder="Insira a URL do vídeo"
                        />
                        <EditButton onClick={handleConfirmClick}>Confirmar</EditButton>
                    </>
                ) : (
                    <>
                        <Text>{videoUrl}</Text>
                        <EditButton onClick={handleEditClick}>Editar</EditButton>
                    </>
                )}
                {embedUrl && <VideoFrame src={embedUrl} title="Embedded YouTube Video" />}
            </ContainerText>
        </Container>
    );
};

export default Lancamento;
