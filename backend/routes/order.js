import express from "express"
import Order from "../models/order.js"
import access_user_info from "../http/middleware/access_user_info.js"


const router = express.Router()


router.post('/order',access_user_info, async (req, res) => {

    if(req.user.name === '' || req.user.city === '' || req.user.state === '' || req.user.address === ''){
        res.status(500).json({message:"please update your profile"})
    }

    const order = new Order({
        userId:req.user._id,
        phone:req.body.phone,
        number:parseInt(req.body.no),
        typeFood:req.body.foodType,
        foodDescription:req.body.foodItems
    })

    try{
       await order.save()
       res.status(200).json({...req.body, _id:order._id}) 
    }catch(err){
    res.status(500).json({message:err.message})
    }

})

router.get('/order', access_user_info, (req, res) => {
    res.status(200).json({message:"done"})
})

export default router