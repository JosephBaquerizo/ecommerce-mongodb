import styles from '../../../../styles/Home.module.css';
import conectarDB from '../../../../lib/connectDB';
import User from '../../../../models/User';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = withPageAuthRequired({

    async getServerSideProps({ params }) {
        try {
            
            await conectarDB();

            const { id, orderId } = params;

            const res = await User.findById(id);

            const orders = res.orders;

            const filteredOrders = orders.filter((item) => {
                return item.id === Number(orderId);
            });
    
            const order = filteredOrders[0];

            return { props: { success: true, order }}
    
        } catch(error) {
            console.log(error);
            return { props: { success: false }}
        }
    }
});


export default function OrderView({ success, order, user }) {

    const { nickname } = user;

    if (!success) {
        return <span>Order couldnt be fetched, try again later</span>
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.topProfile}>
                    <span>Welcome <span className={styles.nickname}>{nickname}</span></span>
                    <button onClick={() => router.push('/api/auth/logout')}>LOGOUT</button>
                </div>
                <section className={styles.orderSection}>
                    <span className={styles.orderTitle}>ORDER ID: {order.id}</span>
                    <hr/>
                    <div className={styles.orderContainer}>
                        <div className={styles.columnsTitleContainer}>
                            <div className={styles.block25}>
                                <span>ITEM</span>
                            </div>
                            <div className={styles.block25}>
                                <span>NAME</span>
                            </div>
                            <div className={styles.block25}>
                                <span>QUANTITY</span>
                            </div>
                            <div className={styles.block25}>
                                <span>PRICE</span>
                            </div>
                        </div>
                        {
                            order.order.map((item, index) => {
                                return (
                                    <div className={styles.order} key={index}>
                                        <div className={styles.block25}>
                                            <img src={item.imageURL} className={styles.blockImage}/>
                                        </div>
                                        <div className={styles.block25}>
                                            <span className={styles.itemName}>{item.name}</span>
                                        </div>
                                        <div className={styles.block25}>
                                            <span>{item.qty}</span>
                                        </div>
                                        <div className={styles.block25}>
                                            <span>${item.price}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}