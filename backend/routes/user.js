import express from "express"
import jwt from "jsonwebtoken"
import sgMail from "@sendgrid/mail"
import dotenv from "dotenv";
import bcrypt from "bcrypt"

//for file upload
import multer from 'multer';

//importing mongoose models
import User from "../models/user.js";
import userInfo from "../models/userInfo.js"

//import middleware for verification
import auth_user from "../http/middleware/auth_user.js"
import email_verify from "../http/middleware/email_verify.js"
import access_user_info from "../http/middleware/access_user_info.js"

const router = express.Router()



dotenv.config();

//for email verification using mailgun
sgMail.setApiKey(process.env.apiKey)


//file upload configuration

//more detailed way of storing file 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename : function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now()+"." + file.mimetype.split("/")[1])  //error
    }
});

//filtering the file
const fileFilter = (req, file, cb) => {
    //accept a file
    console.log(file)
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true); // save it
    }
    else{
        cb(new Error('filetype is not allowed'), false); //reject it
    }
}

const upload = multer({
    storage:storage, 
    limits:{
    fileSize: 1024*1025*5
    },
    fileFilter:fileFilter,

})




//storing pdf file
const storage1 = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'documents/')
    },
    filename : function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now()+"." + file.mimetype.split("/")[1])  //error
    }
});

//filtering the file
const fileFilter1 = (req, file, cb) => {
    //accept a file
    console.log(file)
    if(file.mimetype === 'application/pdf'){
        cb(null, true); // save it
    }
    else{
        cb(new Error('filetype is not allowed'), false); //reject it
    }
}

const upload1 = multer({
    storage:storage1, 
    limits:{
    fileSize: 1024*1025*5
    },
    fileFilter:fileFilter1,

})


router.post('/signup', (req, res) => {
    const user = new User(req.body)
    console.log()
    //checking for weak passwords
    try{
    user.passwordcheck(user.password); 
    }

    catch(error){
        res.status('400').json({message:'password is too easy'})
    }


    User.find({email:req.body.email})
    .exec() //it will return an promise
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({message:"user already exists"})
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    
                    return res.status(500).json({
                        error: err
                        });
                    }
                    
                    else{
                        
                        //we are sending the jwt token with hashed password
                        const token = jwt.sign({email:req.body.email,password:hash, username:req.body.username, role:req.body.role}, "yourmsgsecretkey", {expiresIn: '10min'})
            

                        const msg = {
                            to: req.body.email, // Change to your recipient
                            from: process.env.my_email, // Change to your verified sender
                            subject: 'Sending with SendGrid is Fun',
                            text: 'and easy to do anywhere, even with Node.js',
                            html: `
                            <h2>Hello this is from food management system, Please click on given link to activate your account</h2>
                            <p>http://localhost:5000/user/authentication/activate/${token}</p>
                            `,
                        }

                        sgMail
                        .send(msg)
                        .then(() => {
                            return res.status(200).send({message: "email has been to your account"})
                        })
                        .catch((error) => {
                            return res.status(500).json({error: error.message})
                        })
                                        
                    }
            })
                
        
        }
    })

    // user.save()
    // .then((result) =>res.status(200).json({message:'saved successfully'}))
    // .catch(err => console.log(err.message))
    


    
})

router.post('/signupogn', upload1.single("myfile"),  (req, res) => {
    const user = new User(req.body)
    
    //checking for weak passwords
    try{
    user.passwordcheck(user.password); 
    }

    catch(error){
        res.status('400').json({message:'password is too easy'})
    }


    User.find({email:req.body.email})
    .exec() //it will return an promise
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({message:"user already exists"})
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    console.log("govind")
                    return res.status(500).json({
                        message: err.message
                        });
                    }
                    
                    else{
                        
                        //we are sending the jwt token with hashed password
                        const token = jwt.sign({email:req.body.email,password:hash, username:req.body.username, role:req.body.role, filename:req.file.filename}, "yourmsgsecretkey", {expiresIn: '10min'})
            
                        
                        const msg = {
                            to: req.body.email, // Change to your recipient
                            from: process.env.my_email, // Change to your verified sender
                            subject: 'Sending with SendGrid is Fun',
                            text: 'and easy to do anywhere, even with Node.js',
                            html: `
                            <h2>Hello this is from food management system, Please click on given link to activate your account</h2>
                            <p>http://localhost:5000/user/authentication/activate/${token}</p>
                            `,
                        }

                        sgMail
                        .send(msg)
                        .then(() => {
                            return res.status(200).send({message: "email has been to your account"})
                        })
                        .catch((error) => {
                            return res.status(500).json({error: error.message})
                        })
                                        
                    }
            })
                
        
        }
    })

    // user.save()
    // .then((result) =>res.status(200).json({message:'saved successfully'}))
    // .catch(err => console.log(err.message))
    


    
})

router.get("/user_info", access_user_info, (req, res) => {
    res.send(req.user)

})


router.post("/user_info",access_user_info, upload.single('myfile'), (req, res) => {
    const user = req.user;
    
    req.user.name = req.body.name
    req.user.about = req.body.about
    req.user.state = req.body.state
    req.user.city = req.body.city
    req.user.address = req.body.address

    if(req.file)
        req.user.selectedFile = req.file.path

    // console.log("govind", req.body)

    user.save()
    .then(() => res.status(200).send({message:"updated successfully"}))
    .catch((err) => res.status(200).send({message:err.message}))
})

router.get("/all_user",  async (req, res) => {
    try{
        const user = await User.find();
        res.status(200).json(user)
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
})


router.get('/authentication/activate/:token', email_verify, (req, res) => {
    console.log(req.userData)
    User.find({email:req.userData.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(200).json({message:'verified successfully'})
        }
        else{
            
            const user = new User(req.userData)

            user.save()
            .then((result) => {
                //saving user info also
                let userinfo;
                if(req.userData.filename){
                    userinfo = new userInfo({_id:user._id, email:user.email, role:"ogn", document:req.userData.filename})
                }
                else{
                    userinfo =  new userInfo({_id:user._id, email:user.email, role:req.userData.role})
                }

                userinfo.save()
                .then((result) => res.status(200).json({message:'updated successfully'}))
                .catch(err =>  res.status(409).json({"message": "err.message"}))
            })
            
            .catch(err => res.status(409).json({"message": err.message}))
        }
    })
    .catch(err => res.status(500).json({"message": err.message}))

    
})

router.post('/update-password/:token',email_verify, async(req, res) => {

    //it will recieve password from react
    try{  
    let user = await User.find({email: req.userData.email})
    console.log(user)
    bcrypt.hash(req.body.password, 10).then(hash => {
        console.log(hash)
        User.findByIdAndUpdate(user[0]._id, {password:hash})
        .then(() =>  res.json({message:'password updated'}))
        .catch(err => res.json({message: err}))

        
    })
    }
    catch(err){
        res.status(500).json({"message": err.message})
    }

})



router.post('/login', async (req, res) => {
    try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    
    const token = await user.generateAuthToken()
    res.status(200).send({token})
    }

    
    catch(err){
        res.status(409).send({message:err.message})
    }
    
})

// router.post('/logout', auth_user, async (req, res) => {
    
//     try{
//     req.user.tokens = req.user.tokens.filter((token) => {
//         return token !== req.token})
//         await req.user.save();
//         res.status(200).json({message:"logout success"})
//     }
//     catch(e){
//         res.status(500).json({message:e.message})
//     }


// })


router.post('/forgot-pwd', async (req, res) => {

    try{
        const user = await User.find({email:req.body.email})
    
        if(user.length >= 1){
        const token = jwt.sign({email:user[0].email, _id:user[0]._id.toString()}, "yourmsgsecretkey", {expiresIn: '10min'})
            
        //here i will send the react-link for update page while submitting that link it will take help of nodejs update pwd link
        const msg = {
                    to: req.body.email, // Change to your recipient
                    from: process.env.my_email, // Change to your verified sender
                    subject: 'Forgot password link',
                    html: `
                    <h2>Hello this is from food management system, Please click on given link to update your password</h2>
                    
                    <p>http://localhost:3000/forgot/${token}</p>
                    `,
                }

        sgMail.send(msg)
                .then(() => {
                        return res.status(200).json({message:"an email has been sented to your account"})
                    })
                .catch((error) => {
                    return res.status(500).json({message:error.message})
                })
        }
        else{
            res.status(200).json({message: 'an email has been sented to your account'})
        }

    }
    catch(err){
        res.status(500).json({message: 'server error'})
    }

})




export default router;