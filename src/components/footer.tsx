import Image from 'next/image'
import styles from './Page.module.css'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
    return (
        <div style={{ height: '12vh', minWidth: '100vw' }} className={styles.footer}>

            <br />
            <FontAwesomeIcon icon={faGithubAlt} height={'5vh'} />
            <p>Desenvolvido por G Souza   - todos os direitos reservados - ®️ 2023</p>

        </div>
    )
}
