const Investor = require('../models/investor.model')
const Project = require('../models/project.model')


exports.fetchDetails = (req, res) => {
    let investor = req.params.investor
    Investor
        .findOne({user:investor})
        .then(async(resultUser)=>{

            if(resultUser){
                console.log(resultUser)
                var uniqueProjectIds = [...new Set(resultUser.projectIds)];
                var projects  = [];
                for(var i=0 ; i<uniqueProjectIds.length;i++){
                    await Project
                        .findById(uniqueProjectIds[i])
                        .then((res)=>{
                            projects.push(res);
                        })
                }
                res.json({
                    message : 'fetch successful !',
                    investor : projects
                })  
  
            }else{
                res.status(404).json({
                    message : 'investor not found !'
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : 'something went wrong'
            })
        })
}

exports.addTransaction = (req, res) => {

    //investor is user id
    let {investor,eth} = req.body
    Investor
        .findOne({user:investor})
        .then((resultUser)=>{
            if(resultUser){
                Project
                    .findOne({eth: eth})
                    .then((res)=>{
                        resultUser.projectIds.push(res._id);
                        resultUser.save()
                        res.json({
                            message : 'updated transaction !'
                        })
                    })
                
            }else{
                res.status(404).json({
                    message : 'investor not found !'
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : 'something went wrong'
            })
        })
}