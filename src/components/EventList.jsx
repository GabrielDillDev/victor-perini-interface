import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EventListWrapper = styled.div`
  background-color: #777;
  padding: 20px;
  color: #333; 
`;

const EventItem = styled.div`
  background-color: #ccc; 
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative; 
`;

const Title = styled.h3`
  margin-bottom: 5px;
`;

const Description = styled.p`
  margin-bottom: 5px;
`;

const Date = styled.p`
  margin-bottom: 5px;
`;

const Address = styled.p`
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #FF6347; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
`;

const EditButton = styled.button`
  background-color: #4682B4; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false); 
  const [editFields, setEditFields] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_ROUTE_AGENDA);
      setEvents(response.data.events);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_ROUTE_AGENDA}/${id}`);
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  const handleEditEvent = (id) => {
    setEditMode(true);
    
    const eventToEdit = events.find(event => event.id === id);
    
    setEditFields({
      id: eventToEdit.id,
      title: eventToEdit.titulo,
      description: eventToEdit.descricao,
      date: eventToEdit.data_evento,
      address: eventToEdit.endereco
    });
  };

  const handleEditInputChange = (e, field) => {
    setEditFields({
      ...editFields,
      [field]: e.target.value
    });
  };

  const handleEditConfirm = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_ROUTE_AGENDA}/${editFields.id}`, {
        titulo: editFields.title,
        descricao: editFields.description,
        data_evento: editFields.date,
        endereco: editFields.address
      });
  
      setEditMode(false);
      setEditFields({});
      
      fetchEvents();
    } catch (error) {
      console.error('Erro ao editar evento:', error);
    }
  };

  return (
    <EventListWrapper>
      <h2>Lista de Eventos</h2>
      {events.map(event => (
        <EventItem key={event.id}>
          <Title>{event.titulo}</Title>
          <Description>{event.descricao}</Description>
          <Date>Data: {event.data_evento}</Date>
          <Address>Endereço: {event.endereco}</Address>
          <Button onClick={() => handleDeleteEvent(event.id)}>Excluir</Button>
          <EditButton onClick={() => handleEditEvent(event.id)}>Editar</EditButton>
          
          {editMode && event.id === editFields.id && (
            <>
              <input
                type="text"
                value={editFields.title}
                onChange={(e) => handleEditInputChange(e, 'title')}
                placeholder="Novo título"
              />
              <input
                type="text"
                value={editFields.description}
                onChange={(e) => handleEditInputChange(e, 'description')}
                placeholder="Nova descrição"
              />
              <input
                type="text"
                value={editFields.date}
                onChange={(e) => handleEditInputChange(e, 'date')}
                placeholder="Nova data"
              />
              <input
                type="text"
                value={editFields.address}
                onChange={(e) => handleEditInputChange(e, 'address')}
                placeholder="Novo endereço"
              />
              <Button onClick={handleEditConfirm}>Confirmar</Button>
            </>
          )}
        </EventItem>
      ))}
    </EventListWrapper>
  );
};

export default EventList;
