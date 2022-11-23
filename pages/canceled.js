import styles from '../styles/Canceled.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(params) {

    const session_id = params.query.session_id;

    if (session_id) {
        return { props: {} };
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props:{},
        };
    }
}

export default function Canceled() {

    const [redirecting, setRedirecting] = useState(false);

    const router = useRouter();

    const redirect = () => {
        setRedirecting(true);
        router.push('/');
    }
    
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.canceledContainer}>
                    <h3>Your payment couldnt be processed. Please, try again later</h3>
                    <span>We are sorry for the inconvenience.</span>
                    <button onClick={redirect}>{redirecting ? 'Redirecting...' : 'CONTINUE SHOPPING'}</button>
                </div>
            </main>
        </div>
    )
}