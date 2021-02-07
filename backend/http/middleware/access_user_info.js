import jwt from "jsonwebtoken"
import  userInfo from "../../models/userInfo.js"

const auth_user = async (req, res, next) => {

    try{
       console.log(req.header('Authorization'))
        const token = (req.header('Authorization').split(" "))[1];
        console.log(token)
        const decoded = jwt.verify(token, 'yourmsgsecretkey');
        
        const user = await userInfo.findOne({_id: decoded._id})

        if (!user) {
            throw new Error('Request failed')
        }

        //now this token and user data have been to the router who include this middleware
        req.user = user
        next()

    }
    catch (e) {
        res.status(401).send({message: e.message})
    }

}

export default auth_user;