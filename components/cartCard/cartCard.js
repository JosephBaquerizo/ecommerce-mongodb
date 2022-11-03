import styles from './cartCard.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/slices/cartSlice';
const { motion } = require('framer-motion');

const card = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
}

export default function CartCard({ item }) {

    const dispatch = useDispatch();

    return (
        <motion.div className={styles.card} layout variants={card}>
            <img src={item.imageURL} alt={item.name} className={styles.image}/>
            <div className={styles.infoContainer}>
                <div className={styles.infoBlock}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.price}>${item.price}</span>
                </div>
                <div className={styles.quantityBlock}>
                    <span className={styles.quantity}>Quantity</span>
                    <div className={styles.operation}>
                        <div className={styles.auxiliarWidth}>
                            <span onClick={() => dispatch(cartActions.removeItem(item))} className={styles.symbol}>-</span>
                        </div>
                        <div className={styles.auxiliarWidth}>
                            <span className={styles.value}>{item.qty}</span>
                        </div>
                        <div className={styles.auxiliarWidth}>
                            <span onClick={() => dispatch(cartActions.addItem({product: item, qty: 1}))} className={styles.symbol}>+</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}