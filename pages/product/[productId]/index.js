import styles from '../../../styles/Home.module.css';
import ProductArray from '../../../components/productArray/productArray';
import createProductSchema from '../../../models/Product';
import conectarDB from '../../../lib/connectDB';

export default function ProductPage({ products, productType }) {

    if (!products) {
        return <h3>Not found products</h3>
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.title}>
                    <span>{productType}</span>
                </div>
                <ProductArray products={products} productType={productType} />
            </main>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    try {
        // conectarse a la base de datos y devolver los productos del param
        await conectarDB();

        const productType = params.productId;

        const ProductSchema = createProductSchema(productType);

        const res = await ProductSchema.find({});
    
        const products = res.map( item => {
            const product = item.toObject();
            product._id = `${product._id}`;
            return product;
        })

        return { props: { products, productType}}
        
    } catch(error) {
        console.log(error);
        return { props: {}}
    }
}