import express from "express";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

mongoose.connect('mongodb://localhost:27017/nodejs', () => {
    console.log('Connected to DB')
}).catch(err => {
    console.log(err)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
  
app.use('/api/seed', seedRouter);
app.use('/api/products', ProductRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})