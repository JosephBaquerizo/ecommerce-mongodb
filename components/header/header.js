import styles from './header.module.css';
import Link from 'next/link';
import Cart from '../cart/cart';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useUser } from '@auth0/nextjs-auth0';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/slices/cartSlice';
import { useRouter } from 'next/router';
import { getUserId } from '../../lib/helpers';
const { AnimatePresence, motion } = require('framer-motion');

export default function Header() {

    const router = useRouter();

    const { user } = useUser();

    const cartActive = useSelector((state) => state.cart.active);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const dispatch = useDispatch();

    const showCart = () => {
        dispatch(cartActions.setCart(true));
    }

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <Link href='/'>
                    <span className={styles.logo}>AUTHENTIC.</span>
                </Link>
                <div className={styles.rightContent}>
                    {
                        user
                        ?
                        <div className={styles.profile} onClick={() => router.push(`/profile/${getUserId(user)}`)}>
                            <img
                                alt={user.given_name}
                                src={user.picture} 
                            />
                        </div>
                        :
                        <button onClick={() => router.push('/api/auth/login')}>LOGIN</button>
                    }
                    <div className={styles.cartContainer}>
                        {  
                            totalQuantity > 0 
                            && 
                            <motion.span 
                                animate={{scale: 1}} 
                                initial={{scale: 0}}>
                                    {totalQuantity}
                            </motion.span>
                        }
                        <AiOutlineShoppingCart className={styles.icon} onClick={showCart} />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    cartActive && <Cart />
                }
            </AnimatePresence>
        </section>
    )
}