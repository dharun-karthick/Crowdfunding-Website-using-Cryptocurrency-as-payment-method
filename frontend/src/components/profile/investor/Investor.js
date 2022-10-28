import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './seeker.module.css'

import APIService from '../../../api.service'
import {setUserState} from '../../../actions/user'
import { useDispatch } from 'react-redux';
import projectCard from './projectCard'
import config from '../../../config'

function Investor(props){
    const user = useSelector(state => state.user);

    const initialise = async()=>{
        const projects = await APIService.getProjects(user.user.id);
    }

    useEffect(initialise,[]);
    
    
    return(
        <div>
            <projectCard key={1}/>
            <projectCard key={2}/>
            <projectCard key={3}/>
            <projectCard key={4}/>
            <projectCard key={5}/>
            
        </div>
    )

}

export default Investor
