import mongoose from "mongoose"


const Schema = mongoose.Schema;

const userInfoSchema  = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    about:{
        type:String,
        default:''
    },
    state:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    selectedFile:{
        type:String,
        default:'user.jpg'
    }
})

const userInfo = mongoose.model('userInfo', userInfoSchema);

export default userInfo;