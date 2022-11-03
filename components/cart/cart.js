import styles from './cart.module.css';
import CartCard from '../cartCard/cartCard';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/slices/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { useUser } from '@auth0/nextjs-auth0';
import { getUserId } from '../../lib/helpers';
import toast from 'react-hot-toast';
import { useState } from 'react';
const { motion } = require('framer-motion');


// Animation variants

const cards = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.1
        }
    }
}
// la propiedad layout ayuda al resize de un div cuando se remueven elementos

export default function Cart() {

    const user = useUser();
    const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);

    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();

    const hideCart = () => {
        dispatch(cartActions.setCart(false));
    }

    const purchase = async () => {
        setLoading(true);
        if (!user.user) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            dispatch(cartActions.emptyCart());
            toast.success('Thank you for your purchase!');
            return;
        }
        
        try {
        
            const res = await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    userId: getUserId(user.user), 
                    items,
                    totalPrice,
                    totalQuantity
                })
            })

            const data = await res.json();

            if (!data.success) {
                console.log('mostrat modal de error');
            }

            dispatch(cartActions.emptyCart());
            toast.success('Thank you for your purchase!');

        } catch(error) {
            console.log('Transaction failed', error);
        }
        setLoading(false);
    }

    return (
        <motion.section 
            className={styles.container}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{opacity: 0}}
            onClick={hideCart}>
            <motion.div 
                className={styles.content}
                initial={{x: '50%'}}
                animate={{x: '0%'}}
                transition={{type: 'tween'}}
                exit={{x: '50%'}}
                onClick={(e) => e.stopPropagation()}>
                    {
                        !items.length
                        &&
                        <motion.div
                            className={styles.emptyContent}
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: 0.2}}
                        >
                            <div>
                                <span>You have more shopping to do!</span>
                                <FaShoppingCart />
                            </div>
                        </motion.div>
                    }
                <motion.div 
                    className={styles.cardsContainer}
                    layout variants={cards} 
                    initial="hidden" 
                    animate="show"
                >
                    {
                        items.length >= 1
                        &&
                        items.map((item, index) => {
                            return <CartCard key={index} item={item}/>
                        })
                    }
                </motion.div>
                {
                    items.length >= 1
                    &&
                    <div className={styles.bottomContent}>
                        <div className={styles.totalPriceContainer}>
                            <span>Total:</span>
                            <span>${totalPrice}</span>
                        </div>
                        <button onClick={purchase}>{ loading ? 'Processing...' : 'PURCHASE'}</button>
                    </div>
                }
            </motion.div>
        </motion.section>
    )
}