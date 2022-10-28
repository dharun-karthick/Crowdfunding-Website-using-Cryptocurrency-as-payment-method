import React, { useEffect, useState } from 'react'
import styles from './card.module.css';
import {Bullseye, CashCoin, GeoAlt, Building, ArrowRight} from 'react-bootstrap-icons'
import config from '../../config'

import APIService from '../../api.service'
import { Redirect } from 'react-router';

function Card(props) {

    const [toProject,setToProject] = useState(false);

    const goToProject = (he) => {
        setToProject(true)
    }

    console.log(props);

    return (
        <>
            <div onClick={goToProject} className={styles.card_body}>
            {toProject ? <Redirect to={`/project/${props.props._id}`}/> : <></>}
            <img alt='card_pic' className={styles.card_img} src={props.props.image!='0' ? `${config.BASE_URL}user/seeker/${props.props.image}` : `images/6.jpg`} ></img>
            <div className={styles.card_content}>
                <div className={styles.card_content_ind}> <Building className={styles.card_icon} /> {props.props.name}</div>
                <div className={styles.card_content_ind}> <GeoAlt className={styles.card_icon} /> {props.props.address} </div>
                <div className={styles.card_content_ind}> <CashCoin className={styles.card_icon} /> {props.props.deposit} </div>
                <div className={styles.card_content_ind}> <Bullseye className={styles.card_icon} /> {props.props.totalRequiredTokens}</div>
            </div>
            </div>
        </>
    )
}

export default Card