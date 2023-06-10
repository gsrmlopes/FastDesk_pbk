import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { findTickets } from '../src/services/ticket.service'
import { getTicketStatusById } from '../src/services/ticketStatus.service'
import { getUserInfo } from '../src/services/user.service'
import Header from '@/components/customHeader';
import { Col, Row, Spin } from 'antd';

interface Ticket {
  _id: string;
  title: string;
}

interface Criteria {
  id?: string;
  status?: string;
  creator?: string;
}

export default function Busca() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (criteria: string) => {
    try {
      setSearching(true);
      const searchedTickets = await findTickets({ criteria });
      setTickets(searchedTickets);
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const handleTicketClick = async (ticketId: string) => {
    try {
      const ticketStatus = await getTicketStatusById(ticketId);
      console.log(ticketStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserClick = async () => {
    try {
      const userInfo = await getUserInfo();
      handleSearch('createdBy ' + userInfo._id);

      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <Row>
        <Col
          span={8}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            width: '100%',
            height: '100%',
            flex: '1',
            margin: '2%',
            borderRadius: '30px',
          }}
        >
          <h1 style={{ paddingLeft: '100px' }}>Buscar Ticket Por:</h1>
          <ClickableButton text="ID" onClick={() => handleSearch('ID')} />
          <ClickableButton
            text="Mais Antigo"
            onClick={() => handleSearch('Mais Antigo')}
          />
          <ClickableButton
            text="Mais Recente"
            onClick={() => handleSearch('Mais Recente')}
          />
          <ClickableButton
            text="Data"
            onClick={() => handleSearch('Data')}
          />
          <ClickableButton
            text="Título"
            onClick={() => handleSearch('Título')}
          />
          <ClickableButton
            text="Atribuído A"
            onClick={() => handleSearch('Atribuído A')}
          />
          <ClickableButton text="Meus" onClick={handleUserClick} />
          <ClickableButton
            text="Prioridade"
            onClick={() => handleSearch('Prioridade')}
          />
          <ClickableButton
            text="Status"
            onClick={() => handleSearch('Status')}
          />
        </Col>
        <Col
          span={16}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            width: '100%',
            height: '80vh',
            flex: '1',
            margin: '2%',
            borderRadius: '30px',
          }}
        >
          {searching ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spin size="large" />
            </div>
          ) : (
            <ul>
              {tickets && tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <li key={ticket._id} onClick={() => handleTicketClick(ticket._id)}>
                    {ticket.title}
                  </li>
                ))
              ) : (
                <p>No tickets found.</p>
              )}
            </ul>
          )}
        </Col>
      </Row>
    </div>
  );
}

interface ClickableButtonProps {
  text: string;
  onClick: () => void;
}

function ClickableButton({ text, onClick }: ClickableButtonProps) {
  return (
    <div style={{ margin: '0% 5%', padding: '1vh', cursor: 'pointer' }}>
      <hr />
      <div
        style={{
          height: '5vh',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={onClick}
      >
        <h1>
          {text}{' '}
          <FontAwesomeIcon
            icon={faSearchengin}
            flip="horizontal"
            style={{ color: '#363636' }}
          />{' '}
        </h1>
      </div>
      <hr />
    </div>
  );
}