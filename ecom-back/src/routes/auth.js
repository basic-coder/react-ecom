const express = require("express");
const router = express.Router();
const User = require('../model/User')
var bcrypt= require("bcryptjs"); 
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
//const fetchUser = require('../middleware')
const env = require('dotenv');
const { requestSignin } = require("../middleware");
const JWT_SECRET = process.env.JWT_SECRET;
const shortId = require('shortid');


//environment variable 
env.config()


//route1 : Create a User using: POST "/api/signup". No login required
router.post('/signup',[
    body('firstName','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5})
], async (req,res)=>{
    // if there are error return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({error: errors.array()});
    }
    // check whether the user exist already
    try{

    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(500).json({error:"Sorry a user with this email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)

    //create user
    user = await User.create({
        username: req.body.userName,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: secPass,
        username: shortId.generate(),
        email: req.body.email
    });
    const data = {
        user:{
            id: user.id
        }
    }
    //signed token
    const authtoken = jwt.sign(data, JWT_SECRET);  
    res.json({authtoken, message: "User registered"})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


//route2 : Authentcate a User using: POST "/api/signin". No login required
router.post('/signin',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({error: errors.array()});
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(500).json({error: "Please enter with correct credentials"})
        }

        if(user.role != "user"){
            return res.status(500).json({error: " not an user"})
        }

        


        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(500).json({error: "Please enter with correct credentials"})
        }
        const data = {
            user:{
                id: user.id,
                role: user.role
            }
        }
        //signed token
        const authtoken = jwt.sign(data, JWT_SECRET);
        const {firstName, lastName, role} =user;
        res.status(200).json({authtoken,
        user})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})
/*
//route3 : get login user details: POST "/api/auth/getUser".login required
router.post('/getUser', async (req,res)=>{

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