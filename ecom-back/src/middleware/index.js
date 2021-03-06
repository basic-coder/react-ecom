var jwt = require("jsonwebtoken")
const env = require('dotenv');
const JWT_SECRET = process.env.JWT_SECRET;
const path = require('path')
const multer = require('multer')
const shortid = require('shortid')

//environment variable 
env.config()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
exports.upload = multer({ storage })

exports.requestSignin = (req,res,next)=>{
    //get the user from the jwt token and id to request object
    const token = req.header('authtoken');
    if(!token){
        res.status(500).send({error: "Please authenticate using a valid token"})
    }
    try{
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user;
    next();
    }catch(error){
        res.status(500).send({error: "Please authenticate using a valid token"})
    }
} 

exports.userMiddleware = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(500).json({ message: 'User Access denied'})
    }
    next();
}

exports.adminMiddleware =  (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(500).json({ message: 'Admin Access denied'})
    }
    next();
    
}