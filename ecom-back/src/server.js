
const express = require("express");
const connectToMongo = require('./db');
const env = require('dotenv');

//environment variable 
env.config()
connectToMongo();

const app = express();
app.use(express.json());

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')


//routes
app.use('/api',authRoutes)
app.use('/api',adminRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`app is listenning at ${process.env.PORT}`)
})