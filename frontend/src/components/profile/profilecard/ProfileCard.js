import React from 'react'
import { useSelector } from 'react-redux'
import styles from './profileCard.module.css'

function ProfileCard() {
    
    var user = useSelector(state => state.user);
    // console.log(user);
    user = user.data;
    return (
        <div className={styles.prcard_box}>
            <table>
            <tbody>
            <tr key="main_row" className={styles.prcard_img_box}>
                <td key='img'>
                    <img src="images/default.jpg" className={styles.prcard_img} alt="" />
                </td>
                <td key='details'>
                    <tr key='name'>
                        <h1>Name: {user.user.name}</h1>
                    </tr>
                    <tr key='email'>
                        <h4>Email: &nbsp; {user.user.email}</h4>
                    </tr>
                    <tr key='type'>
                        <h4>Type: &nbsp; {user.user.userType==1 ? "Seeker" : "Investor"}</h4>
                    </tr>
                    {(user.user.userType==1)?(
                        <tr key='currentStage'>
                        <h4>Current stage: &nbsp;{user.seeker.stage==5 ? "Verified" : "Not Verified"}</h4>
                    </tr>
                    ):(null)
                    }
                </td>
            </tr>
            </tbody>
            </table>
        </div>
    )
}

export default ProfileCard
