import jwt  from "jsonwebtoken"
import Admin from "../../models/admin.js"

const verify_admin = async (req, res, next) => {
    try{
        const token = (req.header('Authorization').split(" "))[1];
        const decoded = jwt.verify(token, 'yourmsgsecretkey');
        
        const user = await Admin.findOne({_id: decoded._id})

        if (!user) {
            throw new Error('Request failed')
        }

        //now this token and user data have been to the router who include this middleware
        req.token = token
        req.user = user
        next()

    }   
    catch (e) {
        res.status(401).send({error: e.message})
    }

}

export default verify_admin;