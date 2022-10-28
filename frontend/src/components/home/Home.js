import React, {useState, useEffect} from 'react'
import styles from './home.module.css'

import Card from '../card/Card'

import axios from 'axios'

import config from '../../config'

function Home() {

    const [project,setProject] = useState([])
    
    useEffect(async ()=>{
        let data = await axios({
            method: 'GET',
            url: config.BASE_URL+'project/all',
            headers: {"Content-Type" : "application/json"},
        })
        console.log(data);
        setProject(data.data.projects)
    }, [])

    console.log(project);

    if(!project){
        return (
            <div>
    
            </div>
        )
    }
    else{
        return (        
            <div className={styles.home_body}>
                <div className={styles.home_need_content}>
                    <div className={`${styles.home_text} ${styles.home_text_first}`}>
                        <div className={styles.home_text1}>Need investment?</div>
                        <div className={styles.home_text2}>For building oxygen plants</div>
                    </div>
                    <div className={styles.home_text}>
                        <img alt='investment_pic' className={styles.home_invest_svg} src="images/noun_invest2.png"></img>
                    </div>
                </div>
                <div className={styles.home_feed_body}>
                    <div className={styles.home_feed_header}>
                        <div className={styles.home_feed_search}>
                            <input placeholder='Search' type="text"/>
                        </div>
                        <div className={styles.home_feed_filter}>
                            <button>Filter</button>
                        </div>
                    </div>
                    <div className={styles.home_feed_content}>
                        <div style={{width:'100%'}} >
                            {project.map((data,i)=>{
                                return (
                                    <Card props={data} imgsrc={1} key={i}/>
                                )
                            })}
                        </div>
                        {/* <div className={styles.home_feed_row}>
                            
                        </div> */}
                        {/* <div className={styles.home_feed_row}>
                            <Card imgsrc="4"/>
                            <Card imgsrc="5"/>
                            <Card imgsrc="1"/>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Home