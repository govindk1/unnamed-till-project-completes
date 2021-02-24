import express from "express"
import Order from "../models/order.js"
import access_user_info from "../http/middleware/access_user_info.js"


const router = express.Router()


router.post('/order',access_user_info, async (req, res) => {

    //whenever user will post order we will emit an event that event will be listened by eventemitter in server side after than eventemitter will emit an event that will listended by our react app
    const eventEmitter = req.app.get('eventEmitter')

    if(req.user.name === '' || req.user.city === '' || req.user.state === '' || req.user.address === ''){
        res.status(500).json({message:"please update your profile"})
    }
    console.log(req.body.foodItems)
    const order = new Order({
        userId:req.user._id,
        phone:req.body.phone,
        number:parseInt(req.body.no),
        typeFood:req.body.foodType,
        foodDescription:req.body.foodItems,
        city: req.user.city
    })
    console.log(order)
    try{
       await order.save()
       eventEmitter.emit('order_update', "item has been placed Successfully")

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
    
 
    const eventEmitter = req.app.get('eventEmitter')

    Order.findByIdAndDelete(req.params.id)
      .then(() => {
            eventEmitter.emit('order_update', "item has been deleted")
            res.json({message:'Post deleted.'})
        })
      .catch(err => res.status(400).json({message:err.message}))
})

router.post('/update/:id', access_user_info, (req, res) => {
    console.log(req.body)

    const eventEmitter = req.app.get('eventEmitter')

    Order.findById(req.params.id)
        .then(order => {
            order.phone = req.body.phone;
            order.number = req.body.no;
            order.foodDescription = req.body.foodItems;
            order.typeFood = req.body.foodType;
        

        order.save()
        .then(() => {
            eventEmitter.emit('order_update', "item has been Successfully Edited")
            res.json(order)
        })
        .catch(err => res.status(400).json({message:err.message}))
    })
    .catch(err => res.status(400).json({message:err.message}))


})

router.post('/update_status/:id', access_user_info, (req, res) => {
    console.log(req.body)

    const eventEmitter = req.app.get('eventEmitter')

    Order.findById(req.params.id)
        .then(order => {
            order.status = req.body.status;        

        order.save()
        .then(() => {
            eventEmitter.emit('order_update', "item has been Successfully Edited")
            eventEmitter.emit('status_update', {id:req.params.id, status:req.body.status, time:req.body.time})
            res.json(order)
        })
        .catch(err => res.status(400).json({message:err.message}))
    })
    .catch(err => res.status(400).json({message:err.message}))


})


//excessing order of same city
router.get('/getorders', access_user_info, async (req, res) => {
    
    try{
    console.log(req.user.city)
    const order = await Order.find({city:req.user.city})
    console.log(order)
    res.status(200).send(order);
    }


    catch{
        res.status(500).json({message:'Server side error'})
    }
        

})

export default router