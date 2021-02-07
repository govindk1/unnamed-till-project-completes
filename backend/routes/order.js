import express from "express"
import Order from "../models/order.js"
import access_user_info from "../http/middleware/access_user_info.js"


const router = express.Router()


router.post('/order',access_user_info, async (req, res) => {

    if(req.user.name === '' || req.user.city === '' || req.user.state === '' || req.user.address === ''){
        res.status(500).json({message:"please update your profile"})
    }
    console.log(req.body.foodItems)
    const order = new Order({
        userId:req.user._id,
        phone:req.body.phone,
        number:parseInt(req.body.no),
        typeFood:req.body.foodType,
        foodDescription:req.body.foodItems
    })
    console.log(order)
    try{
       await order.save()
       res.status(200).json({...req.body, _id:order._id}) 
    }catch(err){
    res.status(500).json({message:err.message})
    }

})

router.get('/order', access_user_info, async (req, res) => {
    
    try{
    const orders = await Order.find({userId: req.user._id}, null, {sort:{'createdAt':-1}})
    res.status(200).send(orders)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    

})

router.delete('/order/:id', access_user_info, async (req, res) => {    
    Order.findByIdAndDelete(req.params.id)
      .then(() => res.json({message:'Post deleted.'}))
      .catch(err => res.status(400).json({message:err.message}))
})

router.post('/update/:id', access_user_info, (req, res) => {
    console.log(req.body)
    Order.findById(req.params.id)
        .then(order => {
            order.phone = req.body.phone;
            order.number = req.body.no;
            order.foodDescription = req.body.foodItems;
            order.typeFood = req.body.foodType;
        

        order.save()
        .then(() => res.json(order))
        .catch(err => res.status(400).json({message:err.message}))
    })
    .catch(err => res.status(400).json({message:err.message}))


})

export default router