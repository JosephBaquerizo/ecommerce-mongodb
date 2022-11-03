import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Section from '../models/Section';
import SectionArray from '../components/sectionArray/sectionArray';
import conectarDB from '../lib/connectDB';

export default function Home({ sections }) {

  if ( !sections ) {
    return <span>No info</span>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Authentic.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <span>Home</span>
        </div>
        <SectionArray sections={sections} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {

    await conectarDB();
    
    const res = await Section.find({});
    
    const sections = res.map( item => {
      const section = item.toObject();
      section._id = `${section._id}`;
      return section;
    })

    return { props: { sections }}

  } catch(error) {
      console.log(error);
  }
}