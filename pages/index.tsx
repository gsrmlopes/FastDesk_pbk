import styles from '../styles/page.module.css'
import Hero from '../src/components/homeHero'
import Footer from '../src/components/footer'
import 'antd/dist/reset.css';

export default function Home() {
  return (
    <main className={styles.main}>
        <div className='grid'>
          <Hero />
          <br />
          <Footer />
        </div>

    </main>
  )
}
