
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
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//routes
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`app is listenning at ${process.env.PORT}`)
})