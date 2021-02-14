import mongoose from "mongoose"


const Schema =  mongoose.Schema;

const orderSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo',
        required: true,
    },
    phone:{
        type:String,
        required: true
    },
    number:{
        type:Number,
        required: true
    },
    typeFood:{
        type:String,
        required: true,
    },
    foodDescription:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    }

}, {timestamps:true})

const Order = mongoose.model('Order', orderSchema)

export default Order