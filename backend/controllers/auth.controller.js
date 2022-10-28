const User = require('../models/user.model')
const Investor = require('../models/investor.model')
const Seeker = require('../models/seeker.model')
const License = require('../models/license.model')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

exports.registerUser = (req, res) => {
    const {email,name,password,userType,address,license,eth} = req.body

    console.log(req.body)
    User.exists({email})
        .then((result)=>{
            if(result){
                console.log(result)
                res.status(400).json({
                    message: 'User Already exists !'
                })
            }else{


                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash( password, salt, function(err, hash) {
                        if(err){
                            console.log(err)
                        }
                        
                        // userType = Number(userType)
                        let session = nanoid()
                        let user = new User({
                            name,
                            email,
                            password: hash,
                            session : '0',
                            userType,
                            eth
                        })

                        let userID = mongoose.Types.ObjectId(user.id);
                        if(userType==1){

                            let newSeeker = new Seeker({
                                user : userID,
                                address,
                                license,
                                isVerified : false,
                                stage : 0,
                                eth
                            })
                            newSeeker.save()
                            user.save()

                            res.json({
                                message: 'Registered successfully !',
                                user,
                                newSeeker
                            })
                            

                            // 
                        }else{
                            let newInvestor = new Investor({
                                user : userID,
                                transactions : []
                            })
                            newInvestor.save()
                            user.save()

                            res.json({
                                message: 'Registered successfully !',
                            })
                        }
                        
                        
                    });
                });


            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : err
            })
        });
}

exports.loginUser = (req, res) => {
    let {email,password} = req.body
    User.findOne({email})
        .then((result)=>{
            if(!result){
                res.status(404).json({
                    message: "User Does not Exist !"
                })
            }else{
                bcrypt.compare(password, result.password, (err,comResult) => {
                    if(err){
                        console.log(err)
                        res.status(500)
                    }else{
                        if(comResult){

                            let session = nanoid()
                            result.session = session
                            result.save()
                            
                            User.findOne({email})
                                .select('-password')
                                .then(userResult => {

                                    console.log(userResult);
                                    res.json({
                                        message: "User logged in successfully !",
                                        user : userResult
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    //send server error response !!
                                })
                            
                        }else{
                            res.status(401).json({
                                message: "Invalid credentials !"
                            })
                        }
                    }
                } )
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.logoutUser = (req, res) => {
    let { email } = req.body

    User.findOne({email})
        .then((result) => {
            if(!result){
                res.status(400).json({
                    message: "Bad request !"
                })
            }else{
                result.session = '0'
                result.save()

                res.json({
                    message: "User logged out successfully !"
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })

}

exports.createLicense = (req, res) => {
    const {license} = req.body
    License.find({license})
        .then(result => {
            if(result.length!=0){
                res.status(400).json({
                    message : 'license already exists'
                })
            }else{
                let newLicense = new License({
                    license
                })
                newLicense.save()
            
                res.json({
                    message : 'license added ',
                    newLicense
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        })

}