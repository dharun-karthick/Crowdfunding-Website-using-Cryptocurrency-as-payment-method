import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import styles from './profile.module.css'
import ProfileCard from './profilecard/ProfileCard'
import Seeker from './seeker/Seeker'

function Profile() {

    const dispatch = useDispatch();

    var user = useSelector(state => state.user);
    user = user.data;
    console.log(user);
    return (
        <div className={styles.profile_body}>
            <ProfileCard />
            {(user.user.userType==1)? <Seeker data={user}/> : (null)}
        </div>
    )
}

export default Profile