import React, { useState,useEffect} from 'react'
import Web3 from 'web3'
import $ from 'jquery'
import {useSelector} from 'react-redux'
import TruffleContract from '@truffle/contract'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



function SeekerPage(props) {
    const userState = useSelector(state => state.user);
    console.log(props.user)
    const seekerAcc = props.project.project.eth;//Change default value
    const projectNo = 0;//Change the Project number as variable!!!!!!!!!!!
    // const totalRequiredTokens = 10000;//Change this also
    let tokenPrice= 1000000000000000;
    const [open,setOpen] = useState(false)
    const [openMsg,setOpenMsg] = useState(false)
    const [type,setType] = useState('');
    const [message,setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenMsg(false);
      };

    const sanctionedDate = props.project.project.sanctionedDate;//Change this

    const web3 = new Web3("http://localhost:7545")
    const loadbc = async (event)=>{
        window.accounts = await web3.eth.getAccounts();
        connectToContract();
        console.log(window.accounts[0])
    }
    const connectToContract = async()=>{
        $.getJSON('/Token.json',(token)=>{
            window.tokenInst = TruffleContract(token)
            console.log("Amaan ba")
            console.log(window.tokenInst)
            window.tokenInst.setProvider("http://localhost:7545")
            window.tokenInst.deployed().then(async(token)=>{
                window.TokenInstance = token
                console.log('Token address is:'+token.address)
                console.log("Seeker account: "+seekerAcc)
                window.totalRequiredTokens = await window.TokenInstance.totalrequired(seekerAcc,projectNo)
                console.log("Initial call: "+window.totalRequiredTokens)
            })
        })
    }

    //Sets the required amount of tokens for project
    const setRequired = async()=>{
        window.tokenInst.deployed().then(async(token)=>{
            const required_tokens = $('#setRequired').val()
           await token.setRequired(seekerAcc,projectNo,required_tokens,{
               from: seekerAcc
               
           })
            const numbertest = await token.required(seekerAcc,projectNo);

            console.log("set number is: "+numbertest)
        
    })
}

    const returnMoney = async()=>{
        console.log("Token isnsyasgyas")
        console.log(window.tokenInst)
        window.tokenInst.deployed().then(async(token)=>{
            window.TokenInstance = token;

            //Logic to calculate token price at the end of return
            let dateNow = Date.now()
            console.log(typeof sanctionedDate)
            let timeElapsed = dateNow-sanctionedDate;//Change
            let diffDays = Math.ceil(timeElapsed / (1000 * 60 * 60 * 24)); 

            tokenPrice = tokenPrice + (diffDays*6881310000000); //1 rupee equivalent
            console.log("tpp ttejoig")
            console.log(typeof diffDays)
            
            let amount_to_return = Number(window.totalRequiredTokens) * tokenPrice
            console.log("amoutn ttejoig")
            console.log("Tokes is: "+window.totalRequiredTokens)
            token.payToSmartContract.sendTransaction({
                    from: seekerAcc,
                    to: token.address,
                    value: amount_to_return
                }).then(async()=>{
                    console.log("")
                    let length;
                    let investorsAcc = [];
                    length = await window.TokenInstance.returnRegisterLength.call(seekerAcc,projectNo);
                    for(let i=0;i<length;i++){
                       let investorFromRegister = await window.TokenInstance.investorsRegister(seekerAcc,projectNo,i);
                       investorsAcc.push(investorFromRegister);
                    }

                    //Filters and gives unique addresses
                    let uniqueInvestors = [...new Set(investorsAcc)];
                    console.log(uniqueInvestors)
                    for(let j=0;j<uniqueInvestors.length;j++){
                        let valueContributed = await window.TokenInstance.purchased(seekerAcc,projectNo,uniqueInvestors[j])
                        await window.TokenInstance.payToSeeker(uniqueInvestors[j],Number(valueContributed),{
                            from: uniqueInvestors[j]
                        })
                        await window.TokenInstance.makeZero.call(uniqueInvestors[j],seekerAcc,projectNo)
                    }                    
                })
            
        })
        setType('success')
        setMessage('Money returned back to the investors');
        setOpenMsg(true);
    }

    useEffect(loadbc,[])
    return(
        <div style={{float: 'right',marginTop:'10px'}}>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Seeker
            </Button>
                 <Dialog
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                
                >
            <DialogTitle>Seeker</DialogTitle>

            
            <DialogContent dividers={'paper'}>
            <p>
            <div>
            <img style={{height:"260px",width:"260px",float:"left",marginLeft:"140px"}} src={"https://www.reuters.com/resizer/aNcj2Z2FOLjaOBlN8TCOLeF18Hs=/960x0/cloudfront-us-east-2.images.arcpublishing.com/reuters/QFS5CLPP3BNR3HJ2YF3DZRLVRA.jpg"}/>
            <p style={{fontSize: '20px',float:"right"}}>Hi {props.user.user.name}, this is your portal to return money back to your investors after the covid wave is over. To return it back to investors along with a certain interest, click <b>Return</b></p>
            
            <Button style={{fontSize: '14px',marginLeft: '230px',backgroundColor:'green',float:"left"}} variant="contained" color="secondary" id="returnMoney" onClick={returnMoney}>Return</Button>
            </div>
            </p>
            </DialogContent>
            <DialogActions>
            <Button negative onClick={() => setOpen(false)}>
            Cancel
            </Button>
            </DialogActions>
            </Dialog>
            <Snackbar open={openMsg} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
            </div>
        
    )
}

export default SeekerPage