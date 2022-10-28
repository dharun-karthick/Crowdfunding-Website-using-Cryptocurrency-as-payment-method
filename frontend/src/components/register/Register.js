import React, { useState} from 'react'
import { Redirect } from 'react-router';

import ApiService from '../../api.service'

import styles from './register.module.css'

function Register() {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [name,setName] = useState('');
    const [eth,setEth] = useState('');
    const [address,setAddress] = useState('');
    const [type,setType] = useState(1);
    const [registerComplete,setRegisterComplete] = useState(false);

    const handleEmail = (event) =>{
        setEmail(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) =>{
        setConfirmPassword(event.target.value);
    }

    const handleName = (event) =>{
        setName(event.target.value);
    }

    const handleAddress = (event) =>{
        setAddress(event.target.value);
    }

    const handleEth = (event) =>{
        setEth(event.target.value);
    }

    const handleType = (event) =>{
        setType(event.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        if(password==confirmPassword){
            var res = await ApiService.registerAsSeeker(email,password,name,type,address,eth);
            if(res.status==200){
                setRegisterComplete(true);
            }
        }
    }

    if(registerComplete){
        return (<Redirect to='/login'/>)
    }

    return (
        <div className={styles.register_body}>
            <div style={{display: "inline-block",width: '40%',height: '100%'}}>
                <img className={styles.register_vector} src="images/login1.png" alt="" />
            </div>
            <div style={{display: "inline-block",position:'relative',top:'-10%',marginLeft:'50px'}}>
            <form onSubmit={submit}>
                <h1>Register</h1>
                <p>Email &nbsp; &nbsp; <input required value={email} onChange={handleEmail} type="email" placeholder="email" /></p>
                <p>Password &nbsp; &nbsp;<input required value={password} onChange={handlePassword} type="password" placeholder="password" /></p>
                <p>Confirm Password &nbsp; &nbsp;<input required value={confirmPassword} onChange={handleConfirmPassword} type="password" placeholder="confirm-password" /></p>
                <p>Name &nbsp; &nbsp;<input required value={name} onChange={handleName} type="text" placeholder="name" /></p>
                <p>ETH address &nbsp; &nbsp;<input required value={eth} onChange={handleEth} type="text" placeholder="eth" /></p>
                <p>User type &nbsp; &nbsp;<select defaultValue={type} onChange={handleType} name="" id="">
                    <option value="1">Seeker</option>
                    <option value="0">Investor</option>
                </select>
                </p>
                <p>Address &nbsp; &nbsp; <textarea required value={address} cols="30" rows="5" onChange={handleAddress} placeholder="Address" /></p>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Register
