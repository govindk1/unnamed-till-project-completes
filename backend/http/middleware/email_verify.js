import jwt from 'jsonwebtoken'

const  email_verify = (req, res, next) => {
    try{
    
    const decoded = jwt.verify(req.params.token, "yourmsgsecretkey")
    req.userData = decoded;
    next()
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

export default email_verify