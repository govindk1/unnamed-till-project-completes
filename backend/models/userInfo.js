import mongoose from "mongoose"


const Schema = mongoose.Schema;

const userInfoSchema  = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    about:{
        type:String,
    },
    state:{
        type:String,
    },
    city:{
        type:String,
    },
})

const userInfo = mongoose.model('userInfo', userInfoSchema);

export default userInfo;