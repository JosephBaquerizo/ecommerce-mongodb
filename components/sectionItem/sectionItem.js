import styles from './sectionItem.module.css';
import Image from 'next/image';
import Link from 'next/link';

const imageStyle = {
    height: "auto",
    width: "50px"
}

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
                <Image
                    fill
                    alt=""
                    src={imageURL} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>
        </Link>
    )
}