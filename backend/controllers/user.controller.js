const User = require('../models/user.model')
const Seeker = require('../models/seeker.model')
const Investor = require('../models/investor.model')

const multer = require('multer')
const path = require('path')
const nanoid = require('nanoid')

exports.getUser = (req, res) => {
    const id = req.params.id
    User
        .findById(id)
        .then((result) => {
            if(result.userType==0){
                Investor
                .findOne({user : id})
                .then((resultUser)=>{
                    res.json({
                        message : 'successful',
                        user : result,
                        investor : resultUser
                    })
                })
            }else{
                Seeker
                .findOne({user : id})
                .then((resultUser) => {
                    console.log(resultUser, result)
                    res.json({
                        message : 'Successful !',
                        user : result,
                        seeker : resultUser
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        message : 'Something went wrong !'
                    })
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message : 'Something went wrong !'
            })
        })
    
}

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
  
//         // Uploads is the Upload_folder_name
//         cb(null, "uploads")
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//     //   cb(null, file.fieldname + "-" + Date.now()+".jpg")
//         cb(null, Date.now()+file.originalname)

//     }
// })

// var upload = multer({ 
//     storage: storage,
//     limits: { },
//     fileFilter: function (req, file, cb){
    
//         // Set the filetypes, it is optional
//         // var filetypes = /jpeg|jpg|png|pdf|docx/;
//         // var mimetype = filetypes.test(file.mimetype);
  
//         // var extname = filetypes.test(path.extname(
//         //             file.originalname).toLowerCase());
        
//         // if (mimetype && extname) {
//         //     return cb(null, true);
//         // }

//         return cb(null, true);
      
//         cb("Error: File upload only supports the "
//                 + "following filetypes - " + filetypes);
//       } 
  
// // mypic is the name of file attribute
// }).single("file");   




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    req.fileData = {}
    req.fileData.name = Date.now() + '-' +file.originalname
    console.log(req.fileData.name);
    cb(null, req.fileData.name )
  }
})

var upload = multer({ storage: storage }).single('file')

exports.upload = upload

exports.uploadTheFile = function(req, res){
     
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        
        let user = req.params.user
        Seeker
            .findOne({user})
            .then((resultUser) => {
                resultUser.stage = resultUser.stage + 1
                let stage = resultUser.stage
                let filePeru = `f${stage}`
                resultUser[filePeru] = req.fileData.name
                resultUser.save()

                res.json({
                    message : 'success'
                })

                // return res.status(200).send(req.file)
            })
            .catch((error) => {
                console.log(error);
                res.send(error)
            })

    })
    
}

// exports.uploadFile = (req, res) => {
//     upload(req, res, (err) => {
//         if(err) res.send(err)

//         else{
//             console.log(req.params.user);
//             res.send('success')
//         }
//     })
// }

exports.renderFile = (req, res) => {
    var fileName = req.params.fileName

    res.sendFile(path.resolve(`uploads/${fileName}`), (err) => {
        if(err) res.send(err)
        else{
            console.log('sent - '+fileName)
        }
    })
}