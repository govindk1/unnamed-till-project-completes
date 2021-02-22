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
    },
    role: {
        type: String,
        default: 'user',
        enum: ["user", "ogn", "admin"]
    },
    document:{
        type:String,
    }

})

const userInfo = mongoose.model('userInfo', userInfoSchema);

export default userInfo;