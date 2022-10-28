import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import styles from './navbar.module.css';

import {logoutUser} from '../../actions/user'

function Navbar() {
    const dispatch = useDispatch();
    const userState=useSelector(state => state.user);
    const isLoggedIn = (userState.session==='') ? false : true ;

    const logout = () => {
        dispatch(logoutUser());   
    }

    return (
        <div className={styles.navbar_body}>
            <div className={styles.navbar_content}>
                <div className={styles.navbar_ele}>
                    <Link to="/">
                        Covid-hack
                    </Link>
                </div>

                {
                    isLoggedIn ? 
                    (<div onClick={logout} className={`${styles.navbar_ele} ${styles.nav_right}`}>
                        Logout
                    </div>) 
                    : <></> 
                }

                <div className={`${styles.navbar_ele} ${styles.nav_right}`}>
                {   
                    isLoggedIn ? (<Link to="/profile">Profile</Link>) 
                    : (
                        <Link className={styles.nav_pointer} to="/login">
                            <button className={styles.navbar_btn}>
                                Login/Register
                            </button>
                       </Link>
                      )
                }
                </div>
                <div className={`${styles.navbar_ele} ${styles.nav_right}`}>
                    Need oxygen?
                </div>
                <div className={`${styles.navbar_ele} ${styles.nav_right}`}>
                    Contact us
                </div>
            </div>
        </div>
    )
}

export default Navbar
