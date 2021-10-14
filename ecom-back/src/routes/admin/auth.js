const express = require("express");
const router = express.Router();
const User = require('../../model/User')
var bcrypt= require("bcryptjs"); 
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
//const requestSignin = require('../../middleware')
const env = require('dotenv');
const JWT_SECRET = process.env.JWT_SECRET;

//environment variable 
env.config()

//route1 : Create a User using: POST "/api/admin/signup". No login required
router.post('/admin/signup',[
    body('username','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5})
], async (req,res)=>{
    // if there are error return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    // check whether the user exist already
    try{

    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)

    //create user
    user = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: secPass,
        email: req.body.email
    });
    const data = {
        user:{
            id: user.id
        }
    }
    //signed token
    const authtoken = jwt.sign(data, JWT_SECRET);  
    res.json(authtoken)
    }catch(error){
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


//route2 : Authentcate a User using: POST "/api/admin/signin". No login required
router.post('/admin/signin',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please enter with correct credentials"})
        }
        if(user.role != "admin"){
            return res.status(400).json({error: " not an admin"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please enter with correct credentials"})
        }
        const data = {
            user:{
                id: user.id,
                role: user.role
            }
        }
        //signed token
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json(authtoken)
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})
/*
//route3 : get login user details: POST "/api/auth/getUser".login required
router.post('/getUser',requestSignin, async (req,res)=>{

    try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    } 

})*/
module.exports = router