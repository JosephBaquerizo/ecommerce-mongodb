import styles from '../../../styles/Home.module.css';
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router';
//import conectarDB from '../../../lib/connectDB';
//import User from '../../../models/User';
import Link from 'next/link';
const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export const getServerSideProps = withPageAuthRequired({

    async getServerSideProps(ctx) {
        const session = getSession(ctx.req, ctx.res);
        /*const userId = session.user.sub.split('|')[1];
        
        try {
            await conectarDB();
            const user = await User.findById(userId);
            const orders = user.orders;

            return { props: { orders }};

        } catch(error) {
            console.log(error);
        }*/
        const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
        const paymentIntents = await stripe.paymentIntents.list({
            customer: stripeId,
        });
        return { props: { orders: paymentIntents.data }};
    }
})

// con el withPageAuthRequired, el componente ya obtiene por default el user sin el useUser()
export default function Profile({ user, orders }) {

    const { nickname } = user;

    const router = useRouter();

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.topProfile}>
                    <span>Welcome <span className={styles.nickname}>{nickname}</span></span>
                    <button onClick={() => router.push('/api/auth/logout')}>LOGOUT</button>
                </div>
                <section className={styles.orderSection}>
                    <span className={styles.orderTitle}>ORDERS</span>
                    <hr/>
                    <div className={styles.orderContainer}>
                        <div className={styles.columnsTitleContainer}>
                            <div className={styles.block25}>
                                <span>ORDER ID</span>
                            </div>
                            <div className={styles.block25}>
                                <span>TOTAL PRICE</span>
                            </div>
                        </div>
                        {
                            orders.length >= 1
                            ?
                            orders.map((item, index) => {
                                return (
                                    <div className={styles.order} key={index}>
                                        <div className={styles.block25}>
                                            <span className={styles.responsiveParameter}>ORDER ID</span>
                                            <span>{item.id}</span>
                                        </div>
                                        <div className={styles.block25}>
                                            <span className={styles.responsiveParameter}>TOTAL ITEMS</span>
                                            <span >${item.amount/100}</span>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <span>You havent purchased anything yet!</span>
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}