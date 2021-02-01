import mongoose from "mongoose"
import validator from "validator"
import fs from "fs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid')
            if (!validator.isAscii(value))
                throw new Error('Only ascii characters are allowed')
        }
    },
    password : {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        
    },
})

userSchema.methods.passwordcheck = (password) => {
    let data = fs.readFileSync('./common-password-list.txt');
    let pwd_arr = data.toString().split("\n");
    for(let i in pwd_arr){
        //may be it have extra spaces so we need to trim it
        if(password == pwd_arr[i].trim()){
            throw new Error("too weak password")
        }
    }
}

const User = mongoose.model('User', userSchema)
export default User;