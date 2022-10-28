import React, {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import styles from './login.module.css'
import ApiService from '../../api.service'

import {setUserState} from '../../actions/user'

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const user = useSelector(state => state.user);
    const isLoggedIn = (user.session==='') ? false : true ;
    const dispatch = useDispatch();
    const handleEmail = (event) =>{
        setEmail(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const submit = async () => {
        var res = await ApiService.login(email,password);
        console.log(res);
        if(res.status===200){
            console.log(res.data);
            var res2 = await ApiService.getUser(res.data.user._id);
            if(res2.status===200){
                console.log(res2);
                dispatch(setUserState(res2));
            }
        }
    }
    
    if(isLoggedIn){
        return (<Redirect to='/' />);
    }

    return (
        <div className={styles.login_body}>
            <div className={styles.login_png_box}>
                <img src="images/login1.png" className={styles.login_png} alt="" />
            </div>
            <div className={styles.login_form_box}>
                <div className={styles.login_form_content}>
                    <h1 className={styles.login_text1}>Welcome back!</h1>
                    <h4 className={styles.login_text2}>Lorem ipsum dolor sit amet consectetur. quos tenetur molestias vel nostrum natus eos suscipit placeat!</h4>
                    <div className={styles.login_input}>
                        <div className={styles.login_input_box}>
                            <img src="images/mail.png" className={styles.login_icons} alt="" />
                            <input onChange={handleEmail} value={email} type="email" className={styles.login_email} name="" id="" />
                        </div>
                        <div className={styles.login_input_box}>
                            <img src="images/pass5.png" className={styles.login_icons} alt="" />
                            <input onChange={handlePassword} value={password} type="password" className={styles.login_email} name="" id="" />
                        </div>
                    </div>
                    <div>
                        <button onClick={submit} className={styles.login_btn}>
                            Login
                        </button>
                    </div>
                    <div className={styles.login_links}>
                        <Link to='/forgot'>
                            forgot password?
                        </Link>
                        <Link style={{float: 'right', marginRight: '40px'}} to='/register'>
                            Register here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
