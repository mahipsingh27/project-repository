import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnairy.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//App configuration
const app = express()
const port = process.env.PORT || 4000

// Establish external service connections
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors())

//API Endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

// 404 handler for unmatched routes
app.use((req, res) => {
    res.json({success: false, message: `Route ${req.method} ${req.path} not found`})
})

app.listen(port,()=> console.log('Server started on PORT ' + port))