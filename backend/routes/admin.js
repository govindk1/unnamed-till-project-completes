import express from "express"
import Admin from "../models/admin.js"


// import bcrypt from "bcrypt"
import userInfo from "../models/userInfo.js"

//middleware
import verify_admin from "../http/middleware/verify_admin.js"

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

router.get('/getpdf',verify_admin, async (req, res) => {
    try{
        const getpdf = await userInfo.find({role:"ogn", verify:0})   
        res.send(getpdf)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

router.post('/verifyogn', verify_admin, async (req, res) => {
   
        userInfo.findByIdAndUpdate(req.body.id, {verify:1})   
        .then(() =>  res.json({message:'successfully verified'}))
        .catch(err => res.json({message: err}))
   
   
    
})

// router.post('/create', async (req, res) => {
    
//     const user = new Admin(req.body)

//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//         user.password = hash
//         user.save()
//         .then(()=>res.status(200).json({message:"usercreated"}))
//         .catch(()=>res.status(500).json({message:"server error"}))

        
//     })
  
    
// })


// router.post('/create', async (req, res) => {
//     const user = new userInfo({
//         _id:req.body.id,
//         role:"admin",
//     })

//     try{
//         await user.save()
//     }
//     catch(err){
//         console.log(err)
//     }
// })

export default router