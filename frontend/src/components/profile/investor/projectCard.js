import styles from './card.module.css';
import {Bullseye, CashCoin, GeoAlt, Building, ArrowRight} from 'react-bootstrap-icons'

function projectCard(props){
    return(
        <div className={styles.card_content}>
                <div className={styles.card_content_ind}> <Building className={styles.card_icon} /> Project name: </div>
                <div className={styles.card_content_ind}> <GeoAlt className={styles.card_icon} /> Transaction amount: </div>
                <div className={styles.card_content_ind}> <CashCoin className={styles.card_icon} /> Seeker Name:  </div>
                <div className={styles.card_content_ind}> <Bullseye className={styles.card_icon} /> Tokens Owned: </div>
            </div>
    )
}

export default projectCard
