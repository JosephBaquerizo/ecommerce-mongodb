import styles from '../../../styles/ProductView.module.css';
import createProductSchema from '../../../models/Product';
import conectarDB from '../../../lib/connectDB';
import { cartActions } from '../../../store/slices/cartSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from 'react-icons/md';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductView({ success, error, product }) {

    const { name, description, imageURL, price } = product;

    const [ qty, setQty ] = useState(1);
    const dispatch = useDispatch();

    const decrease = () => {
        if (qty === 1 ) return;
        setQty(current => current - 1);
    }

    const increase = () => {
        setQty(current => current + 1);
    }

    // data = { product, qty }
    const addItem = () => {
        dispatch(cartActions.addItem({product, qty}));
    }

    const notify = () => {
        const nameArray = name.split(' ');
        const capitalizedArray = nameArray.map((item) => {
            return item.charAt(0).toUpperCase() + item.slice(1);
        })
        const uppercaseName = capitalizedArray.join(' ');
        toast.success(`${uppercaseName} added to your cart`, { duration: 2000});
    }

    if (!success) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <span>Algo ha salido mal...</span>
                </main>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.centralContainer}>
                    <div className={styles.image}>
                        <Image 
                            fill
                            alt={name} 
                            src={imageURL}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <span className={styles.title}>{name}</span>
                        <span className={styles.description}>{description}</span>
                        <span className={styles.price}>Price: ${price}</span>
                        <div className={styles.addRemoveContainer}>
                            <div className={styles.auxiliarWidth}>
                                <MdOutlineRemoveCircle className={styles.operation} onClick={decrease} />
                            </div>
                            <div className={styles.auxiliarWidth}>
                                <span className={styles.qty}>{qty}</span>
                            </div>
                            <div className={styles.auxiliarWidth}>
                                <MdOutlineAddCircle className={styles.operation} onClick={increase} />
                            </div>
                        </div>
                        <button onClick={() => {
                                            addItem();
                                            notify();
                                        }}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    try {

        await conectarDB();

        const productId = params.productId;
        const id = params.id;

        const ProductSchema = createProductSchema(productId);

        let product = await ProductSchema.findById(id).lean();
        
        product._id = `${product._id}`;

        if (!product) {
			return { props: {success: false, error: 'producto no encontrado'}};
		}

        return { props: { success: true, product }};

    } catch(error) {
        if (error.kind === 'ObjectId') {
			return { props: { success: false, error: 'id no  valido'}};
		}
		return { props: { success: false, error}};
    }
}