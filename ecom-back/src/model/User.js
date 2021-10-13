const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default:'admin'
    },
    contactnumber: {type: String},
    profilepicture: {type: String},
},
{
    timestamps: true,
})

const User =mongoose.model('user',UserSchema);
User.createIndexes();
module.exports = User