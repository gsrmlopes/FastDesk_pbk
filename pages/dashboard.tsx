'use client'
import { useEffect, useState, useRef } from 'react';
import { createTicket } from '../src/services/ticket.service';
import { getUserInfo } from '../src/services/user.service';
import ticketStatusService from '../src/services/ticketStatus.service';
import { Row, Col, Radio, Form, Input } from 'antd';
import 'antd/dist/reset.css';
import SideMenu from '../src/components/sideMenu';
import Footer from '../src/components/footer';
import Header from '../src/components/customHeader';
import styles from '../styles/dashboard.module.css';

let user_id: any;
let status: any;

let newPrioridade = 'low';

function handleChange(prop: number) {
  switch (prop) {
    case 1:
      newPrioridade = 'high';
    case 2:
      newPrioridade = 'normal';
    case 3:
      newPrioridade = 'low';
    default:
      newPrioridade = 'low';
  }
}

function MyForms({ onSave }: any) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSave() {
    // Call the onSave prop with the form data
    onSave({ title, description });
  }

  return (
    <>
      <Row className={styles.Row}>
        <h1 style={{ paddingLeft: '100px' }}>Título:</h1>
        <Input
          style={{ marginLeft: '170px', width: '40%', fontSize: '200%' }}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </Row>
      <Row className={styles.Row}>
        <h1 style={{ paddingLeft: '100px' }}>Descrição:</h1>
        <Input
          style={{
            marginLeft: '100px',
            width: '40%',
            height: '100px',
            fontSize: '200%',
          }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Row>
      <Row className={styles.RowPrioridades}>
        <h2>Prioridade:</h2>
        <RadioGroup onChange={() => { }} size="large" defaultValue={3}>
          <Radio
            onClick={() => {
              handleChange(1);
            }}
            value={1}
            style={{ color: '#922e2a' }}
          >
            {' '}
            <h3> Alta</h3>{' '}
          </Radio>
          <Radio
            onClick={() => {
              handleChange(2);
            }}
            value={2}
            style={{ color: '#ffff6f' }}
          >
            {' '}
            <h3> Média</h3>{' '}
          </Radio>
          <Radio
            onClick={() => {
              handleChange(3);
            }}
            value={3}
            style={{ color: '#4a8167' }}
          >
            {' '}
            <h3> Baixa</h3>{' '}
          </Radio>
        </RadioGroup>
      </Row>
      <button onClick={handleSave}>Enviar</button>
    </>
  );
}


const RadioGroup = Radio.Group;
export default function Dashboard() {
  let assignedTo = '';
  let sector = '';
  const [status, setStatus] = useState([]);
  const [sideMenuReload, setSideMenuReload] = useState(false);

  const keyRef = useRef(0);

  useEffect(() => {
    const fetchTicketStatuses = async () => {
      try {
        const ticketStatuses = await ticketStatusService.findTicketStatuses('open');
        setStatus(ticketStatuses[0]); // Set the fetched ticket statuses
      } catch (error) {
        console.error(error);
      }
    };
    fetchTicketStatuses();
    setSideMenuReload(false);
  }, [sideMenuReload]);

  async function handleSave(value: any) {
    let title = value.title;
    let description = value.description;
    let priority = newPrioridade;

    try {
      // Call the /me route to retrieve the user information
      const response = await getUserInfo();
      const data = response;
      let created_by = data._id;

      // Use the userId variable as needed
      const postResponse = await createTicket(
        title,
        description,
        priority,
        created_by,

        // assignedTo,
        // sector,
        status
      );
      if (postResponse) {
        alert('Ticket criado com sucesso!');
        setSideMenuReload(true);
      } else {
        alert('Erro ao criar ticket!');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar ticket!');
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Header />
        <Row>
          <Col span={5}>
            <SideMenu reload={sideMenuReload} />
          </Col>
          <Col span={19}>
           
            <div className={styles.centering}>
              <h1>Novo Ticket:</h1>
              <MyForms onSave={handleSave} />
            </div>
          </Col>
        </Row>
        <Footer />
      </div>

    </main>
  )
}
