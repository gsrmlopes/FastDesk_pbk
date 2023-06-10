import Link from 'next/link';
import styles from '../../styles/CustomHeader.module.css';
import { Row , Col
} from 'antd'
import 'antd/dist/reset.css';
const Header = () => {
  return (
    <div className={styles.header}>
      <Row align={'middle'}>
        <Col span={5} style={{borderRight: '5px solid black'}}>
          <div className={styles.centering} style={{height: '10vh', fontSize: '200%'}}>
        <button className={styles.button}><Link href='/'>Home</Link></button>
          </div>
        </Col>
        <Col span={5} style={{borderRight: '5px solid black'}}>
        <div className={styles.centering} style={{height: '10vh', fontSize: '200%'}}>
        <button className={styles.button}><Link href='/dados'>Meus Dados</Link></button>
          </div>
        </Col>
        <Col span={5} style={{borderRight: '5px solid black'}}>
        <div className={styles.centering} style={{height: '10vh', fontSize: '200%'}}>
        <button className={styles.button}><Link href='/cadastro'>Cadastro</Link></button>
          </div>
        </Col>
        <Col span={5} style={{borderRight: '5px solid black'}}>
        <div className={styles.centering} style={{height: '10vh', fontSize: '200%'}}>
        <button className={styles.button}><Link href='/dashboard'>DashBoard</Link></button>
          </div>
        </Col>
        <Col span={4} style={{borderRight: '5px solid black'}}>
        <div className={styles.centering} style={{height: '10vh', fontSize: '200%'}}>
        <button className={styles.button}><Link href='/sair'>Sair</Link></button>
          </div>
        </Col>
      </Row>
          

    </div>
  );
};

export default Header;
