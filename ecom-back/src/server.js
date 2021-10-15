
const express = require("express");
const connectToMongo = require('./db');
const env = require('dotenv');
const path = require('path');
const cors = require('cors');

//environment variable 
env.config()
connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')))

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//routes
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`app is listenning at ${process.env.PORT}`)
})