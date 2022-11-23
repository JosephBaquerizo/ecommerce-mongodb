import styles from './reviewItem.module.css';

export default function ReviewItem({ item }) {

    const { description, quantity, amount_total } = item;

    return (
        <div className={styles.container}>
            <div className={styles.columnItem}>
                <div className={styles.widthParameterContainer}>
                    <span className={styles.parameter}>Name</span>
                </div>
                <div className={styles.widthContainer}>
                    <span className={styles.itemName}>{description}</span>
                </div>
            </div>
            <div className={styles.columnItem}>
                <div className={styles.widthParameterContainer}>
                    <span className={styles.parameter}>Quantity</span>
                </div>
                <div className={styles.widthContainer}>
                    <span>{quantity}</span>
                </div>
            </div>
            <div className={styles.columnItem}>
                <div className={styles.widthParameterContainer}>
                    <span className={styles.parameter}>Price</span>
                    </div>
                <div className={styles.widthContainer}>
                    <span>{amount_total/100}$</span>
                </div>
            </div>
        </div>
    )
}