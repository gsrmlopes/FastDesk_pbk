import React, { useEffect, useState } from "react";
import styles from "../../styles/sideMenu.module.css";
import Link from "next/link";
import ticketService from "../services/ticket.service";
import ticketStatusService from "../services/ticketStatus.service";

const SideMenu = ({ reload }: { reload: boolean }) => {
  const [openTickets, setOpenTickets] = useState(0);
  const [inAnalysisTickets, setInAnalysisTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    ticketService
      .findTickets()
      .then((tickets) => {
        const openTicketsCount = tickets.filter(
          (ticket: any) => ticket.status.name === 'open'
        ).length;
        const inAnalysisTicketsCount = tickets.filter(
          (ticket: any) => ticket.status.name === 'in_analysis'
        ).length;
        const closedTicketsCount = tickets.filter(
          (ticket: any) => ticket.status.name === 'closed'
        ).length;

        setOpenTickets(openTicketsCount);
        setInAnalysisTickets(inAnalysisTicketsCount);
        setClosedTickets(closedTicketsCount);
      })
      .catch((error) => setError(error.message));
  }, [reload]);

  if (error) {
    alert('Faça Login Novamente!');
    return <h4>{error}</h4>;
  }

  return (
    <>
      <Link href="/busca">
        <div className={`${styles.sideMenu} side-menu-link`}>
          <div className={styles.segment}>
            <h3>Tickets<br />Abertos</h3>
            <h4>{openTickets}</h4>
          </div>
          <div className={styles.segment}>
            <h3>Tickets<br />Em Análise</h3>
            <h4>{inAnalysisTickets}</h4>
          </div>
          <div className={styles.segment}>
            <h3>Tickets<br />Finalizados</h3>
            <h4>{closedTickets}</h4>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SideMenu;
