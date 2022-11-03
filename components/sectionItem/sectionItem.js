import styles from './sectionItem.module.css';
import Link from 'next/link';

export default function SectionItem({ info }) {

    const { name, imageURL } = info;

    return (
        <Link href={`/product/${name}`} className={styles.resSize}>
            <div className={styles.container}>
                <div className={styles.hiddenContent}>
                </div>
                <div className={styles.titleContainer}>
                    <span>{name}</span>
                </div>
                <img src={imageURL}/>
            </div>
        </Link>
    )
}