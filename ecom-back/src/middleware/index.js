var jwt = require("jsonwebtoken")
const env = require('dotenv');
const JWT_SECRET = process.env.JWT_SECRET;

//environment variable 
env.config()

exports.requestSignin = (req,res,next)=>{
    //get the user from the jwt token and id to request object

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try{
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user;
    next();
    }catch(error){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
} 

exports.userMiddleware = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(400).json({ message: 'User Access denied'})
    }
    next();
}

exports.adminMiddleware =  (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({ message: 'Admin Access denied'})
    }
    next();
    
}