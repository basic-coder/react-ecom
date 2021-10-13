const mongoose  = require('mongoose')
const env = require('dotenv');

//environment variable 
env.config()
const mongoURI = `mongodb://localhost:27017/${process.env.DATABASE}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`
const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo")
    })
}

module.exports = connectToMongo;