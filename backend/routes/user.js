import express from "express"
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import sgMail from "@sendgrid/mail"
import dotenv from "dotenv";
import bcrypt from "bcrypt"

//import middleware for verification
import auth_user from "../http/middleware/auth_user.js"
import email_verify from "../http/middleware/email_verify.js"

const router = express.Router()



dotenv.config();

//for email verification using mailgun
sgMail.setApiKey(process.env.apiKey)


router.post('/signup', (req, res) => {
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
                    
                    return res.status(500).json({
                        error: err
                        });
                    }
                    
                    else{
                        
                        //we are sending the jwt token with hashed password
                        const token = jwt.sign({email:req.body.email,password:hash, username:req.body.username}, "yourmsgsecretkey", {expiresIn: '10min'})
            

                        const msg = {
                            to: req.body.email, // Change to your recipient
                            from: process.env.my_email, // Change to your verified sender
                            subject: 'Sending with SendGrid is Fun',
                            text: 'and easy to do anywhere, even with Node.js',
                            html: `
                            <h2>Hello this is from food management system, Please click on given link to activate your account</h2>
                            <p>http://localhost:5000/authentication/activate/${token}</p>
                            `,
                        }

                        sgMail
                        .send(msg)
                        .then(() => {
                            return res.status(200).json("message sent")
                        })
                        .catch((error) => {
                            return res.status(500).json(error.message)
                        })
                                        
                    }
            })
                
        
        }
    })

    // user.save()
    // .then((result) =>res.status(200).json({message:'saved successfully'}))
    // .catch(err => console.log(err.message))
    


    
})

router.get("/all_user",auth_user, async (req, res) => {
    try{
        const user = await User.find();
        res.status(200).json(user)
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
})


router.get('/activate/:token', email_verify, (req, res) => {

    User.find({email:req.userData.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(200).json({message:'verified successfully'})
        }
        else{
            const user = new User(req.userData)

            user.save()
            .then((result) =>res.status(200).json({message:'verified successfully'}))
            .catch(err => res.status(409).json({"message": err.message}))
        }
    })

    
})



router.post('/login', async (req, res) => {
    try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    
    const token = await user.generateAuthToken()
    res.status(200).send({user, token})
    }

    
    catch(err){
        res.status(400).json({error:err.message})
    }
    
})

router.post('/logout', auth_user, async (req, res) => {
    
    try{
    req.user.tokens = req.user.tokens.filter((token) => {
        return token !== req.token})
        await req.user.save();
        res.status(200).json({message:"logout success"})
    }
    catch(e){
        res.status(500).json({message:e.message})
    }


})




export default router;