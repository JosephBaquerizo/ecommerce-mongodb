import styles from './productArray.module.css';
import ProductItem from '../productItem/productItem';

export default function ProductArray({ products }) {
    return (
        <div className={styles.container}>
            {
                products.map((item, index) => {
                    return <ProductItem key={index} info={item} />
                })
            }
        </div>
    )
}