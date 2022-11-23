import styles from '../styles/Success.module.css';
import ReviewItem from '../components/reviewItem/reviewItem';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/slices/cartSlice';
const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export async function getServerSideProps(params) {

    const session_id = params.query.session_id;

    if (session_id) {
        const order = await stripe.checkout.sessions.retrieve(
            params.query.session_id,
            {
                expand: ['line_items'],
            }
        );
        return { props: { order } };
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

export default function Success({ order }) {

    const orders = order.line_items.data;

    const [redirecting, setRedirecting] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    dispatch(cartActions.emptyCart());
    dispatch(cartActions.setCart(false));

    const redirect = () => {
        setRedirecting(true);
        router.push('/');
    }
    
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.reviewContainer}>
                    <h3>Thanks for your purchase!</h3>
                    <section>
                        <span>Order Review</span>
                        <hr/>
                        <div className={styles.ordersContainer}>
                            <div className={styles.parameters}>
                                <div>
                                    <span>Item</span>
                                </div>
                                <div>
                                    <span>Quantity</span>
                                </div>
                                <div>
                                    <span>Price</span>
                                </div>
                            </div>
                            <div className={styles.orders}>
                                {
                                    orders.map((item, index) => {
                                     return (
                                           <ReviewItem key={index} item={item} />
                                     )
                                  })
                                }
                            </div>
                        </div>
                        <section className={styles.buttonContainer}>
                            <button onClick={redirect}>{redirecting ? 'Redirecting...' : 'CONTINUE SHOPPING' }</button>
                        </section>
                    </section>
                </div>
            </main>
        </div>
    )
}