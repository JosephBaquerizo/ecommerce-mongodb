import styles from './sectionArray.module.css';
import SectionItem from '../sectionItem/sectionItem';

export default function SectionArray({ sections }) {
    return (
        <div className={styles.container}>
            {
                sections.map((item, index) => {
                    return <SectionItem key={index} info={item} />
                })
            }
        </div>
    )
}