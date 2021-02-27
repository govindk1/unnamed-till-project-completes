import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const Schema = mongoose.Schema;

const adminSchema = new Schema({
    
    
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
    tokens: [{
        token:{
            type:String,
            required:true,
        } 
    }  
    ]
})


adminSchema.statics.findByCredentials = async (email, password) => {
    const user = await Admin.findOne({ email })
    
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

adminSchema.methods.generateAuthToken = async function() {
    const user = this
  
    const token = jwt.sign({ _id:user._id.toString() }, 'yourmsgsecretkey', { expiresIn: "30m" })
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


const Admin = mongoose.model('Admin', adminSchema)
export default Admin;