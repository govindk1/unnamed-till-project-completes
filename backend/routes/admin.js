import express from "express"
import Admin from "../models/admin.js"


const router = express.Router()

router.post('/login', async (req, res) => {
    try{
    const user = await Admin.findByCredentials(req.body.email, req.body.password)
    
    const token = await user.generateAuthToken()
    res.status(200).send({token})
    }

    
    catch(err){
        res.status(409).send({message:err.message})
    }
    
})