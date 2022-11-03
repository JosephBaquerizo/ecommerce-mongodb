import styles from './productItem.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductItem({ info }) {

    /* 
        No tengo acceso al path actual para hacer un push al view de productos.
        Puedo usar router.asPath para acceder a dicho path. La documentacion de
        NextJS menciona que hay que esperar hasta tener el parameter de isReady
        en true con un useEffect para poder obtener el path respectivamente.
    */

    const router = useRouter();
    const pathReady = router.isReady;
    
    const [currentPath, setCurrentPath] = useState('');

    const { _id, name, imageURL, price } = info;

    const pushToProductView = () => {
        if (currentPath) {
            router.push(currentPath);
        }
    }

    useEffect(() => {
        if (pathReady) {
            setCurrentPath(current => router.asPath + `/${_id}`);
        }
    }, [pathReady])

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.hiddenContent}>
                    <button onClick={pushToProductView}>QUICK VIEW</button>
                </div>
                <img src={imageURL} />
            </div>
            <div className={styles.infoContainer}>
                <span className={styles.name}>{name}</span>
                <span className={styles.price}>${price}</span>
            </div>
        </div>
    )
}